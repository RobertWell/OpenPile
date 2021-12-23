import * as esbuild from 'esbuild-wasm'
import {unpkgPathPlugin} from "./plugin/unpkg-path-plugin";
import {fetchPlugin} from "./plugin/fetch-plugin";


let service: boolean = false
let start: boolean = false

const initialize = async () => {
    // console.log('initialize')
    if(!start){
        start = true
        await esbuild.initialize(
            {
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.12.6/esbuild.wasm'
            }
        )
        service = true
    }
    // console.log('initialize end')
}

const bundle = async (rawCode: string): Promise<{ code: string, error: string }> => {

    // console.log('-----------------------', service)
    // if (!service) {
    //     try {
    //         await initialize()
    //         service = true
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // }


    try {

        const result = await esbuild.build(
            {
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window',

                },
                jsxFactory: '_React.createElement',
                jsxFragment: '_React.Fragment'
            }
        )

        const {outputFiles} = result

        return {
            code: outputFiles[0].text,
            error: ''
        }

    } catch (e) {
        return {
            code: '',
            error: e.message
        }
    }

}

export {bundle, initialize}