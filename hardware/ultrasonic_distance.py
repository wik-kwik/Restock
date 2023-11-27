import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

# GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)

# Set GPIO Pins for Ultrasonic Sensor
GPIO_TRIGGER = 14
GPIO_ECHO = 15

# Set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

def distance():
    # Set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)

    # Set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)

    StartTime = time.time()
    StopTime = time.time()

    # Save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()

    # Save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()

    # Time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # Multiply with the sonic speed (34300 cm/s) and divide by 2
    return (TimeElapsed * 34300) / 2

# MQTT setup
def on_publish(client, userdata, mid):
    print("Message Published")

client = mqtt.Client("rpi_client2")
client.on_publish = on_publish
client.connect('192.168.1.26', 1883) # tutaj ip - to jest takie jak ma u mnie na sieci duze rpi
client.loop_start()

try:
    while True:
        dist = distance()
        print("Measured Distance = %.1f cm" % dist)
        if not(abs(prev_dist - dist) < 1):
            # Publishing the distance
            msg = str(dist)
            pubMsg = client.publish(
                topic='rpi/distance',
                payload=msg.encode('utf-8'),
                qos=0,
            )
            pubMsg.wait_for_publish()

        time.sleep(1)
        prev_dist = dist

except KeyboardInterrupt:
    print("Measurement stopped by User")
    GPIO.cleanup()
    client.loop_stop()
    