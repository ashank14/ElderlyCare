#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <Servo.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// WiFi credentials
const char* ssid = "Nothing phone 2a";
const char* password = "password";
const char* serverUrl = "http://192.168.223.230:8000/api/user/getSchedule";

// Servo setup
Servo myservo;
int servoPin = D0;  // Use a PWM-supported pin (D2 or D4)
int buzzerPin = D1;
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 5.5 * 3600, 60000);

int pos = 0; // Stores servo position
String lastMovedTime = "";  // Store last moved time

void setup() {
    Serial.begin(9600);
    pinMode(buzzerPin, OUTPUT);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting...");
    }
    Serial.println("Connected to WiFi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    // Initialize Servo
    myservo.attach(servoPin);
    myservo.write(0);  // Set servo to initial position

    // Start NTP client to fetch time
    timeClient.begin();
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        WiFiClient client;
        HTTPClient http;
        http.begin(client, serverUrl);
        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
            String payload = http.getString();
            Serial.println("Received: " + payload);

            // Parse JSON response
            StaticJsonDocument<300> doc;
            deserializeJson(doc, payload);

            String med1_time = doc["med1"]["time"];
            String med2_time = doc["med2"]["time"];
            String med3_time = doc["med3"]["time"];
            String med4_time = doc["med4"]["time"];

            Serial.printf("Medicine Schedule:\n");
            Serial.printf("1. %s\n", med1_time.c_str());
            Serial.printf("2. %s\n", med2_time.c_str());
            Serial.printf("3. %s\n", med3_time.c_str());
            Serial.printf("4. %s\n", med4_time.c_str());

            // Get current time
            String currentTime = getCurrentTime();

            if ((currentTime == med1_time || currentTime == med2_time || 
                 currentTime == med3_time || currentTime == med4_time)) {
                 
                if (currentTime != lastMovedTime) {
                    moveServo();
                    lastMovedTime = currentTime;
                }
            }
            
            // Reset lastMovedTime if a new minute starts
            if (getSeconds() == 0) {
                lastMovedTime = "";
            }
        } else {
            Serial.println("Error fetching data");
        }

        // Reset servo position after full rotation
        if (pos >= 180) {
            myservo.write(0);
            pos = 0;  // Reset pos to prevent overflow
        }

        http.end();
    }

    delay(1000);  // Check every second
}

void moveServo() {
    pos += 45;  // Increment position
    if (pos > 180) pos = 180;  // Ensure it doesn't exceed 180

    Serial.print("Moving Servo to: ");
    Serial.println(pos);
    
    myservo.write(pos);  // Move servo to the new position
    digitalWrite(buzzerPin, HIGH);
    delay(2000);
    digitalWrite(buzzerPin, LOW);
}

String getCurrentTime() {
    timeClient.update();
    String formattedTime = timeClient.getFormattedTime();
    Serial.println("Current time: " + formattedTime);
    return formattedTime.substring(0, 5);  // Extract HH:MM format
}

// Function to get seconds for resetting lastMovedTime
int getSeconds() {
    timeClient.update();
    return timeClient.getSeconds();
}
