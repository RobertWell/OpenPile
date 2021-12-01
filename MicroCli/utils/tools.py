import os
from utils._MicroFront._MicroCli.Implements.render import render_context, render_filename


class Tools:
    @staticmethod
    def mkdir(path):
        try:
            os.makedirs(path)
        except Exception as e:
            pass

    @staticmethod
    def traversal(target):
        temp = []
        for root, folder, files in os.walk(target):
            for f in files:
                rf = root.replace(target, '').strip(r'\/')
                file = {
                    'name': f,
                    'root': root,
                    'relative_folder': f'/{rf}',
                    'oripath': f'{root}/{f}'
                }
                # print(file['relative_folder'])
                temp.append(file)
        return temp

    @staticmethod
    def get_template(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            s = f.read()
        return s

    @staticmethod
    def check_param(p: str):
        return p.startswith('-')

    @staticmethod
    def write_file(data, filepath):
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(data)

    @staticmethod
    def g(folder, app_output, payload):
        files = Tools.traversal(folder)

        for f in files:
            p = os.path.join(f'{app_output}/', f'{os.path.basename(folder)}',
                             f["relative_folder"][1:])
            # print(p)
            Tools.mkdir(Tools.folder_confirm(p, payload))
            data = Tools.get_template(f['oripath'])

            filename = f['name']
            _, extension = os.path.splitext(f['name'])
            text = data
            if extension == '.ejs':
                text = render_context(data, payload)
                filename = _

            filename = render_filename(filename, payload)

            Tools.write_file(text, f'{Tools.folder_confirm(p, payload)}/{filename}')

    @staticmethod
    def generate_module_container(app_output, container, payload):
        app_output = Tools.folder_confirm(app_output, payload)
        Tools.mkdir(app_output)

        Tools.g(container, app_output, payload)

    @staticmethod
    def generate_module(app_output, _templates, workflows, payload):
        app_output = Tools.folder_confirm(app_output, payload)
        Tools.mkdir(app_output)

        Tools.g(workflows, app_output, payload)
        Tools.g(_templates, app_output, payload)
        # files = tools.traversal(_templates)

    @staticmethod
    def folder_confirm(filename, payload):
        return render_filename(filename, payload)

    @staticmethod
    def generate_container():
        pass
