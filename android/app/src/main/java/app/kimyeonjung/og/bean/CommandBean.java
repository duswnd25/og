package app.kimyeonjung.og.bean;

import java.text.MessageFormat;

/**
 * 송신 데이터 순서 : 밝기 설정 / 온도 설정 / 습도 설정 / 자동 모드 / 가습 활성 / 쿨러 활성 / LED 활성
 */

public class CommandBean {
    private int brightness = 500;
    private double temperature = 21.5;
    private double humidity = 2.0;
    private boolean autoMode = false;
    private boolean humidifierEnable = true;
    private boolean fanEnable = true;
    private boolean ledEnable = true;

    public String getCommand() {
        return MessageFormat.format("{0}/{1}/{2}/{3}/{4}/{5}/{6}/",
                brightness,
                temperature,
                humidity,
                (autoMode ? "0" : "1"),
                (humidifierEnable ? "0" : "1"),
                (fanEnable ? "0" : "1"),
                (ledEnable ? "0" : "1")
        );
    }

    public void setBrightness(int brightness) {
        this.brightness = brightness;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public void setAutoMode(boolean autoMode) {
        this.autoMode = autoMode;
    }

    public void setFanEnable(boolean fanEnable) {
        this.fanEnable = fanEnable;
    }

    public void setLedEnable(boolean ledEnable) {
        this.ledEnable = ledEnable;
    }

    public void setHumidifierEnable(boolean humidifierEnable) {
        this.humidifierEnable = humidifierEnable;
    }
}
