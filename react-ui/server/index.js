const express = require('express');
const path = require('path');

const app = express();
const buildDir = path.join(__dirname, '../', 'build');

app.disable('x-powered-by');

app.use(express.static(buildDir));
// need to declare a "catch all" route on your express server
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Frontend started on http://localhost:${PORT}`);
});
