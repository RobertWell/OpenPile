#!/usr/bin/env node

import express from 'express'
import path from 'path'
import {createProxyMiddleware} from "http-proxy-middleware";
import {createCellRouter} from "./routes/cells";

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
    const app = express()
    app.use(createCellRouter(filename, dir))


    if (useProxy) {
        app.use(createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: "silent"
        }))
    } else {
        const packagePath = require.resolve('@jsblade/local-client/build/index.html')
        app.use(express.static(path.dirname(packagePath)))
    }

    return new Promise<void>((resolve, reject) => {
        app.listen(port, () => {
            console.log(`Opened ${filename}. Navigate to http://localhost:${port} to Edit the file.`)
        }).on('error', reject)
    })
}