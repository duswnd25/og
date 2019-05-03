#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <SoftwareSerial.h>

// 주변장치
#define FAN 6
#define LED 7
#define HUMIDITY 10

// 블루투스
#define BT_RXD 5
#define BT_TXD 4
SoftwareSerial bluetooth(BT_RXD, BT_TXD);

// 주변장치 작동 설정값
int BRIGHTNESS_SET = 500;
float HUMIDITY_SET = 0.5;
float TEMPERATURE_SET = 30;

// 디버그 플래그
int DEBUG_SENSOR = 1;
int DEBUG_BT = 0;

// 온습도
DHT_Unified DHT(3, DHT11);
uint32_t MIN_DEPLAY;

void setup()
{
    Serial.begin(9600);
    bluetooth.begin(9600);
    DHT.begin();

    sensor_t sensor;

    DHT.temperature().getSensor(&sensor);
    DHT.humidity().getSensor(&sensor);

    MIN_DEPLAY = sensor.min_delay / 1000;

    pinMode(FAN, OUTPUT);
    pinMode(LED, OUTPUT);
    pinMode(HUMIDITY, OUTPUT);
}

void switchLed(int value, int flag)
{
    digitalWrite(LED, flag == 0 ? LOW : HIGH);
    if (DEBUG_SENSOR == 0)
    {
        Serial.print("LED : ");
        Serial.println(flag == 0 ? "ON" : "OFF");
        if (value != -1)
        {
            Serial.print("BRG : ");
            Serial.println(value);
        }
    }
}

void switchFan(float value, int flag)
{
    digitalWrite(FAN, flag == 0 ? LOW : HIGH);
    if (DEBUG_SENSOR == 0)
    {
        Serial.print("FAN : ");
        Serial.println(flag == 0 ? "ON" : "OFF");
        if (value != -1)
        {
            Serial.print("TEP : ");
            Serial.println(value);
        }
    }
}

void switchHumidity(float value, int flag)
{
    digitalWrite(HUMIDITY, flag == 0 ? HIGH : LOW);
    if (DEBUG_SENSOR == 0)
    {
        Serial.print("HUM : ");
        Serial.println(flag == 0 ? "ON" : "OFF");
        if (value != -1)
        {
            Serial.print("HUM : ");
            Serial.println(value);
        }
    }
}

void loop()
{
    while (bluetooth.available())
    {
        byte data = bluetooth.read();
        Serial.write(data);
    }
    while (Serial.available())
    {
        byte data = Serial.read();
        bluetooth.write(data);
    }

    // 조도에 따른 LED 제어
    int brightnessValue = analogRead(A0);
    switchLed(brightnessValue, brightnessValue < BRIGHTNESS_SET ? 0 : 1);
    delay(MIN_DEPLAY);

    sensors_event_t event;

    // 온도에 따른 FAN 제어
    DHT.temperature().getEvent(&event);
    if (!isnan(event.temperature))
    {
        switchFan(event.temperature, event.temperature > TEMPERATURE_SET ? 0 : 1);
    }

    // 습도에 따른 가습기 제어
    DHT.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity))
    {
        switchHumidity(event.relative_humidity, event.relative_humidity < HUMIDITY_SET ? 0 : 1);
    }

    delay(100);
}