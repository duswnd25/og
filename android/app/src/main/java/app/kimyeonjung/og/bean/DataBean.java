package app.kimyeonjung.og.bean;

/**
 * 수신 데이터 순서 ; 밝기 센서값 / 밝기 설정값 / 온도 센서값 / 온도 설정값 / 습도 센서값 / 습도 설정값 / 자동 모드 / 가습 활성 / 쿨러 활성 / LED 활성
 */

public class DataBean {
    private float humidity = 0;
    private float humiditySet = 0;
    private int brightness = 0;
    private int brightnessSet = 0;
    private float temperature = 0;
    private float temperatureSet = 0;
    private boolean autoMode = true;
    private boolean fanEnable = true;
    private boolean ledEnable = true;
    private boolean humidifierEnable = true;

    public void setData(String input) {
        String[] temp = input.split("/");
        brightness = Integer.parseInt(temp[0]);
        brightnessSet = Integer.parseInt(temp[1]);
        temperature = Float.parseFloat(temp[2]);
        temperatureSet = Float.parseFloat(temp[3]);
        humidity = Float.parseFloat(temp[4]);
        humiditySet = Float.parseFloat(temp[5]);
        autoMode = temp[6].equals("0");
        humidifierEnable = temp[7].equals("0");
        fanEnable = temp[8].equals("0");
        ledEnable = temp[9].equals("0");
    }

    public float getHumidity() {
        return humidity;
    }

    public float getHumiditySet() {
        return humiditySet;
    }

    public int getBrightness() {
        return brightness;
    }

    public int getBrightnessSet() {
        return brightnessSet;
    }

    public float getTemperature() {
        return temperature;
    }

    public float getTemperatureSet() {
        return temperatureSet;
    }

    public boolean isAutoMode() {
        return autoMode;
    }

    public boolean isFanEnable() {
        return fanEnable;
    }

    public boolean isLedEnable() {
        return ledEnable;
    }

    public boolean isHumidifierEnable() {
        return humidifierEnable;
    }
}
