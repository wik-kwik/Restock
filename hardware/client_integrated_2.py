import paho.mqtt.client as mqtt
import time
import requests
import json
from datetime import datetime
import subprocess
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

user_token = "siemsensor"

msg_payload = {
    "mac": mac_address,
    "type": "D"
}


def get_sensor_token(msg_payload, user_token):
    url = 'http://192.168.241.172:8080/api/sensors'  # Replace with your actual server URL
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Register ' + user_token  # Add the JWT token here
    }

    response = requests.post(url, data=json.dumps(msg_payload), headers=headers) #verify = False added by JSO
    return response.status_code, response.json()["token"]

################

def on_connect(client, userdata, flags, rc):
    global flag_connected
    flag_connected = 1
    client_subscriptions(client)
    print("Connected to MQTT server")

def on_disconnect(client, userdata, rc):
    global flag_connected
    flag_connected = 0
    print("Disconnected from MQTT server")

def callback_ultrasonic_MAC(client,userdata,msg):
        print('MAC OF ULTRASENSOR:', msg.payload.decode('utf-8'))
        global distance_token
        distance_token = msg.payload.decode('utf-8')
        print(distance_token)
# a callback function
def callback_ultrasonic(client, userdata, msg):
    global distance_token
    print('Ultrasonic sensor data:', msg.payload.decode('utf-8'))
    # Sending the data
    # Example sensor data
    sensor_data = {
        "value": msg.payload.decode('utf-8')
    }
    status_code, response = send_sensor_data(sensor_data, distance_token)
    print(f"Status Code: {status_code}, Response: {response}")

def callback_button(client, userdata, msg):
    print('button:', msg.payload.decode('utf-8'))
    # Sending the data
    # Example sensor data
    sensor_data = {
        "value": msg.payload.decode('utf-8')
    }
    status_code, response = send_button_data(sensor_data, button_token)
    print(f"Status Code: {status_code}, Response: {response}")


def client_subscriptions(client):
    client.subscribe("rpi/distance")
    client.subscribe("rpi/button")
    client.subscribe("rpi/distance_MAC")
# Function to send sensor data to the server with JWT authentication
def send_sensor_data(sensor_data, distance_token):
    url = 'http://192.168.241.172:8080/api/data'  # Replace with your actual server URL
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Sensor {distance_token}'  # Add the JWT token here
    }

    response = requests.post(url, data=json.dumps(sensor_data), headers=headers) #Added by JSO 17.12
    return response.status_code, response.json()

def send_button_data(sensor_data, button_token):
    url = 'http://192.168.241.172:8080/api/data'  # Replace with your actual server URL
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Sensor {button_token}'  # Add the JWT token here
    }

    response = requests.post(url, data=json.dumps(sensor_data), headers=headers) #Added by JSO 17.12
    return response.status_code, response.json()

# Your JWT token (you should obtain this from your authentication endpoint)
#distance_token = 'LF4hWAFrixZLMsbjbrJDMz9wS'
button_token = '2iJziUexw6OnUZWcfzHj5X7EA'

client = mqtt.Client("rpi_client12")  # This should be a unique name
flag_connected = 0

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.message_callback_add('rpi/distance_MAC',callback_ultrasonic_MAC)
client.message_callback_add('rpi/distance', callback_ultrasonic)
client.message_callback_add('rpi/button', callback_button)
client.connect('127.0.0.1', 1883)  # You may replace with the IP address of the MQTT broker
# start a new thread
client.loop_start()
client_subscriptions(client)
print("......client setup complete............")

while True:
    time.sleep(4)
    if flag_connected != 1:
        print("Trying to connect to MQTT server...")
