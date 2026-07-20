const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // معالجة الطلب
    let filePath = req.url === '/' ? 'index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    const ext = path.extname(filePath);

    // تحديد نوع المحتوى
    const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.json': 'application/json; charset=utf-8'
    };

    const contentType = mimeTypes[ext] || 'text/plain; charset=utf-8';

    // التحقق من وجود الملف
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 - الملف غير موجود</h1>', 'utf-8');
            return;
        }

        // قراءة وإرسال الملف
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>500 - خطأ في الخادم</h1>', 'utf-8');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   موقع أشرقت ❤️ يعمل الآن                      ║
║   رابط الموقع: http://localhost:${PORT}              ║
║                                                 ║
║   💕 يا أشرقت، ما زال اسمك أول دعاء في قلبي   ║
╚════════════════════════════════════════════════╝
    `);
});
