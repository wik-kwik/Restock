import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt
import requests
import json
from datetime import datetime
import subprocess


# GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)

# Set GPIO Pins for Ultrasonic Sensor
GPIO_TRIGGER = 14
GPIO_ECHO = 15

# Set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

#############
def get_wifi_mac_address(interface='wlan0'):
    try:
        # Run the command to get the MAC address
        result = subprocess.check_output(['cat', f'/sys/class/net/{interface}/address']).decode().strip()
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None


mac_address = get_wifi_mac_address()
if mac_address:
    print(f"MAC Address: {mac_address}")
else:
    print("Failed to get MAC address.")

user_token = "siemasensor"

msg_payload = {
    "mac": mac_address,
    "type": "D"
}


def get_sensor_token(msg_payload, user_token):
    url = 'http://192.168.241.172:8080/api/sensors/register'  # Replace with your actual server URL
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Register ' + user_token  # Add the JWT token here
    }

    response = requests.post(url, data=json.dumps(msg_payload), headers=headers) #verify = False added by JSO
    return response.status_code, response.json()["token"]

distance_token = get_sensor_token(msg_payload,user_token)[1]

print("Distance sensor found with assigned token: ",distance_token)
################


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
client.connect('192.168.241.24', 1883) # tutaj ip - to jest takie jak ma u mnie na sieci duze rpi
client.loop_start()

distance_token = get_sensor_token(msg_payload,user_token)[1]
pubmsgg = client.publish(
        topic = 'rpi/distance_MAC',
        payload = distance_token.encode('utf-8'),
        qos=0,
)
pubmsgg.wait_for_publish()

prev_dist = distance()

# Function to send sensor data to the server with JWT authentication

def get_sensor_threshold(distance_token):
    url = 'http://192.168.241.172:8080/api/thresholds'  # Replace with your actual server URL
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Sensor ' + distance_token  # Add the JWT token here
    }

    response = requests.get(url, headers=headers) #verify = False added by JSO
    return response.status_code, response.json()["value"]
send_threshold = get_sensor_threshold(distance_token)
print("Threshold assigned to this sensor found with vale: ",send_threshold[1])
try:
    while True:
#        status_code, response = get_sensor_threshold(distance_token)
#        print("Response: ", response)
        dist = distance()
        print("Measured Distance = %.1f cm" % dist)
        
        # Publishing the distance if it's greater than 2 from the previous measurement
        if abs(prev_dist - dist) > send_threshold[1]:
            msg = str(dist)
            pubMsg = client.publish(
                topic='rpi/distance',
                payload=msg.encode('utf-8'),
                qos=0,
            )
            pubMsg.wait_for_publish()

        time.sleep(5)
        prev_dist = dist

except KeyboardInterrupt:
    print("Measurement stopped by User")
    GPIO.cleanup()
    client.loop_stop()
