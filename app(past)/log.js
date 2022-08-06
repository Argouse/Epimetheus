const { parse } = require('url');
const promClient = require('prom-client');
const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';

const HTTP_PORT = 3001;

const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const registry = new promClient.Registry();

promClient.collectDefaultMetrics({
    register: registry,
});

const nextAppHandler = (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // assets folder in public which are own files
    if (pathname.startsWith('/assets')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }

    handle(req, res, parsedUrl);

};


app.prepare().then(() => {
    // this is the endpoint we give for our metrics, in our cluster its never reachable from outside
    server.get('/metrics', (_, res) => {
        return res.send(registry.metrics());
    })
   
    server.all('*', (req, res) => {
        return nextAppHandler(req, res)
    })

    server.listen(HTTP_PORT, () => {
        console.log(
            `🚀 http application ready on http://localhost:${HTTP_PORT}`,
        );
    });

});