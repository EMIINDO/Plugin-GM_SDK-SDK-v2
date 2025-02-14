"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.GM_SDK = function(runtime) {
  this.runtime = runtime;
};

(function() {
  var pluginProto = cr.plugins_.GM_SDK.prototype;

  /////////////////////////////////////
  // Object type class
  pluginProto.Type = function(plugin) {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  typeProto.onCreate = function() {};

  /////////////////////////////////////
  // Instance class
  pluginProto.Instance = function(type) {
    this.type = type;
    this.runtime = type.runtime;
    this.available_adtypes = ["interstitial"];

    // Initialise object properties
    this._gameID = 0;
    this._adPlaying = false;
    this._adViewed = false;
    this._adPreloaded = false;
  };

  var instanceProto = pluginProto.Instance.prototype;

  instanceProto.onCreate = function() {
    this._gameID = this.properties[0];

    try {
      try {
        if (this._runtime.IsPreview()) {
          localStorage.setItem("gm_debug", true);
          localStorage.setItem(
            "gm_tag",
            "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
          );
        } else {
          localStorage.removeItem("gm_debug");
          localStorage.removeItem("gm_tag");
        }
      } catch (e) {}
    } catch (e) {}

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
            let debugBar = document.querySelector("#sdk__implementation");
            if (debugBar) debugBar.remove();
            this._sdkReady = true;
            break;
        }
      }
    };

    //Load the SDK from the CDN
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//api.gamemonetize.com/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "gamemonetize-sdk");
  };

  instanceProto.saveToJSON = function() {
    return {};
  };

  instanceProto.loadFromJSON = function(o) {};

  /**BEGIN-PREVIEWONLY**/
  instanceProto.getDebuggerValues = function(propsections) {};
  /**END-PREVIEWONLY**/

  //////////////////////////////////////
  // Conditions
  function Cnds() {}

  (Cnds.prototype.ResumeGame = function() {
    return !this._adPlaying;
  }),
    (Cnds.prototype.PauseGame = function() {
      return this._adPlaying;
    }),
    (Cnds.prototype.AdViewed = function() {
      return this._adViewed;
    }),
    (Cnds.prototype.PreloadedAd = function() {
      return this._preloadedAd;
    });

  pluginProto.cnds = new Cnds();

  //////////////////////////////////////
  // Actions
  function Acts() {}

  Acts.prototype.ShowAd = function() {
    if (!this._sdkReady) return;

    if (!this._sdkReady) return;
    var sdk = window["sdk"];
    if (sdk !== "undefined" && sdk.showBanner !== "undefined") {
      sdk.showBanner();
    }
  };

  pluginProto.acts = new Acts();

  //////////////////////////////////////
  // Expressions
  function Exps() {}

  pluginProto.exps = new Exps();
})();
