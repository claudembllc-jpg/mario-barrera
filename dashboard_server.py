#!/usr/bin/env python3
"""
Dashboard server — Mario Barrera Group
Sirve el PWA y expone API REST para las tareas.
Puerto: 3001
"""

from flask import Flask, jsonify, request, send_from_directory, abort, Response, stream_with_context
from pathlib import Path
from datetime import datetime
import json
import uuid
import time

BASE_DIR    = Path(__file__).parent
TASKS_FILE  = BASE_DIR / "data" / "tasks.json"
AGENTS_FILE = Path("/tmp/atlas_agents.json")
STATIC_DIR  = Path("/var/www/dashboard")

app = Flask(__name__, static_folder=str(STATIC_DIR))


# ── Helpers ──────────────────────────────────────────────────────────────────

def load_tasks() -> list:
    if not TASKS_FILE.exists():
        return []
    data = json.loads(TASKS_FILE.read_text(encoding="utf-8"))
    # Soporta formato legacy (pendientes/en_progreso/completadas) y nuevo (tasks[])
    if "tasks" in data:
        return data["tasks"]
    tasks = []
    for estado, items in data.items():
        if isinstance(items, list):
            for t in items:
                if isinstance(t, dict):
                    if "estado" not in t:
                        t["estado"] = estado
                    tasks.append(t)
    return tasks


def save_tasks(tasks: list) -> None:
    TASKS_FILE.write_text(
        json.dumps({"tasks": tasks, "ultima_actualizacion": datetime.now().isoformat()[:10]},
                   ensure_ascii=False, indent=2),
        encoding="utf-8"
    )


def find_task(tasks: list, task_id: str) -> tuple:
    for i, t in enumerate(tasks):
        if t.get("id") == task_id:
            return i, t
    return -1, None


# ── Rutas estáticas ──────────────────────────────────────────────────────────

@app.route("/")
def index():
    return send_from_directory(str(STATIC_DIR), "index.html")


@app.route("/<path:path>")
def static_files(path):
    file_path = STATIC_DIR / path
    if file_path.exists() and file_path.is_file():
        return send_from_directory(str(STATIC_DIR), path)
    # SPA fallback
    return send_from_directory(str(STATIC_DIR), "index.html")


# ── API ───────────────────────────────────────────────────────────────────────

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(load_tasks())


@app.route("/api/tasks", methods=["POST"])
def create_task():
    body = request.get_json(force=True)
    if not body or not body.get("titulo"):
        abort(400, "Se requiere al menos 'titulo'")

    task = {
        "id": body.get("id") or f"TASK-{uuid.uuid4().hex[:6].upper()}",
        "titulo": body["titulo"],
        "tipo": body.get("tipo", "contenido"),
        "descripcion": body.get("descripcion", ""),
        "como_hacerlo": body.get("como_hacerlo", ""),
        "documentacion": body.get("documentacion", []),
        "para": body.get("para", "equipo"),
        "prioridad": body.get("prioridad", "media"),
        "fecha_limite": body.get("fecha_limite", ""),
        "estado": body.get("estado", "pendiente"),
        "drive_link": body.get("drive_link", ""),
        "notas": body.get("notas", ""),
        "creada": datetime.now().isoformat()[:10],
        "actualizada": datetime.now().isoformat()[:10],
    }

    tasks = load_tasks()
    tasks.append(task)
    save_tasks(tasks)
    return jsonify(task), 201


@app.route("/api/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    body = request.get_json(force=True)
    tasks = load_tasks()
    idx, task = find_task(tasks, task_id)
    if idx == -1:
        abort(404, f"Tarea {task_id} no encontrada")

    allowed = ["titulo", "tipo", "descripcion", "como_hacerlo", "documentacion",
               "para", "prioridad", "fecha_limite", "estado", "drive_link", "notas"]
    for key in allowed:
        if key in body:
            task[key] = body[key]
    task["actualizada"] = datetime.now().isoformat()[:10]
    tasks[idx] = task
    save_tasks(tasks)
    return jsonify(task)


@app.route("/api/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    tasks = load_tasks()
    idx, task = find_task(tasks, task_id)
    if idx == -1:
        abort(404)
    tasks.pop(idx)
    save_tasks(tasks)
    return jsonify({"deleted": task_id})


# ── Agentes — API + SSE ───────────────────────────────────────────────────────

def load_agents() -> list:
    if not AGENTS_FILE.exists():
        return []
    try:
        return json.loads(AGENTS_FILE.read_text())["agents"]
    except Exception:
        return []


@app.route("/api/agents", methods=["GET"])
def get_agents():
    return jsonify(load_agents())


@app.route("/api/agents/<agent_id>/log", methods=["POST"])
def post_agent_log(agent_id):
    body = request.get_json(force=True)
    if not AGENTS_FILE.exists():
        return jsonify({"error": "no agents file"}), 404
    data = json.loads(AGENTS_FILE.read_text())
    for a in data["agents"]:
        if a["id"] == agent_id:
            a["logs"].append({"time": datetime.now().strftime("%H:%M:%S"), "message": body.get("message", "")})
            if "progress" in body:
                a["progress"] = body["progress"]
            if "status" in body:
                a["status"] = body["status"]
            a["updated"] = datetime.now().isoformat()
            AGENTS_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2))
            return jsonify({"ok": True})
    return jsonify({"error": "agent not found"}), 404


@app.route("/api/agents/stream")
def agents_stream():
    def event_stream():
        last_modified = 0
        while True:
            try:
                if AGENTS_FILE.exists():
                    mtime = AGENTS_FILE.stat().st_mtime
                    if mtime != last_modified:
                        last_modified = mtime
                        data = AGENTS_FILE.read_text()
                        yield f"data: {data}\n\n"
            except Exception:
                pass
            time.sleep(1)

    return Response(
        stream_with_context(event_stream()),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*",
        }
    )


if __name__ == "__main__":
    print("Dashboard corriendo en http://0.0.0.0:3001")
    app.run(host="0.0.0.0", port=3001, debug=False, threaded=True)
