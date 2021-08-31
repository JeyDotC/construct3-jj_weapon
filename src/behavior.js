"use strict";
{
    const SDK = self.SDK;

    const BEHAVIOR_ID = "JeyDotC_jj_Weapon";
    const BEHAVIOR_VERSION = "1.0.1.3";
    const BEHAVIOR_CATEGORY = "general";

    const BEHAVIOR_CLASS = SDK.Behaviors.JeyDotC_jj_Weapon = class jj_WeaponBehavior extends SDK.IBehaviorBase
    {
        constructor()
        {
            super(BEHAVIOR_ID);

            SDK.Lang.PushContext("behaviors." + BEHAVIOR_ID.toLowerCase());

            this._info.SetName(lang(".name"));
            this._info.SetDescription(lang(".description"));
            this._info.SetVersion(BEHAVIOR_VERSION);
            this._info.SetCategory(BEHAVIOR_CATEGORY);
            this._info.SetAuthor("JeyDotC");
            this._info.SetHelpUrl(lang(".help-url"));
            this._info.SetIsOnlyOneAllowed(true);

            this._info.SetSupportedRuntimes(["c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([
                new SDK.PluginProperty("float", "clip-size", -1),
                new SDK.PluginProperty("float", "bullets-in-clip", -1),
                new SDK.PluginProperty("float", "bullets-in-stock", -1),
                new SDK.PluginProperty("float", "stock-size", -1, "Volume of current weapon for bullets. Max bullets count. (-1 = infinity)."),
                new SDK.PluginProperty("float", "shoot-interval", 100),
                new SDK.PluginProperty("float", "reload-time", 1000),
                new SDK.PluginProperty("combo", "auto-reload",
            {
                "items": ["No", "Yes"],
                "initialValue": "Yes"
            }),
                new SDK.PluginProperty("combo", "user-control",
            {
                "items": ["None", "Single", "Burst"],
                "initialValue": "Burst"
            }),
                new SDK.PluginProperty("combo", "enabled",
            {
                "items": ["No", "Yes"],
                "initialValue": "Yes"
            }),
                new SDK.PluginProperty("text", "shoot-key", ""),
                new SDK.PluginProperty("text", "reload-key", ""),
                new SDK.PluginProperty("integer", "image-point", 0)
            ]);

            SDK.Lang.PopContext(); //.properties
            SDK.Lang.PopContext();
        }
    };

    BEHAVIOR_CLASS.Register(BEHAVIOR_ID, BEHAVIOR_CLASS);
}