package com.michael.calculus;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import top.apphub.account.AppHubActivity;

@CapacitorPlugin(name = "AppHubAccount")
public final class AppHubAccount extends Plugin {
    @PluginMethod public void open(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            AppHubActivity.open(getActivity());
            call.resolve();
        });
    }
}
