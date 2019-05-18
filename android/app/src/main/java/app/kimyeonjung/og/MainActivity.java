package app.kimyeonjung.og;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import com.akexorcist.roundcornerprogressbar.IconRoundCornerProgressBar;

import org.adw.library.widgets.discreteseekbar.DiscreteSeekBar;

import java.text.MessageFormat;

import app.kimyeonjung.og.core.Logger;
import app.kimyeonjung.og.core.UploadData;
import app.kimyeonjung.og.core.bluetooth.BluetoothSPP;
import app.kimyeonjung.og.core.bluetooth.BluetoothState;
import app.kimyeonjung.og.core.bluetooth.DeviceList;
import app.kimyeonjung.og.bean.CommandBean;
import app.kimyeonjung.og.bean.DataBean;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, CompoundButton.OnCheckedChangeListener {

    private String key = "3bb8d4f4ccf57c5c927cb54191f77618e987b644d60d419f862c8f280630fff9b157422e27bd9b118921543d58c4506b2acef2d3f53544f0722187219e2a88ac";
    private String clientId = "mCcaI95vzy";

    private DataBean dataBean;
    private CommandBean commandBean;

    private boolean isDeviceConnected = false;
    private boolean isFirstData = true;

    private Switch autoSwitch;
    private Switch fanSwitch;
    private Switch ledSwitch;
    private Switch humSwitch;

    private BluetoothSPP bluetoothSPP;
    private BluetoothSPP.OnDataReceivedListener bluetoothDataReceivedListener = new BluetoothSPP.OnDataReceivedListener() {
        // 데이터 수신
        @Override
        public void onDataReceived(byte[] data, String message) {
            Logger.d("BLUETOOTH : DATE RECEIVED");
            Logger.d(message);
            dataBean.setData(message);
            if (isFirstData) {
                isFirstData = false;
                findViewById(R.id.main_control_container).setVisibility(View.VISIBLE);
            }
            MainActivity.this.updateData();
            new UploadData(clientId,key,dataBean).execute();
        }
    };

    private BluetoothSPP.BluetoothConnectionListener bluetoothConnectionListener = new BluetoothSPP.BluetoothConnectionListener() {
        @Override
        public void onDeviceConnected(String name, String address) {
            Logger.d("BLUETOOTH : CONNECTED");
            isDeviceConnected = true;
            findViewById(R.id.main_send_command_button).setEnabled(true);
            findViewById(R.id.main_control_container).setVisibility(View.VISIBLE);
        }

        @Override
        public void onDeviceDisconnected() {
            Logger.d("BLUETOOTH : DISCONNECTED");
            isDeviceConnected = false;
            findViewById(R.id.main_send_command_button).setEnabled(false);
            ((TextView)findViewById(R.id.main_status_text)).setText("AUT : ---\nFAN : ---\nLED : ---\nHUM : ---");
        }

        @Override
        public void onDeviceConnectionFailed() {
            Logger.e("BLUETOOTH : CONNECTION FAIL");
            isDeviceConnected = false;
            findViewById(R.id.main_send_command_button).setEnabled(false);
        }
    };

    private DiscreteSeekBar.OnProgressChangeListener progressChangeListener = new DiscreteSeekBar.OnProgressChangeListener() {
        @Override
        public void onProgressChanged(DiscreteSeekBar seekBar, int value, boolean fromUser) {
            if (!fromUser) {
                return;
            }

            switch (seekBar.getId()) {
                case R.id.main_humidity_set_seekbar:
                    commandBean.setHumidity(value);
                    break;
                case R.id.main_temperature_set_seekbar:
                    commandBean.setTemperature(value);
                    break;
                case R.id.main_brightness_set_seekbar:
                    commandBean.setBrightness(value);
                    break;
                default:
            }
        }

        @Override
        public void onStartTrackingTouch(DiscreteSeekBar seekBar) {

        }

        @Override
        public void onStopTrackingTouch(DiscreteSeekBar seekBar) {

        }
    };

    @Override
    protected void onStart() {
        super.onStart();
        if (!bluetoothSPP.isBluetoothEnabled()) {
            Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(intent, BluetoothState.REQUEST_ENABLE_BT);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.main_send_command_button).setOnClickListener(this);

        autoSwitch = findViewById(R.id.main_enable_auto_mode_switch);
        autoSwitch.setOnCheckedChangeListener(this);

        ledSwitch = findViewById(R.id.main_enable_led_switch);
        ledSwitch.setOnCheckedChangeListener(this);

        fanSwitch = findViewById(R.id.main_enable_fan_switch);
        fanSwitch.setOnCheckedChangeListener(this);

        humSwitch = findViewById(R.id.main_enable_humidifier_enable_switch);
        humSwitch.setOnCheckedChangeListener(this);

        DiscreteSeekBar temperatureSeekbar = findViewById(R.id.main_humidity_set_seekbar);
        temperatureSeekbar.setOnProgressChangeListener(progressChangeListener);

        DiscreteSeekBar humiditySeekbar = findViewById(R.id.main_temperature_set_seekbar);
        humiditySeekbar.setOnProgressChangeListener(progressChangeListener);

        DiscreteSeekBar brightnessSeekbar = findViewById(R.id.main_brightness_set_seekbar);
        brightnessSeekbar.setOnProgressChangeListener(progressChangeListener);

        dataBean = new DataBean();
        commandBean = new CommandBean();

        // 블루투스
        bluetoothSPP = new BluetoothSPP(getApplicationContext());
        if (!bluetoothSPP.isBluetoothAvailable()) {
            Logger.d("블루투스 사용 불가");
            finish();
        }

        initBluetooth();
    }

    private void initBluetooth() {
        bluetoothSPP.setupService();
        bluetoothSPP.startService(BluetoothState.DEVICE_OTHER);
        bluetoothSPP.setOnDataReceivedListener(bluetoothDataReceivedListener);
        bluetoothSPP.setBluetoothConnectionListener(bluetoothConnectionListener);

        // 블루투스 장치 선택
        if (bluetoothSPP.getServiceState() == BluetoothState.STATE_CONNECTED) {
            bluetoothSPP.disconnect();
        }

        Intent intent = new Intent(getApplicationContext(), DeviceList.class);
        intent.putExtra("bluetooth_devices", "연결 가능한 장비");
        intent.putExtra("no_devices_found", "디바이스 없음");
        intent.putExtra("scanning", "검색중");
        intent.putExtra("scan_for_devices", "검색");
        intent.putExtra("select_device", "선택");
        startActivityForResult(intent, BluetoothState.REQUEST_CONNECT_DEVICE);
    }

    private void updateData() {
        IconRoundCornerProgressBar humidityProgress = findViewById(R.id.main_humidity_current_progress);
        IconRoundCornerProgressBar temperatureProgress = findViewById(R.id.main_temperature_current_progress);
        IconRoundCornerProgressBar brightnessProgress = findViewById(R.id.main_brightness_current_progress);

        humidityProgress.setProgress(dataBean.getHumidity());
        humidityProgress.setSecondaryProgress(dataBean.getHumiditySet());

        temperatureProgress.setProgress(dataBean.getTemperature());
        temperatureProgress.setSecondaryProgress(dataBean.getTemperatureSet());

        brightnessProgress.setProgress(dataBean.getBrightness());
        brightnessProgress.setSecondaryProgress(dataBean.getBrightnessSet());

        TextView statusText = findViewById(R.id.main_status_text);
        String status = MessageFormat.format(
                "AUT : {0}\nFAN : {1}\nLED : {2}\nHUM : {3}",
                dataBean.isAutoMode(),
                dataBean.isFanEnable(),
                dataBean.isLedEnable() ,
                dataBean.isHumidifierEnable()
        );
        statusText.setText(status);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK) {
            switch (requestCode) {
                case BluetoothState.REQUEST_CONNECT_DEVICE:
                    bluetoothSPP.connect(data);
                    break;
                case BluetoothState.REQUEST_ENABLE_BT:
                    initBluetooth();
                    break;
                default:
            }
        }
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.main_send_command_button && isDeviceConnected && commandBean != null) {
            Logger.d(commandBean.getCommand().toString());
            bluetoothSPP.send(commandBean.getCommand(), true);
        }
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (buttonView.getId() != R.id.main_enable_auto_mode_switch && !isChecked) {
            autoSwitch.setChecked(false);
        }
        switch (buttonView.getId()) {
            case R.id.main_enable_auto_mode_switch:
                commandBean.setAutoMode(isChecked);
                if (isChecked) {
                    fanSwitch.setChecked(true);
                    ledSwitch.setChecked(true);
                    humSwitch.setChecked(true);
                }
                break;
            case R.id.main_enable_fan_switch:
                commandBean.setFanEnable(isChecked);
                break;
            case R.id.main_enable_humidifier_enable_switch:
                commandBean.setHumidifierEnable(isChecked);
                break;
            case R.id.main_enable_led_switch:
                commandBean.setLedEnable(isChecked);
                break;
            default:
        }
    }
}
