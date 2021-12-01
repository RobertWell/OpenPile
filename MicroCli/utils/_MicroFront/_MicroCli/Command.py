from utils.tools import Tools
import os


class Command:
    _root = None
    _templates = None
    _container = None
    Name = None
    app_type = None
    app_form = 'module'
    app_output = f'{_root}/output'


    command = None

    def boot(self):
        self.command = {
            '-tsc': self.assign_type,
            '-js': self.assign_type,
            '-vue': self.assign_type,
            '-o': self.assign_output,
            '-template': self.assign_template,
            '-root': self.assign_root,
            '-module': self.assign_form,
            '-container': self.assign_form
        }

    def __init__(self, config, root=None, templates=None):
        self.boot()
        if root:
            self._root = root
        if templates:
            self._templates = templates
        self._container = f'{self._templates}/container'
        self._config = config

        i = 1
        self.Name = config[0]

        while i < len(config):
            c = config[i].strip(' ')
            i = self.command[c](c.lower(), i)
            i += 1

        if not self._templates:
            self._templates = f'{self._root}/templates'

    def assign_template(self, _, i):
        p = self._config[i + 1]
        if Tools.check_param(p):
            raise TypeError("Wrong Param: ", p)
        self._templates = p
        return i + 1

    def assign_root(self, _, i):
        p = self._config[i + 1]
        if Tools.check_param(p):
            raise TypeError("Wrong Param: ", p)
        self._root = p
        return i + 1

    def assign_form(self, form, i):
        self.app_form = form.strip('-')
        return i

    def assign_type(self, target, i):
        self.app_type = target.strip('-')
        return i

    def assign_output(self, _, i):
        output = self._config[i + 1]
        if Tools.check_param(output):
            raise TypeError("Wrong Param:", output)
        self.output(output)
        return i + 1

    def __str__(self):
        return f'App: {self.Name}, Type: {self.app_type}\n' \
               + f'Template Folder: {self._templates}\n' \
               + f'Target Folder: {self.app_output}\n' \
               + f'App Form: {self.app_form}'
