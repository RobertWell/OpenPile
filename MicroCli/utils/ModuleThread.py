from queue import Queue
import time, threading


class ModuleThread(threading.Thread):

    def run(self):
        print('run')
