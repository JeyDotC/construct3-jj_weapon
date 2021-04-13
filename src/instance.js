"use strict";
{
    const SDK = self.SDK;
    
    const BEHAVIOR_CLASS = SDK.Behaviors.JeyDotC_jj_Weapon;

    BEHAVIOR_CLASS.Instance = class jj_WeaponInstance extends SDK.IBehaviorInstanceBase
    {
        constructor(sdkBehType, behInst)
        {
            super(sdkBehType, behInst);
        }

        Release()
        {}

        OnCreate()
        {}

        OnPropertyChanged(id, value)
        {}

        LoadC2Property(name, valueString)
        {
            return false; // not handled
        }
    };
}