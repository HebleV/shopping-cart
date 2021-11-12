const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require("../webpack.dev.config")
const banners = require('./banners/index.get.json');
const products = require('./products/index.get.json');
const categories = require('./categories/index.get.json');

const app = express(),
  BUILD_DIR = __dirname,
  HTML_FILE = path.join(BUILD_DIR, "index.html"),
  compiler = webpack(config);

const PORT = process.env.PORT || 5000;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(BUILD_DIR));

app.get('/', (req, res, abc) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return abc(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
    })
  });

app.get("/banners", (req, res) =>res.json(banners));
app.get("/products", (req, res) =>res.json(products));
app.get("/categories", (req, res) =>res.json(categories));

const server = app.listen(PORT, () => {
  console.log(`listening on port....`, server.address().port);
});
