import {Command} from "commander";
import path from "path";
import {serve} from '@jsblade/local-api'

const isProduction = process.env.NODE_ENV === 'production'
// console.log(process.env)

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: { port: string }) => {

        try {
            const dir: string = path.join(process.cwd(), path.dirname(filename))
            console.log(dir)
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction)
            console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to Edit the file.`)
        } catch (e) {
            if (e.code === 'EADDRINUSE') {
                console.error('Port is in use. Try running on a different port.')
            } else {
                console.log('Error: ', e.message)
            }
            process.exit(1)
        }

    })


