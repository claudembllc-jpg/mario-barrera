#!/usr/bin/env python3
"""
Llama a la API de Claude con datos de perfil limpio + prompt template.
Retorna el análisis generado como string.
"""

import json
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
PROMPTS_DIR = BASE_DIR / "prompts"

ANALYSIS_TYPES = {
    "full": "analyze_profile.md",
    "hooks": "detect_hooks.md",
    "opportunities": "market_opportunities.md",
    "strategic": "strategic_analysis.md",
}

# Model selection: haiku = rápido y barato, sonnet = análisis profundo
MODELS = {
    "haiku": "claude-haiku-4-5-20251001",
    "sonnet": "claude-sonnet-4-6",
}
DEFAULT_MODEL = "haiku"


def load_prompt(analysis_type: str) -> str:
    filename = ANALYSIS_TYPES.get(analysis_type, ANALYSIS_TYPES["full"])
    prompt_path = PROMPTS_DIR / filename
    if not prompt_path.exists():
        raise FileNotFoundError(f"Prompt not found: {prompt_path}")
    return prompt_path.read_text(encoding="utf-8")


def build_message(prompt_template: str, profile_data: dict) -> str:
    data_json = json.dumps(profile_data, ensure_ascii=False, indent=2)
    return f"{prompt_template}\n\n---\n\n## DATOS DEL PERFIL (JSON)\n\n```json\n{data_json}\n```"


def analyze_with_claude(
    profile_data: dict,
    analysis_type: str = "full",
    model_key: str = DEFAULT_MODEL,
) -> str:
    try:
        import anthropic
    except ImportError:
        return "ERROR: anthropic SDK no instalado. Ejecuta: pip install anthropic"

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return (
            "ERROR: ANTHROPIC_API_KEY no configurada.\n"
            "Ejecuta: export ANTHROPIC_API_KEY=sk-ant-..."
        )

    model = MODELS.get(model_key, MODELS[DEFAULT_MODEL])
    prompt_template = load_prompt(analysis_type)
    user_message = build_message(prompt_template, profile_data)

    client = anthropic.Anthropic(api_key=api_key)

    message = client.messages.create(
        model=model,
        max_tokens=2048,
        messages=[{"role": "user", "content": user_message}],
    )

    return message.content[0].text


def analyze_comparison(
    comparison_data: dict,
    model_key: str = DEFAULT_MODEL,
) -> str:
    try:
        import anthropic
    except ImportError:
        return "ERROR: anthropic SDK no instalado."

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return "ERROR: ANTHROPIC_API_KEY no configurada."

    model = MODELS.get(model_key, MODELS[DEFAULT_MODEL])

    data_json = json.dumps(comparison_data, ensure_ascii=False, indent=2)

    prompt = (
        "Eres un analista competitivo experto en redes sociales. "
        "Analiza esta comparación de perfiles de Instagram y genera un reporte estratégico.\n\n"
        "## FORMATO DE RESPUESTA\n\n"
        "# Comparativa General\n"
        "Resumen del panorama competitivo.\n\n"
        "# Líder del nicho\n"
        "Quién lidera y por qué.\n\n"
        "# Diferencias clave\n"
        "Qué hace diferente a cada perfil.\n\n"
        "# Errores comunes\n"
        "Qué están haciendo mal en general.\n\n"
        "# Oportunidades del mercado\n"
        "Qué espacio queda libre para diferenciarse.\n\n"
        "# Estrategia recomendada\n"
        "Cómo posicionarse frente a estos competidores.\n\n"
        f"---\n\n## DATOS DE COMPARACIÓN\n\n```json\n{data_json}\n```"
    )

    client = anthropic.Anthropic(api_key=api_key)
    message = client.messages.create(
        model=model,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_profile.py <profile.json> [analysis_type] [model]")
        print(f"  analysis_type: {', '.join(ANALYSIS_TYPES.keys())} (default: full)")
        print(f"  model: {', '.join(MODELS.keys())} (default: {DEFAULT_MODEL})")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        data = json.load(f)

    atype = sys.argv[2] if len(sys.argv) > 2 else "full"
    mkey = sys.argv[3] if len(sys.argv) > 3 else DEFAULT_MODEL

    result = analyze_with_claude(data, atype, mkey)
    print(result)
