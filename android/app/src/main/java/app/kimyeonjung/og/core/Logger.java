package app.kimyeonjung.og.core;

import android.util.Log;

import app.kimyeonjung.og.BuildConfig;

public class Logger {
    private static final String TAG = "OG-TEST";

    private Logger() {
    }

    public static void d(String message) {
        if (BuildConfig.DEBUG) {
            Log.d(TAG, message);
        }
    }

    public static void e(String message) {
        if (BuildConfig.DEBUG) {
            Log.e(TAG, message);
        }
    }

    public static void e(Exception e) {
        if (BuildConfig.DEBUG) {
            Log.e(TAG, e.getMessage());
            Log.e(TAG, e.toString());
        }
    }
}
