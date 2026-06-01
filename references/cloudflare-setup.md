# Cloudflare Tunnel — Guía Completa para VPS
**Publicar páginas con URL externa sin dominio ni firewall complejo**

---

## OPCIÓN A — Túnel rápido (sin cuenta, URL temporal)

Ideal para mostrar una demo o probar algo externamente de inmediato.

```bash
# Instalar cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
  -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Verificar instalación
cloudflared --version

# Abrir túnel al puerto 80 (nginx debe estar corriendo)
cloudflared tunnel --url http://localhost:80

# → Te da una URL tipo: https://random-words.trycloudflare.com
# Esa URL funciona desde cualquier dispositivo en el mundo
# IMPORTANTE: La URL cambia cada vez que reinicias el túnel
```

Para mantener el túnel activo en background:
```bash
nohup cloudflared tunnel --url http://localhost:80 > /tmp/cloudflared.log 2>&1 &
cat /tmp/cloudflared.log  # ver la URL generada
```

---

## OPCIÓN B — Túnel permanente con dominio propio (recomendado para producción)

### Paso 1: Tener un dominio en Cloudflare
- Comprar dominio en Namecheap, GoDaddy, etc.
- O usar uno que ya tengas
- Transferir los nameservers a Cloudflare (gratis)
- Dominio registrado en: cloudflare.com → Websites

### Paso 2: Autenticar cloudflared
```bash
cloudflared tunnel login
# → Abre URL en navegador para autorizar
# → Descarga certificado en ~/.cloudflared/cert.pem
```

### Paso 3: Crear el túnel
```bash
# Crear túnel con nombre (ej: mario-barrera-group)
cloudflared tunnel create mario-barrera-group

# → Guarda el UUID del túnel: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Paso 4: Configurar el túnel
```bash
mkdir -p ~/.cloudflared

cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: [UUID-DEL-TUNEL]
credentials-file: /root/.cloudflared/[UUID].json

ingress:
  - hostname: tudominio.com
    service: http://localhost:80
  - hostname: www.tudominio.com
    service: http://localhost:80
  # Agregar más subdominios si necesitas:
  # - hostname: landing.tudominio.com
  #   service: http://localhost:8080
  - service: http_status:404
EOF
```

### Paso 5: Apuntar el DNS
```bash
cloudflared tunnel route dns mario-barrera-group tudominio.com
cloudflared tunnel route dns mario-barrera-group www.tudominio.com
```

### Paso 6: Correr el túnel
```bash
# Para prueba:
cloudflared tunnel run mario-barrera-group

# Para producción (servicio systemd):
cloudflared service install
systemctl enable cloudflared
systemctl start cloudflared
systemctl status cloudflared
```

---

## MÚLTIPLES SITIOS EN UN SOLO VPS

Con Cloudflare Tunnel puedes tener múltiples landing pages en distintos subdominios:

```yaml
# ~/.cloudflared/config.yml
ingress:
  - hostname: seguros.tudominio.com
    service: http://localhost:80
  - hostname: leads.tudominio.com
    service: http://localhost:8081
  - hostname: dashboard.tudominio.com
    service: http://localhost:3000
  - service: http_status:404
```

Con nginx en el mismo servidor:
```nginx
# /etc/nginx/sites-available/multi-sites
server {
    listen 80;
    server_name seguros.tudominio.com;
    root /var/www/seguros;
    index index.html;
}

server {
    listen 8081;
    server_name leads.tudominio.com;
    root /var/www/leads;
    index index.html;
}
```

---

## ESTRUCTURA DE CARPETAS PARA MÚLTIPLES PROYECTOS

```
/var/www/
├── mario-barrera/          ← landing página principal
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── brand/
├── final-expense/          ← landing campaña final expense
│   ├── index.html
│   └── brand/
├── leads/                  ← formulario de captación
│   └── index.html
└── dashboard/              ← dashboard del equipo (próximo)
    └── index.html
```

---

## COMANDOS ÚTILES

```bash
# Ver túneles activos
cloudflared tunnel list

# Ver logs del túnel
journalctl -u cloudflared -f

# Detener túnel
systemctl stop cloudflared

# Ver conexiones del túnel
cloudflared tunnel info mario-barrera-group

# Limpiar túneles viejos
cloudflared tunnel delete [nombre-o-uuid]
```

---

## NGINX — INSTALACIÓN RÁPIDA

Si nginx no está instalado:
```bash
apt update && apt install nginx -y
systemctl enable nginx
systemctl start nginx
systemctl status nginx

# Probar que funciona:
curl http://localhost
# → debe mostrar "Welcome to nginx!"
```

Configuración básica de sitio:
```bash
cat > /etc/nginx/sites-available/mario-barrera << 'EOF'
server {
    listen 80 default_server;
    server_name _;
    root /var/www/mario-barrera;
    index index.html;
    
    gzip on;
    gzip_types text/css application/javascript image/svg+xml text/html;
    
    location ~* \.(css|js|png|jpg|webp|svg|woff2|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

ln -sf /etc/nginx/sites-available/mario-barrera /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```
