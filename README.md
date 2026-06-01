# Social Intelligence Agent

Sistema ligero de inteligencia competitiva para redes sociales.  
Stack: Python · Playwright · Claude API · JSON

---

## Instalación

### 1. Requisitos

- Python 3.11+
- Ubuntu Server (o cualquier Linux)
- Clave de API de Anthropic

### 2. Instalar dependencias

```bash
cd social-agent
pip install -r requirements.txt
playwright install chromium
```

### 3. Configurar API key

```bash
export ANTHROPIC_API_KEY=sk-ant-...

# Para persistencia (agregar a ~/.bashrc o ~/.zshrc):
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.bashrc
```

---

## Uso

### Analizar un perfil completo

```bash
python main.py analyze @username
```

### Tipos de análisis

```bash
# Análisis completo (default)
python main.py analyze @username --type full

# Solo hooks y copywriting
python main.py analyze @username --type hooks
# o el shortcut:
python main.py hooks @username

# Oportunidades de mercado
python main.py analyze @username --type opportunities
# o:
python main.py opportunities @username

# Análisis estratégico profundo
python main.py analyze @username --type strategic --model sonnet
# o:
python main.py strategic @username --model sonnet
```

### Comparar competidores

```bash
python main.py compare @user1 @user2
python main.py compare @user1 @user2 @user3
```

### Analizar todos los competidores registrados

```bash
# Registrar competidores en data/competitors.json primero
python main.py analyze-all
python main.py analyze-all --type hooks
```

### Gestión de cache

```bash
# Ver perfiles en cache (hoy)
python main.py list

# Forzar re-scraping (ignorar cache)
python main.py analyze @username --force

# Limpiar cache de un perfil
python main.py clear @username
```

### Opciones adicionales

```bash
# Ver el navegador durante el scraping (útil para debug)
python main.py analyze @username --no-headless

# Usar modelo más potente (más caro, análisis más profundo)
python main.py analyze @username --model sonnet

# Con cookies de Instagram (para datos completos)
python main.py analyze @username --cookies instagram_cookies.json
```

---

## Estructura del proyecto

```
social-agent/
│
├── main.py                     # CLI principal — punto de entrada
│
├── agents/
│   └── social_intelligence.md  # Definición del agente para Claude Code
│
├── scripts/
│   ├── scrape_instagram.py     # Scraper Playwright para Instagram
│   ├── scrape_facebook.py      # Facebook (fase futura)
│   ├── clean_data.py           # Limpieza y compactación de datos
│   ├── compare_profiles.py     # Comparación entre perfiles
│   └── analyze_profile.py      # Llamadas a Claude API
│
├── prompts/
│   ├── analyze_profile.md      # Prompt: análisis completo
│   ├── detect_hooks.md         # Prompt: análisis de hooks
│   ├── market_opportunities.md # Prompt: oportunidades de mercado
│   └── strategic_analysis.md   # Prompt: análisis estratégico
│
├── cache/
│   ├── profiles/               # Perfiles scraped (raw + clean, por día)
│   └── analysis/               # Análisis generados (por día)
│
├── output/
│   └── reports/                # Reportes finales en Markdown
│
├── data/
│   └── competitors.json        # Lista de competidores registrados
│
└── requirements.txt
```

---

## Flujo del sistema

```
Usuario ejecuta comando
        │
        ▼
main.py — parse argumentos
        │
        ▼
¿Hay cache de hoy?
   SÍ → cargar cache ──────────────────┐
   NO → scrape_instagram.py            │
        │                              │
        ▼                              │
   clean_data.py                       │
   (extrae solo lo útil, JSON compacto)│
        │                              │
        └──────────────────────────────┤
                                       ▼
                            analyze_profile.py
                            (carga prompt + datos)
                                       │
                                       ▼
                               Claude API (Haiku/Sonnet)
                                       │
                                       ▼
                            output/reports/{username}_{type}_{ts}.md
                            + cache/analysis/{username}_{type}_{date}.json
                                       │
                                       ▼
                               Imprimir en pantalla
```

---

## Cache

El sistema guarda datos localmente para evitar re-scraping:

| Archivo | Ubicación | Validez |
|---------|-----------|---------|
| Perfil crudo | `cache/profiles/{username}_{date}_raw.json` | 1 día |
| Perfil limpio | `cache/profiles/{username}_{date}_clean.json` | 1 día |
| Análisis | `cache/analysis/{username}_{type}_{date}.json` | 1 día |

Para forzar actualización: `--force`

---

## Modelos disponibles

| Flag | Modelo | Uso recomendado |
|------|--------|-----------------|
| `--model haiku` | claude-haiku-4-5 | Default. Rápido, económico, análisis rutinario |
| `--model sonnet` | claude-sonnet-4-6 | Análisis estratégico importante, comparaciones complejas |

---

## Instagram y login

Instagram muestra datos limitados sin login. Para análisis completo:

1. Abre Instagram en Chrome con la extensión [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie)
2. Inicia sesión en instagram.com
3. Exporta las cookies como JSON
4. Guárdalas como `instagram_cookies.json` en la raíz del proyecto
5. Usa `--cookies instagram_cookies.json` en tus comandos

**Importante**: Usa una cuenta secundaria, no tu cuenta principal.

---

## Registrar competidores

Edita `data/competitors.json`:

```json
{
  "competitors": [
    {
      "username": "competidor1",
      "platform": "instagram",
      "niche": "negocios",
      "notes": "Competidor principal en mi nicho",
      "added": "2026-05-28",
      "priority": "high"
    }
  ]
}
```

Luego: `python main.py analyze-all`

---

## Solución de problemas

**`ANTHROPIC_API_KEY no configurada`**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

**`playwright install` falla**
```bash
pip install playwright
playwright install chromium --with-deps
```

**Datos parciales / login wall**
```bash
python main.py analyze @username --cookies instagram_cookies.json
# o en modo visible para ver qué pasa:
python main.py analyze @username --no-headless
```

**Timeout en scraping**
```bash
# Intenta en modo visible para diagnosticar
python main.py analyze @username --no-headless --force
```
