from .MicroCli import MicroCli
from .MicroInterface import MicroInterface
from ..tools import Tools
import os

class MicroContainer(MicroInterface):
    Name = 'container'
    _output = None
    port = 8080
    _templates = None
    payload = {}

    def __init__(self, name, output, port, templates, module):
        super().__init__('', port, templates)
        self._name = name
        self.Name = name
        self._output = output
        self._port = port
        self._templates = templates

        self.payload = {
            'Name': self.Name,
            'NameCapitalize': self.Name.capitalize(),
            'namelower': self.Name.lower(),
            'Port': self.port,
            'ContainerPort': self.port,
            'Container': self.Name,
            'Modules': [
                {
                    'Name': m['Name'],
                    'Port': m['Port'],
                }
                for m in module
            ]
        }

    def __str__(self):
        return f'App: {self._name}\n' + \
               f'Templates: {self._templates}\n' + \
               f'Output: {self._output}\n' + \
               f'Payload: {self.payload}'

    def generate(self):
        container = f"{self._templates}/'-Name-'"
        Tools.generate_module_container(self._output, container, self.payload)

        c_workflows = f'{self._templates}/container/workflows'
        print('----------------------')

        Tools.generate_module_container(self._output, c_workflows, self.payload)



    # _q = Queue(100)
    #
    # _config = None
    #
