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
int temperatureSetValue = 30;
int humiditySetValue = 50;

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

void parsingCommand(String sData)
{

	//원본 복사
	String sCopy = sData;

	char token = '/';
	int commandIndex = 0;
	int tokenIndex = 0;

	// brightnessSetValue/temperatureSetValue/humiditySetValue/automode/humidity/fan/led/
	// default command is 500/50/50/1/1/1/1/
	// don't forget to add / to last

	while (true)
	{
		tokenIndex = sCopy.indexOf(token);

		if (-1 != tokenIndex)
		{
			String sTemp = sCopy.substring(0, tokenIndex);

			switch (commandIndex)
			{
			case 0:
				brightnessSetValue = sTemp.toInt();
				isHardwareEnableValueChange = true;
				break;
			case 1:
				temperatureSetValue = sTemp.toInt();
				isHardwareEnableValueChange = true;
				break;
			case 2:
				humiditySetValue = sTemp.toInt();
				isHardwareEnableValueChange = true;
				break;
			case 3:
				switchHardwareStatus(STATUS_LED, (sTemp.toInt() == 1));
				break;
			case 4:
				if (!isAutoMode)
				{
					switchHardwareStatus(HUMIDITY, (sTemp.toInt() == 1));
				}
				break;
			case 5:
				if (!isAutoMode)
				{
					switchHardwareStatus(FAN, (sTemp.toInt() == 1));
				}
				break;
			case 6:
				if (!isAutoMode)
				{
					switchHardwareStatus(LED, (sTemp.toInt() == 1));
				}
				break;
			default:
				break;
			}

			sCopy = sCopy.substring(tokenIndex + 1);
		}
		else
		{
			// end
			isCommandInput = false;
			break;
		}

		// to next
		++commandIndex;
	}
}

void setup()
{
	Serial.begin(9600);
	DHT.begin();

	Serial.println("SYSTEM : SETUP");

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
	isHardwareStatusChange = false;
	isHardwareEnableValueChange = false;

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
	if (isHardwareStatusChange)
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
	if (isHardwareEnableValueChange)
	{
		Serial.print("BRIGHTNESS SET : ");
		Serial.println(brightnessSetValue);

		Serial.print("TEMPERATURE SET : ");
		Serial.println(temperatureSetValue);

		Serial.print("HUMIDITY SET : ");
		Serial.println(humiditySetValue);
	}

	Serial.print("BRIGHTNESS : ");
	Serial.println(brightnessValue);

	Serial.print("TEMPERATURE : ");
	Serial.println(temperatureValue);

	Serial.print("HUMIDITY : ");
	Serial.println(humidityValue);

	delay(MIN_DEPLAY);
}
