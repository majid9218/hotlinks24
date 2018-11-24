const express    = require('express'),
      app        = express(),
      path       = require('path'),
      publicPath = path.join(__dirname, '..', 'public'),
      proxyURL   = process.env.apiURL || 'http://localhost:8081/',
      PORT       = process.env.PORT || 3000,
      proxy      = require('express-http-proxy');

app.use(express.static(publicPath));

app.all('/api/*', proxy(proxyURL));

app.all('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log('server started!');
});


