const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/hooks/deploy-backend-dev', (req, res) => {
    const githubEvent = req.headers['x-github-event'];
    const data = req.body;
    
    // Validamos que exista data.ref para evitar errores
    const branch = data && data.ref ? data.ref : 'N/A'; 

    console.log(`--- 🚀 Evento recibido: ${githubEvent} en ${branch} ---`);

    res.status(202).json({ message: 'Recibido en Render, procesando...' });

    // Si es el evento de prueba de GitHub (ping), no hacemos nada más
    if (githubEvent === 'ping') {
        console.log('✅ Ping de GitHub recibido correctamente');
        return;
    }

    if (githubEvent === 'push' && (branch === 'refs/heads/main' || branch === 'refs/heads/desarrollo')) {
        const scriptPath = "bash ./deploy-test.sh";
        console.log(`Ejecutando script: ${scriptPath}`);
        
        exec(scriptPath, (err, stdout, stderr) => {
            if (err) {
                console.error(`❌ Error al ejecutar: ${err.message}`);
                return;
            }
            console.log(`✅ Resultado del script:\n${stdout}`);
            if (stderr) console.log(`⚠️ Avisos: ${stderr}`);
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Webhook activo en puerto ${PORT}`));