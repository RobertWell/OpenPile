from abc import ABC, ABCMeta, abstractmethod


class MicroInterface(metaclass=ABCMeta):

    @abstractmethod
    def __init__(self, config, port, root):
        pass

    @abstractmethod
    def generate(self):
        pass
