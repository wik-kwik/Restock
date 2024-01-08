import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt
import time
import requests
import json
from datetime import datetime

# Set the GPIO pin mode
GPIO.setmode(GPIO.BCM)

# GPIO pin number where the button is connected
button_pin = 22

# Set the pin as input
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def on_publish(client,userdata,mid):
    print("Message Published")

client = mqtt.Client("rpi_client2")
client.on_publish = on_publish
client.connect('192.168.0.172', 1883) # tutaj ip - to jest takie jak ma u mnie na sieci duze rpi
client.loop_start()


try:
    print("Waiting for button press...")

    # Main loop
    while True:
        # Read the state of the button
        button_state = GPIO.input(button_pin)

        # If the button is pressed (low state), perform the corresponding action
        if not button_state:
            print("Button pressed!")
            msg = str(True)
            pubMsg = client.publish(
                topic='rpi/button',
                payload=msg.encode('utf-8'),
                qos=0,
            )
            pubMsg.wait_for_publish()

            # Here you can place the code to react to the button press

            # Wait for a moment to avoid detecting multiple presses for a single press
            time.sleep(0.5)

except KeyboardInterrupt:
    print("Interrupted by the user.")

finally:
    # Reset GPIO settings
    GPIO.cleanup()

