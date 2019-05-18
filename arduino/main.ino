#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <SoftwareSerial.h>

// 주변장치
#define FAN 6
#define LED 7
#define HUMIDITY 10
#define STATUS 13

// 블루투스
#define BT_RXD 5
#define BT_TXD 4
SoftwareSerial bluetooth(BT_RXD, BT_TXD);

// 주변장치 작동 설정값
int BRIGHTNESS_SET = 500;
float TEMPERATURE_SET = 30;
float HUMIDITY_SET = 0.5;

// 컨트롤 플래그
boolean isAutoMode = true;
boolean isFanEnable = true;
boolean isLedEnable = true;
boolean isHumEnable = true;
boolean isCommandInput = false;

// 디버그 플래그
boolean DEBUG_SENSOR = 0;
boolean DEBUG_BT = 0;

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
    pinMode(STATUS, OUTPUT);
}

void switchLed(int value, boolean flag)
{
    isLedEnable = flag;
    digitalWrite(LED, isLedEnable ? LOW : HIGH);
    if (DEBUG_SENSOR)
    {
        Serial.print("LED : ");
        Serial.println(isLedEnable ? "ON" : "OFF");
        if (value != -1)
        {
            Serial.print("BRG : ");
            Serial.println(value);
        }
    }
}

void switchFan(float value, boolean flag)
{
    isFanEnable = flag;
    digitalWrite(FAN, isFanEnable ? LOW : HIGH);
    if (DEBUG_SENSOR)
    {
        Serial.print("FAN : ");
        Serial.println(isFanEnable ? "ON" : "OFF");
        if (value != -1)
        {
            Serial.print("TEP : ");
            Serial.println(value);
        }
    }
}

void switchHumidity(float value, boolean flag)
{
    isHumEnable = flag;
    digitalWrite(HUMIDITY, isHumEnable ? HIGH : LOW);
    if (DEBUG_SENSOR)
    {
        Serial.print("HUM : ");
        Serial.println(isHumEnable ? "ON" : "OFF");
        if (value != -1)
        {
            Serial.print("HUM : ");
            Serial.println(value);
        }
    }
}

void parsingCommand(String sData)
{
    char cSeparator = '/';
    int nCount = 0;
    int nGetIndex = 0;

    //원본 복사
    String sCopy = sData;

    while (true)
    {
        nGetIndex = sCopy.indexOf(cSeparator);

        if (-1 != nGetIndex)
        {
            String sTemp = sCopy.substring(0, nGetIndex);

            switch (nCount)
            {
            case 0:
                BRIGHTNESS_SET = sTemp.toInt();
                break;
            case 1:
                TEMPERATURE_SET = sTemp.toFloat();
                break;
            case 2:
                HUMIDITY_SET = sTemp.toFloat();
                break;
            case 3:
                isAutoMode = (sTemp.toInt() == 0);
                digitalWrite(STATUS, isAutoMode ? LOW : HIGH);
                break;
            case 4:
                switchHumidity(-1, (sTemp.toInt() == 0));
                break;
            case 5:
                switchFan(-1, (sTemp.toInt() == 0));
                break;
            case 6:
                switchLed(-1, (sTemp.toInt() == 0));
                break;
            default:
                break;
            }

            sCopy = sCopy.substring(nGetIndex + 1);
        }
        else
        {
            //없으면 마무리 한다.
            isCommandInput = false;
            break;
        }

        //다음 문자로~
        ++nCount;
    }
}

void loop()
{
    String command = "";
    while (bluetooth.available())
    {
        byte data = bluetooth.read();
        command += (char)data;
        isCommandInput = true;
    }

    if (DEBUG_BT)
    {
        while (Serial.available())
        {
            byte data = Serial.read();
            bluetooth.write(data);
        }
    }

    if (isCommandInput)
    {
        parsingCommand(command);
    }

    // 센서 값
    int brightnessValue = 0;
    int humidityValue = 0;
    int temperatureValue = 0;

    // 조도
    brightnessValue = analogRead(A0);
    delay(MIN_DEPLAY);

    sensors_event_t event;

    // 온도
    DHT.temperature().getEvent(&event);
    if (!isnan(event.temperature))
    {
        temperatureValue = event.temperature;
    }

    // 습도
    DHT.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity))
    {
        humidityValue = event.relative_humidity;
    }

    // 자동
    if (isAutoMode)
    {
        switchLed(brightnessValue, brightnessValue < BRIGHTNESS_SET);
        switchFan(temperatureValue, temperatureValue > TEMPERATURE_SET);
        switchHumidity(humidityValue, humidityValue < HUMIDITY_SET);
    }

    //수신 데이터 순서 ; 밝기 센서값 / 밝기 설정값 / 온도 센서값 / 온도 설정값 / 습도 센서값 / 습도 설정값 / 자동 모드 / 가습 활성 / 쿨러 활성 / LED 활성
    String sendData = "";
    sendData += brightnessValue;
    sendData += '/';
    sendData += BRIGHTNESS_SET;
    sendData += '/';
    sendData += temperatureValue;
    sendData += '/';
    sendData += TEMPERATURE_SET;
    sendData += '/';
    sendData += humidityValue;
    sendData += '/';
    sendData += HUMIDITY_SET;
    sendData += '/';
    sendData += (isAutoMode ? 0 : 1);
    sendData += '/';
    sendData += (isHumEnable ? 0 : 1);
    sendData += '/';
    sendData += (isFanEnable ? 0 : 1);
    sendData += '/';
    sendData += (isLedEnable ? 0 : 1);
    sendData += '/';
    bluetooth.println(sendData);
    delay(100);
}