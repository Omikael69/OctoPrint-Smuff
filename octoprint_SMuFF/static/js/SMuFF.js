/*
 * View model for OctoPrint-Smuff
 *
 * Author: Technik Gegg
 * License: AGPLv3
 */
$(function() {
    function SmuffViewModel(parameters) {
        var self = this;

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        self.settingsViewModel = parameters[0];
        //console.log("SMuFF ViewModel params: " + self.settingsViewModel);
        self._settings = null;

        self.onBeforeBinding = function() {
            self._settings = self.settingsViewModel.settings.plugins.SMuFF;
            //console.log("_settings initialized. FW-Info: {" + self._settings.firmware_info() + "}");
        };

        self.onDataUpdaterPluginMessage = function(plugin, message) {
            if(plugin !== "SMuFF") {
                return;
            }
            if(message.tool != null) {
                // console.log(" tool: " + message.tool);
                $('#SMuFF_setting_tool').text(message.tool);
                $('#SMuFF_navbar_tool').text(message.tool);
            }
            if(message.feeder != null) {
                // console.log(" feeder: " + message.feeder);
                var _cls = message.feeder ? "fa fa-check-circle" : "fa fa-times-circle";
                $('#SMuFF_setting_feeder').prop('class', _cls);
                $('#SMuFF_navbar_feeder').prop('class', _cls);
            }
            if(message.feeder2 != null) {
                // console.log(" feeder2: " + message.feeder2);
                var _cls = message.feeder2 ? "fa fa-check-circle" : "fa fa-times-circle";
                $('#SMuFF_setting_feeder2').prop('class', _cls);
            }
            if(message.fw_info != null) {
                // console.log(" fw info: " + message.fw_info);
                $('#SMuFF_setting_firmware').text(message.fw_info);
            }
        };
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: SmuffViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [ "settingsViewModel" ],
        // Elements to bind to, e.g. #settings_plugin_SMuFF, #tab_plugin_SMuFF, ...
        elements: [ "#settings_plugin_SMuFF", "#navbar_plugin_SMuFF" ]
    });
});
