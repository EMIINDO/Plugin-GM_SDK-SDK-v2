"use strict";
// Porting BY EMI INDO with c3addon-ide-plus

{
    const PLUGIN_ID = "GM_SDK";

    // callMap Deprecated const PLUGIN_VERSION = "1.0.0";
    const PLUGIN_CATEGORY = "monetisation";

    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = (SDK.Plugins.GM_SDK = class MyCustomPlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(globalThis.lang(".name"));
            this._info.SetDescription(globalThis.lang(".description"));
            // callMap Deprecated this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("GameMonetize");
            this._info.SetHelpUrl(globalThis.lang(".help-url"));
            this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
            this._info.SetIsSingleGlobal(true);

            // Support both the C2 and C3 runtimes
            this._info.SetSupportedRuntimes(["c2", "c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([new SDK.PluginProperty("text", "game-id", "")]);

            SDK.Lang.PopContext();

            SDK.Lang.PopContext();
        }
    });

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
