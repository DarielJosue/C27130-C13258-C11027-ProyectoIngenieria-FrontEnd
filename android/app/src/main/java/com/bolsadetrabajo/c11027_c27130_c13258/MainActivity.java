package com.bolsadetrabajo.c11027_c27130_c13258;

import com.getcapacitor.BridgeActivity;

import com.capacitorjs.plugins.browser.BrowserPlugin;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(BrowserPlugin.class);
    }
}
