#!/bin/bash
# install-obsidian-plugins.sh
# Descarga e instala los 4 plugins Obsidian recomendados para ATLAS
# Uso: bash /root/social-agent/scripts/install-obsidian-plugins.sh

VAULT="/root/social-agent/vault/.obsidian/plugins"
mkdir -p "$VAULT"

install_plugin() {
    local name=$1
    local repo=$2
    mkdir -p "$VAULT/$name"
    echo "Instalando $name desde $repo..."
    for file in main.js manifest.json styles.css; do
        url="https://github.com/$repo/releases/latest/download/$file"
        if wget -q --spider "$url" 2>/dev/null; then
            wget -q -O "$VAULT/$name/$file" "$url"
            echo "  OK: $file"
        else
            echo "  SKIP: $file (no existe en esta release)"
        fi
    done
    echo "  Instalado: $VAULT/$name"
}

echo "=== Instalando plugins Obsidian para ATLAS ==="
echo ""

install_plugin "dataview" "blacksmithgu/obsidian-dataview"
echo ""
install_plugin "templater-obsidian" "SilentVoid13/Templater"
echo ""
install_plugin "obsidian-kanban" "mgmeyers/obsidian-kanban"
echo ""
install_plugin "obsidian-git" "Vinzent03/obsidian-git"

echo ""
echo "=== Instalacion completa ==="
echo "Siguiente paso: abrir Obsidian y en Settings -> Community plugins -> habilitar cada plugin"
ls -la "$VAULT"
