const https = require('https');
const fs = require('fs');

const options = {
	key: fs.readFileSync(__dirname + '/1530632509237.key'),
	cert: fs.readFileSync(__dirname + '/1530632509237.pem')
};

https.createServer(options, (req, res) => {
	res.writeHead(200);
	res.end('hello world\n');
}).listen(8200);