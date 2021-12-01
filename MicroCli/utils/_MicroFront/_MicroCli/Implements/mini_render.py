from jinja2 import Template


def mini_render(p, payload):
    return Template(p).render(**payload)
