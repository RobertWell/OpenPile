from queue import Queue
from ._MicroFront.MicroInterface import MicroInterface


class ModuleQueue(Queue):
    def add(self, item: MicroInterface):
        self.put(item)

