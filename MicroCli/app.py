import os
from utils.main import main

config = {
    "container": 'dashboard',
    "Module": [
        # ['Heatmap', '-js'],
        # ['Card', '-tsc'],
        ['Heatmap', '-vue']
    ],

}

# config = [
#     'HelloVue',
#     '-vue',
#     '-container',
#     '-o ',
#     os.path.dirname(os.path.realpath(__file__)) + '/output'
# ]

if __name__ == '__main__':
    main(config, output=os.path.dirname(os.path.realpath(__file__)) + '/output')

    # cli=MicroFront(config, root=os.path.dirname(os.path.realpath(__file__)))
    # template = Template(get_template('templates/index.js.html'))
    # rendered = template.render()
    # print(rendered)
