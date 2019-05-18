package app.kimyeonjung.og.core;

import android.os.AsyncTask;

import java.text.MessageFormat;

import app.kimyeonjung.og.bean.DataBean;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

public class UploadData extends AsyncTask<Void, Void, Void> {

    private DataBean dataBean;
    private String clientId;
    private String key;

    public UploadData(String clientId, String key, DataBean dataBean) {
        this.clientId = clientId;
        this.key = key;
        this.dataBean = dataBean;
    }

    @Override
    protected Void doInBackground(Void... params) {
        try {
            double total = 0;
            if (Math.abs(dataBean.getBrightnessSet() - dataBean.getBrightness()) > 50) {
                total++;
            }

            if (Math.abs(dataBean.getHumiditySet() - dataBean.getHumidity()) > 50) {
                total++;
            }

            if (Math.abs(dataBean.getTemperatureSet() - dataBean.getTemperature()) > 50) {
                total++;
            }

            total /= 3;
            total *= 100;

            String url = MessageFormat.format("https://og-board.herokuapp.com/api/v1/datas/{0}/update/staus", clientId);
            StringBuilder query = new StringBuilder();
            query.append("key=").append(key).append("&");
            query.append("brightness=").append(dataBean.getBrightness()).append("&");
            query.append("humidity=").append(dataBean.getHumidity()).append("&");
            query.append("temperature=").append(dataBean.getTemperature()).append("&");
            query.append("total=").append((int) total);

            OkHttpClient client = new OkHttpClient();

            MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
            RequestBody body = RequestBody.create(mediaType, query.toString());
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .addHeader("Content-Type", "application/x-www-form-urlencoded")
                    .addHeader("cache-control", "no-cache")
                    .build();
            client.newCall(request).execute();
        } catch (Exception e) {
            Logger.e(e);
        }

        return null;
    }
}