import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";


const fileCatche = localForage.createInstance(
    {name: 'filecache'}
);


export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({filter: /(^index\.js$)/}, async (args: any) => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            })

            build.onLoad({filter: /.css$/}, async (args: any) => {
                console.log('-------------------------Dont')
                return null
            })


            build.onLoad({filter: /.css$/}, async (args: any) => {
                const cachedResult = await fileCatche.getItem<esbuild.OnLoadResult>(args.path)
                if (cachedResult) return cachedResult

                const {data, request} = await axios.get(args.path)
                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")
                const contents =
                    `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                    `
                // console.log('----------------------------3', loader)
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                await fileCatche.setItem(args.path, result)
                return result

            })
            build.onLoad({filter: /.*/}, async (args: any) => {
                const cachedResult = await fileCatche.getItem<esbuild.OnLoadResult>(args.path)
                if (cachedResult) return cachedResult

                const {data, request} = await axios.get(args.path)
                // console.log('----------------------------3', loader)
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                await fileCatche.setItem(args.path, result)

                return result


            });
        }
    }
}

