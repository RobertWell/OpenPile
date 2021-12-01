import re
from .mini_render import mini_render


def render_context(data, payload):
    def get_rendered_template(matchobj):
        new_p = '{{' + f'{matchobj[0].strip("{}|")}' + '}}'
        return mini_render(new_p, payload)

    def direct_rendered(matchobj):
        p = matchobj[0]
        new_p = p[3:len(p) - 3]
        return mini_render(new_p, payload)

    data = re.sub('{(\s*)\|(\s*){[^{}]+}(\s*)\|(\s*)}', get_rendered_template, data)
    pattern = '{#{[\s\S]+?}#}'
    data = re.sub('{#{[\s\S]+?}#}', direct_rendered, data)
    # g = re.finditer('pattern', data)
    # if g:
    #     try:
    #         for i in g:
    #             direct_rendered(i)
    #             print(i)
    #     except Exception as e:
    #         print('-------------------------------------------')
    #         print(g)
    #         print('-------------------------------------------')

    return data


def render_filename(data, payload):
    def get_rendered_template(matchobj):
        s = "{}|'+-"
        new_p = '{{' + f'{matchobj[0].strip(s)}' + '}}'
        return mini_render(new_p, payload)

    data = re.sub("'-[^-]+-'", get_rendered_template, data)
    return data
