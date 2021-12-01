import os
from .MicroFront import MicroFront

root = os.path.dirname(os.path.realpath(__file__))


def main(config, output):
    # cli = MicroCli(config,
    #                root=os.path.dirname(os.path.realpath(__file__)),
    #                port=8087,
    #                container_port=8080
    #                )
    # cli.run()
    root = os.path.dirname(os.path.realpath(__file__))
    cli = MicroFront(config, output=output, root=root,templates=f'{root}/templates' )
    cli.run()
