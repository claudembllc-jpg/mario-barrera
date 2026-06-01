#!/bin/bash
# atlas-status.sh — Diagnóstico rápido al inicio de sesión
# Uso: bash /root/social-agent/scripts/atlas-status.sh

echo ""
echo "══════════════════════════════════════════"
echo "  ATLAS — Mario Barrera Group"
echo "  Estado del sistema — $(date '+%Y-%m-%d %H:%M')"
echo "══════════════════════════════════════════"
echo ""

# Servicios
echo "📡 SERVICIOS:"
for svc in atlas-dashboard atlas-tunnel-api atlas-tunnel-web nginx; do
  STATUS=$(systemctl is-active $svc 2>/dev/null)
  if [ "$STATUS" = "active" ]; then
    echo "  ✅ $svc"
  else
    echo "  ❌ $svc — $STATUS"
  fi
done

echo ""
echo "🌐 URLS ACTIVAS:"
URL_API=$(grep -o 'https://[^ ]*trycloudflare.com' /var/log/atlas-tunnel-api.log 2>/dev/null | tail -1)
URL_WEB=$(grep -o 'https://[^ ]*trycloudflare.com' /var/log/atlas-tunnel-web.log 2>/dev/null | tail -1)
[ -n "$URL_API" ] && echo "  Dashboard: $URL_API" || echo "  Dashboard: (arrancando...)"
[ -n "$URL_WEB" ] && echo "  Landing:   $URL_WEB" || echo "  Landing:   (arrancando...)"

echo ""
echo "📋 TAREAS URGENTES:"
python3 -c "
import json, sys
try:
    data = json.load(open('/root/social-agent/data/tasks_active.json'))
    for t in data.get('en_progreso', []):
        print(f'  🔄 [{t[\"id\"]}] {t[\"titulo\"]} — vence {t[\"fecha_limite\"]}')
    for t in data.get('proximas', [])[:3]:
        print(f'  ⏳ [{t[\"id\"]}] {t[\"titulo\"]} — vence {t[\"fecha_limite\"]}')
except Exception as e:
    print(f'  Error leyendo tareas: {e}')
" 2>/dev/null

echo ""
echo "📄 CHECKPOINT:"
grep -A2 "Proceso activo" /root/social-agent/vault/CHECKPOINT.md 2>/dev/null | tail -2 | sed 's/^/  /'
echo ""
echo "══════════════════════════════════════════"
echo ""
