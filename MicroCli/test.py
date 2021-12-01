from queue import Queue
import time
from threading import Thread
from concurrent.futures import ThreadPoolExecutor

class MyThread(Thread):
    def __init__(self, num):
        Thread.__init__(self)
        self.num = num

    def run(self):
        print("Thread", self.num)
        time.sleep(1)


threads = []
for i in range(5):
    threads.append(MyThread(i))
    threads[i].start()

# 主執行緒繼續執行自己的工作
# ...

# 等待所有子執行緒結束
for i in range(5):
    threads[i].join()

print("Done.")
