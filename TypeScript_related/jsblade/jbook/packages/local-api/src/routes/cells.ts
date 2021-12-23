import express from "express";
import fs from 'fs/promises'
import path from 'path'

interface Cell {
    id: string,
    content: string,
    type: 'text' | 'code'
}


export const createCellRouter = (filename: string, dir: string) => {
    const router = express.Router()
    router.use(express.json())
    const fullpath = path.join(dir, filename)

    router.get('/cells', async (req, res) => {
        try {
            //Read file
            const result = await fs.readFile(fullpath, {encoding: 'utf-8'})

            //Parse a list of cells out of it
            //Send list of cells back to the browser
            res.send(JSON.parse(result))
        } catch (e) {
            if (e.code === 'ENOENT') {
                //If the file does not exist, add in a default list of cells
                await fs.writeFile(fullpath, '[]', 'utf-8')
                res.send([])
            } else {
                throw e
            }
        }
    })


    router.post('/cells', async (req, res) => {
        //Make sure the file exist

        //Take the list of cells from the request object
        const {cells}: { cells: Cell[] } = req.body

        //Serialize them
        await fs.writeFile(fullpath, JSON.stringify(cells), 'utf-8')

        //Write the cells into the file
        res.send({status: 'ok'})

    })

    return router
}