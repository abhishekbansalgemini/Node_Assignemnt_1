const fs = require('fs');
const http = require('http');



const app = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('text.json', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error');
        return;
      }

      let fileData = JSON.parse(data);

      let obj = {
        existingData: fileData,
      };

      fs.writeFile('data.txt', JSON.stringify(obj), 'utf8', (err) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error');
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(obj));
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(8080, () => {
  console.log('Server start');
});
