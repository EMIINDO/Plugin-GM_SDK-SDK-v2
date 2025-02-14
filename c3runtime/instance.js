"use strict";

{
    globalThis.C3.Plugins.GM_SDK.Instance = class SingleGlobalInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();

            const properties = this._getInitProperties();

            // Initialise object properties
            this._gameID = "";
            this._sdkReady = false;
            this._adPlaying = false;
            this._adViewed = false;
            this._preloadedAd = false;
            this._available_adtypes = ["interstitial"];

            if (properties) {
                this._gameID = properties[0];
            }

            window.SDK_OPTIONS = {
                gameId: this._gameID,
                onEvent: event => {
                    switch (event.name) {
                        case "SDK_GAME_START":
                            // advertisement done, resume game logic and unmute audio
                            this._adPlaying = false;
                            break;
                        case "SDK_GAME_PAUSE":
                            // pause game logic / mute audio
                            this._adPlaying = true;
                            break;
                        case "COMPLETE":
                            // this event is triggered when the user watched an entire ad
                            this._adViewed = true;
                            setTimeout(() => {
                                this._adViewed = false;
                            }, 5000);
                            break;
                        case "SDK_READY":
                            this._sdkReady = true;
                            break;
                    }
                }
            };

            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//api.gamemonetize.com/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, "script", "gamemonetize-sdk");
        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        _loadFromJson(o) {
            // load state for savegames
        }

        ShowAd() {
            var sdk = window["sdk"];
            if (sdk !== "undefined" && sdk.showBanner !== "undefined") {
                sdk.showBanner();
            }
        }
    };
}
