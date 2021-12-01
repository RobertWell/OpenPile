import os
from utils.tools import Tools
from ._MicroCli.Command import Command
from .MicroInterface import MicroInterface


class MicroCli(Command, MicroInterface):
    typeD = {
        'tsc': 'react-tsc',
        'js': 'react-js',
        'vue': 'vue'
    }
    key = ['Name', ]
    port = 8080
    container_port = 8081
    container = 'container'
    payload = {}

    def __init__(self, config, port=None, container_port=None, container=None, root=None, templates=None):
        super().__init__(config, root, templates)
        if port:
            self.port = port
        if container_port:
            self.container_port = container_port
        if container:
            self.container = container

        self.payload = {

            'Name': self.Name,
            'NameCapitalize': self.Name.capitalize(),
            'namelower': self.Name.lower(),
            'Port': self.port,
            'ContainerPort': self.container_port,
            'Container': self.container,
            'Modules': [
                {
                    'Name': self.Name,
                    'Port': self.port
                }
            ]
        }

    def __str__(self):
        return super().__str__() + \
               f'\npayload: {self.payload}\n'

    # f'port: {self.port}\n' + \
    # f"container_port: {self.container_port}\n" + \
    # f'container: {self.container}\n' + \

    def generate(self):
        # print(template, workflows)

        template = f"{self._templates}/subapps/{self.typeD[self.app_type]}/'-namelower-'"
        workflows = f'{self._templates}/subapps/workflows'
        Tools.generate_module(self.app_output, template, workflows, self.payload)

        Components = f'{self._templates}/subapps/{self.typeD[self.app_type]}/container/src'
        Tools.generate_module_container(self.app_output + f'/{self.container}', Components, self.payload)

        if self.app_form == 'container':
            config = f'{self._templates}/subapps/container/config'
            Tools.generate_module_container(self.app_output + f'/{self.container}', config, self.payload)

            c_workflows = f'{self._templates}/container/workflows'
            Tools.generate_module(self.app_output + f'/{self.container}', template, c_workflows, self.payload)

    # def run(self):
    #     self.generate()
    #     if self.app_form == 'module':
    #         container = f'{self._templates}/subapps/{self.typeD[self.app_type]}/container'
    #         Tools.generate_module_container(self.app_output, container, self.payload)
    #
    #         container = f'{self._templates}/subapps/container/config'
    #         Tools.generate_module_container(self.app_output + '/container', container, self.payload)

    def root(self, root):
        self._root = root

    def templates(self, templates):
        if os.path.isdir(templates):
            self._templates = templates
        else:
            self._templates = f"{self._root}/{templates}"

    def output(self, output):
        self.app_output = output

    def parse_relative_folder2output(self, rf):
        return f'{self.app_output}/{rf}'
