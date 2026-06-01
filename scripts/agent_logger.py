"""
Utilidad de logging para subagentes de ATLAS.
Cada agente importa esto y llama log() para reportar progreso en tiempo real.
"""

import json
import time
from datetime import datetime
from pathlib import Path

AGENTS_FILE = Path("/tmp/atlas_agents.json")


def _load() -> dict:
    if AGENTS_FILE.exists():
        try:
            return json.loads(AGENTS_FILE.read_text())
        except Exception:
            pass
    return {"agents": []}


def _save(data: dict) -> None:
    AGENTS_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2))


def register(agent_id: str, name: str, icon: str = "🤖") -> None:
    data = _load()
    for a in data["agents"]:
        if a["id"] == agent_id:
            a["status"] = "running"
            a["started"] = datetime.now().isoformat()
            a["logs"] = []
            _save(data)
            return
    data["agents"].append({
        "id": agent_id,
        "name": name,
        "icon": icon,
        "status": "running",
        "started": datetime.now().isoformat(),
        "updated": datetime.now().isoformat(),
        "progress": 0,
        "logs": [],
        "result": ""
    })
    _save(data)


def log(agent_id: str, message: str, progress: int = None) -> None:
    data = _load()
    for a in data["agents"]:
        if a["id"] == agent_id:
            a["logs"].append({
                "time": datetime.now().strftime("%H:%M:%S"),
                "message": message
            })
            a["updated"] = datetime.now().isoformat()
            if progress is not None:
                a["progress"] = progress
            # Mantener solo los últimos 50 logs
            if len(a["logs"]) > 50:
                a["logs"] = a["logs"][-50:]
            _save(data)
            return


def complete(agent_id: str, result: str = "") -> None:
    data = _load()
    for a in data["agents"]:
        if a["id"] == agent_id:
            a["status"] = "completed"
            a["progress"] = 100
            a["result"] = result
            a["updated"] = datetime.now().isoformat()
            a["logs"].append({
                "time": datetime.now().strftime("%H:%M:%S"),
                "message": f"✅ Completado: {result}"
            })
            _save(data)
            return


def fail(agent_id: str, error: str = "") -> None:
    data = _load()
    for a in data["agents"]:
        if a["id"] == agent_id:
            a["status"] = "failed"
            a["result"] = error
            a["updated"] = datetime.now().isoformat()
            a["logs"].append({
                "time": datetime.now().strftime("%H:%M:%S"),
                "message": f"❌ Error: {error}"
            })
            _save(data)
            return
