from ._MicroFront.MicroCli import MicroCli
from ._MicroFront.MicroContainer import MicroContainer
from .ModuleQueue import ModuleQueue

import os


class MicroFront:
    _q = ModuleQueue(100)
    _config = {
        "container": {
            'name': 'MyApp',
            'port': 8080
        },
        "Module": [
            ['media', '-js'],
            ['card', '-tsc'],
            ['Jane', '-vue']
        ],
        'output': os.path.dirname(os.path.realpath(__file__)) + '/output'
    }

    def __init__(self, config, output, root=None, templates=None):
        if type(config) is list:
            self._q.add(MicroCli(config, root=root, templates=templates))

        elif type(config) is dict:
            self._config = config
            c_set = config['container']
            if type(c_set) is str:
                c_name = c_set
                c_port = 8080
            elif type(c_set) is dict:
                c_port = c_set['port']
                c_name = c_set['name']
            else:
                raise TypeError("Wrong Config type: ", config)

            output = config['output'] if 'output' in config else output
            module_c = []



            i = 1
            for l in config['Module']:
                self._q.add(MicroCli([*l,  '-o', output],
                                     port=c_port + i,
                                     container_port=c_port,
                                     container=c_name,
                                     root=root,
                                     templates=templates)
                            )
                module_c.append({
                    'Name': l[0],
                    'Port': c_port + i
                })

                i += 1
            # print(module_c)
            # print(output)
            self._q.add(MicroContainer(c_name, output, c_port, templates, module_c))

            # MicroContainer(c_name, )
    #
    def run(self):
        while self._q.qsize() > 0:
            q = self._q.get()
            # print('-------------------------------')
            print(q)
            q.generate()



    def generate(self):
        pass
