from threading import Thread
from time import sleep
import pynput.mouse as mouse
import pynput.keyboard as keyboard

mouseControl = mouse.Controller()
kbControl = keyboard.Controller()

class AutoClicker(Thread):

    def __init__(self):

        super().__init__()

        self.ready = True
        self.running = False

    def run(self):
        while self.ready:
            sleep(0)

            while self.running:
                mouseControl.click(mouse.Button.left)
                sleep(0.001)


    def toggle(self):
        self.running = not self.running

    def stop(self):
        self.ready = False
        self.running = False

autoclicker = AutoClicker()

autoclicker.start()

def kbm_on_press(k):
    if k == keyboard.Key["ctrl_l"]:
        autoclicker.toggle()

with keyboard.Listener(on_press=kbm_on_press) as kbm_listener:
    kbm_listener.join()