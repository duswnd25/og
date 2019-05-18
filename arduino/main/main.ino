#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <SoftwareSerial.h>

#define FAN 6
#define LED 7
#define HUMIDITY 10
#define STATUS_LED 13
#define TEM_HUM_SENSOR 3

// hardware enable value set
int brightnessSetValue = 500;
float temperatureSetValue = 30;
float humiditySetValue = 0.5;

// control hardware flag
bool isAutoMode = true;
bool isFanEnable = true;
bool isLedEnable = true;
bool isHumEnable = true;
bool isCommandInput = false;

// value change flag
bool isHardwareStatusChange = false;
bool isHardwareEnableValueChange = false;

// 온습도
DHT_Unified DHT(TEM_HUM_SENSOR, DHT11);
uint32_t MIN_DEPLAY = 20000;

void switchHardwareStatus(int target, bool flag)
{
    if (target == LED)
    {
        if (isLedEnable == flag)
        {
            return;
        }
        isLedEnable = flag;
    }
    else if (target == FAN)
    {
        if (isFanEnable == flag)
        {
            return;
        }
        isFanEnable = flag;
    }
    else if (target == HUMIDITY)
    {
        if (isHumEnable == flag)
        {
            return;
        }

        isHumEnable = flag;
    }
    else if (target == STATUS_LED)
    {
        if (isAutoMode == flag)
        {
            return;
        }
        isAutoMode = flag;
    }

    isHardwareStatusChange = true;
    digitalWrite(target, flag ? LOW : HIGH);
}

void parsingCommand(String input)
{
    char token = ':';
    int tokenIndex = 0;

    //copy original string
    String sCopy = input;
    String value = "";

    tokenIndex = sCopy.indexOf(token);

    // command
    String command = sCopy.substring(0, tokenIndex);
    command.trim();
    command.toUpperCase();

    // value
    value = sCopy.substring(tokenIndex + 1, sCopy.length());
    value.trim();
    value.toUpperCase();

    if (command.equals("LED"))
    {
        switchHardwareStatus(LED, value.equals("TRUE") ? true : false);
    }
    else if (command.equals("HUM"))
    {
        switchHardwareStatus(HUMIDITY, value.equals("TRUE") ? true : false);
    }
    else if (command.equals("FAN"))
    {
        switchHardwareStatus(FAN, value.equals("TRUE") ? true : false);
    }
    else if (command.equals("AUTO"))
    {
        switchHardwareStatus(STATUS_LED, value.equals("TRUE") ? true : false);
    }
    else if (command.equals("BRIGHTNESS"))
    {
        isHardwareEnableValueChange = true;
        brightnessSetValue = value.toInt();
    }
    else if (command.equals("HUMIDITY"))
    {
        isHardwareEnableValueChange = true;
        humiditySetValue = value.toFloat();
    }
    else if (command.equals("TEMPERATURE"))
    {
        isHardwareEnableValueChange = true;
        temperatureSetValue = value.toFloat();
    }

    isCommandInput = false;
}

void setup()
{
    Serial.begin(9600);
    DHT.begin();

    sensor_t sensor;

    DHT.temperature().getSensor(&sensor);
    DHT.humidity().getSensor(&sensor);

    MIN_DEPLAY = sensor.min_delay / 1000;

    pinMode(FAN, OUTPUT);
    pinMode(LED, OUTPUT);
    pinMode(HUMIDITY, OUTPUT);
    pinMode(STATUS_LED, OUTPUT);
}

void loop()
{
    String command = "";

    while (Serial.available())
    {
        byte data = Serial.read();
        command += (char)data;
        isCommandInput = true;
    }

    if (isCommandInput)
    {
        parsingCommand(command);
    }

    // get sensor value
    int brightnessValue = 0;
    int humidityValue = 0;
    int temperatureValue = 0;

    // brightness value
    brightnessValue = analogRead(A0);

    delay(MIN_DEPLAY); // delay for hum temp sensor's min delay
    sensors_event_t event;

    // temperature value
    DHT.temperature().getEvent(&event);
    if (!isnan(event.temperature))
    {
        temperatureValue = event.temperature;
    }

    // humidity value
    DHT.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity))
    {
        humidityValue = event.relative_humidity;
    }

    // change status in automode
    if (isAutoMode)
    {
        switchHardwareStatus(LED, brightnessValue < brightnessSetValue);
        switchHardwareStatus(FAN, temperatureValue > temperatureSetValue);
        switchHardwareStatus(HUMIDITY, humidityValue < humiditySetValue);
    }

    // print device status
    if (isHardwareStatusChange == true)
    {
        Serial.print("AUTO ENABLE : ");
        Serial.println(isAutoMode ? "TRUE" : "FALSE");
        Serial.print("FAN ENABLE : ");
        Serial.println(isFanEnable ? "TRUE" : "FALSE");
        Serial.print("LED ENABLE : ");
        Serial.println(isLedEnable ? "TRUE" : "FALSE");
        Serial.print("HUM ENABLE : ");
        Serial.println(isHumEnable ? "TRUE" : "FALSE");
    }

    // print sensor set value
    if (isHardwareEnableValueChange == true)
    {
        Serial.print("BRIGHTNESS SET : ");
        Serial.println(brightnessSetValue);

        Serial.print("TEMPERATURE SET : ");
        Serial.println(temperatureSetValue);

        Serial.print("HUMIDITY SET : ");
        Serial.println(humiditySetValue);
    }

    // print sensor value

    Serial.print("BRIGHTNESS : ");
    Serial.println(brightnessValue);

    Serial.print("TEMPERATURE : ");
    Serial.println(temperatureValue);

    Serial.print("HUMIDITY : ");
    Serial.println(humidityValue);

    isHardwareStatusChange = false;
    isHardwareEnableValueChange == false;

    delay(MIN_DEPLAY);
}
