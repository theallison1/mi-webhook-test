#!/bin/bash
echo "--- 🚀 WEBHOOK RECIBIDO ---"
echo "LOG: El servicio de Java está suspendido/detenido."
echo "LOG: Enviando orden de encendido a Render..."

# ESTA LÍNEA ES LA QUE HACE LA MAGIA
# Reemplaza lo que está entre comillas con la URL que copiaste en el paso anterior
curl -X POST "https://api.render.com/deploy/srv-d3om0uuuk2gs73dopk8g?key=Ns-sT_vwHk0"

echo ""
echo "✅ SEÑAL ENVIADA EXITOSAMENTE"
echo "--- Render está levantando el servicio de Java ahora mismo ---"