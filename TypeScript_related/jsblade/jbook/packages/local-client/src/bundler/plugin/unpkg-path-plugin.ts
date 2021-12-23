import * as esbuild from 'esbuild-wasm';
// import axios from "axios";
// import localForage from 'localforage'

// const fileCatche = localForage.createInstance(
//     {name: 'filecache'}
// );

// (async ()=>{
//     await fileCatche.setItem('color', 'red')
//     const color = await fileCatche.getItem('color')
//     console.log(color)
// })()

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            build.onResolve({filter:/(^index\.js$)/}, async (args: any)=>{
                return {path: args.path, namespace: 'a'};
            })

            build.onResolve({filter:/^\.+\//}, async (args: any)=>{
                return {path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href, namespace: 'a'};
            })


            build.onResolve({filter: /.*/}, async (args: any) => {
                // console.log('onResole', args);

                // if (args.path.includes('./') || args.path.includes('../')) {
                //     return {path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href, namespace: 'a'};
                // }


                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                };

                // else if (args.path === 'tiny-test-pkg') {
                //         return {path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace: 'a'}
                //     }
            });


        },
    };
};