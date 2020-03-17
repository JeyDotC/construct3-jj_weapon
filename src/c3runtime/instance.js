"use strict";
{
    C3.Behaviors.JeyDotC_jj_Weapon.Instance = class jj_WeaponInstance extends C3.SDKBehaviorInstanceBase
    {
        constructor(behInst, properties)
        {
            super(behInst);

            // Key states
            this.shootkey = false;
            this.reloadkey = false;

            // Simulated key states
            this.simshoot = false;
            this.simreload = false;

            // Bullets
            this.bullets_count = 0;
            this.max_bullets_count = 0;
            this.clip_bullets_count = 0;
            this.clip_size = 0;
            this.enabled = true;
            this.reload = false;
            this.reloadCancel = false;
            this.ready = true;

            // Time durations
            this.interval = 0;
            this.reload_time = 0;

            // Weapon features
            this.auto_reload = true;
            this.user_control = 'None';
            this.shoot_keycode = 32;
            this.reload_keycode = 0;
            this.bullet_instance = null;

            // trigger events
            this.was_shoot = false;
            this.was_reload_start = false;
            this.was_reload_finish = false;
            this.last_shoot_bullet = 0;

            // last times
            this.last_shoot_time = 0;
            this.start_reload_time = 0;
            this.lastShootTimeSince = function()
            {
                return Date.now() - this.last_shoot_time;
            };

            if (properties)
            {
                console.log(properties);
                console.log(this);

                this.clip_size = properties[0];
                this.clip_bullets_count = properties[1];
                this.bullets_count = properties[2];
                this.max_bullets_count = properties[3];
                this.interval = properties[4];
                this.reload_time = properties[5];
                this.auto_reload = (properties[6] === 1); // 0=no, 1=yes
                this.user_control = (properties[7] === 0 ? 'None' : (properties[5] === 1 ? 'Single' : 'Burst')); // 0=auto, 1=mouse, 2=user
                this.enabled = (properties[8] === 1); // 0=no, 1=yes

                if (properties[9] != "")
                {
                    this.shoot_keycode = this.KeyCode(properties[9]);
                }
                if (properties[10] != "")
                {
                    this.reload_keycode = this.KeyCode(properties[10]);
                }
                this.bullet_point_index = parseInt(properties[11], 10);
            }

            window.addEventListener('keydown', e => this._KeyDown(e));
            window.addEventListener('keyup', e => this._KeyUp(e));

            // Opt-in to getting calls to Tick()
            this._StartTicking();
        }

        Release()
        {
            super.Release();
        }

        SaveToJson()
        {
            var o = {
                // Key states
                "shk": this.shootkey,
                "rlk": this.reloadkey,

                // Simulated key states
                "ssh": this.simshoot,
                "srl": this.simreload,

                // Bullets
                "bc": this.bullets_count,
                "mbc": this.max_bullets_count,
                "cbc": this.clip_bullets_count,
                "cs": this.clip_size,
                "e": this.enabled,
                "rl": this.reload,
                "rlc": this.reloadCancel,
                "rd": this.ready,

                // Time durations
                "in": this.interval,
                "rt": this.reload_time,

                // Weapon features
                "arl": this.auto_reload,
                "uc": this.user_control,
                "skc": this.shoot_keycode,
                "rlkc": this.reload_keycode
            };

            if (this.bullet_instance)
            {
                o["bins"] = this.bullet_instance.sid;
            }

            return o;
        }

        LoadFromJson(o)
        {
            // Key states
            this.shootkey = o["shk"];
            this.reloadkey = o["rlk"];

            // Simulated key states
            this.simshoot = o["ssh"];
            this.simreload = o["srl"];

            // Bullets
            this.bullets_count = o["bc"];
            this.max_bullets_count = o["mbc"];
            this.clip_bullets_count = o["cbc"];
            this.clip_size = o["cs"];
            this.enabled = o["e"];
            this.reload = o["rl"];
            this.reloadCancel = o["rlc"];
            this.ready = o["rd"];

            // Time durations
            this.interval = o["in"];
            this.reload_time = o["rt"];

            // Weapon features
            this.auto_reload = o["arl"];
            this.user_control = o["uc"];
            this.shoot_keycode = o["skc"];
            this.reload_keycode = o["rlkc"];

            if (o.hasOwnProperty("bins"))
            {
                this.bullet_instance = this._runtime.GetObjectClassBySID(o["bins"]);
            }
        }

        Tick()
        {
            const dt = this._runtime.GetDt(this._inst);
            //const wi = this._inst.GetWorldInfo();

            const shoot = this.shootkey && this.user_control != 'None' || this.simshoot;
            const reload = this.reloadkey && this.user_control != 'None' || this.simreload;

            this.simshoot = false;
            this.simreload = false;
            this.reloadkey = false;

            if (this.user_control == 'Single')
            {
                this.shootkey = false;
            }

            if (!this.reload && (this.auto_reload && this.clip_bullets_count == 0 || reload) && this.bullets_count != 0 && (this.clip_size == -1 || this.clip_bullets_count < this.clip_size) && this.clip_bullets_count != -1)
            {
                // reload start
                this.start_reload_time = Date.now();
                this.reload = true;
                this.was_reload_start = true;
                this.Trigger(C3.Behaviors.JeyDotC_jj_Weapon.Cnds.ReloadStart); //, this.inst);
            }

            if (this.reloadCancel)
            {
                this.reload = false;
                this.Trigger(C3.Behaviors.JeyDotC_jj_Weapon.Cnds.ReloadCanceled); //, this.inst);
                this.reloadCancel = false;
            }

            if (this.reload && Date.now() - this.start_reload_time >= this.reload_time && this.clip_size != 0 && this.clip_bullets_count != -1 && this.bullets_count != 0)
            {
                // reload end
                this.reload = false;
                let count;
                if (this.clip_size == -1)
                { // if clip is infinity we push all our bullets in clip
                    count = this.bullets_count;
                }
                else
                { // if clip is not infinity...
                    count = this.clip_size - this.clip_bullets_count; // calc how we can put bullets in clip
                    if (this.bullets_count != -1)
                    { // if we have not infinity bullets then...
                        count = Math.min(count, this.bullets_count); // take not more than we have
                    }
                }
                //            this.behavior.acts.addClipBullets.call(this, count);
                if (count == -1)
                { // we can put in clip infinity count of bullets
                    this.clip_bullets_count = -1;
                }
                else
                { // else we take from one and give to a clip our bullets
                    this.bullets_count = this.bullets_count == -1 ? -1 : this.bullets_count - count;
                    this.clip_bullets_count += count;
                }
                this.was_reload_finish = true;
                this.Trigger(C3.Behaviors.JeyDotC_jj_Weapon.Cnds.ReloadFinish); //, this.inst);
            }

            if (!this.ready && !this.reload && this.enabled && (this.lastShootTimeSince() >= this.interval))
            {
                this.ready = true;
            }

            if (shoot && this.ready && !this.reload && this.clip_bullets_count != 0 && this.enabled)
            {
                const[shootX, shootY] = this._inst.GetImagePoint(this.bullet_point_index);

                let inst = null;

                if (this.bullet_instance)
                {
                    const layer = this._inst.GetWorldInfo().GetLayer();
                    const angle = this._inst.GetWorldInfo().GetAngle();

                    inst = this._runtime.CreateInstance(this.bullet_instance, layer, shootX, shootY);
                    inst.GetWorldInfo().SetAngle(angle);
                    this.last_shoot_bullet = inst.GetUID();
                }

                this.ready = false;
                this.last_shoot_time = Date.now();
                if (this.clip_bullets_count != -1)
                {
                    this.clip_bullets_count -= 1;
                }

                this.was_shoot = true;
                this.Trigger(C3.Behaviors.JeyDotC_jj_Weapon.Cnds.Shoot);

                if (this.bullet_instance)
                {
                    inst.GetSdkInstance().Trigger(inst.GetPlugin().constructor.Cnds.OnCreated);
                }
            }
        }

        GetDebuggerProperties()
        {
            return [
            {
                title: "jj_Weapon",
                properties: [
                    //{name: ".current-animation",	value: this._currentAnimation.GetName(),	onedit: v => this.CallAction(Acts.SetAnim, v, 0) },
                ]
            }];
        }

        _KeyDown(e)
        {
            switch (e.keyCode)
            {
                case this.shoot_keycode:
                    // shoot
                    e.preventDefault();
                    this.shootkey = true;
                    break;
                case this.reload_keycode:
                    // reload
                    e.preventDefault();
                    this.reloadkey = true;
                    break;
            }
        }

        _KeyUp(e)
        {
            switch (e.keyCode)
            {
                case this.shoot_keycode:
                    // shoot
                    e.preventDefault();
                    this.shootkey = false;
                    break;
                case this.reload_keycode:
                    // reload
                    e.preventDefault();
                    this.reloadkey = false;
                    break;
            }
        }

        KeyCode(key_name)
        {
            switch (key_name.toLowerCase())
            {
                case "backspace":
                    return 8;
                case "tab":
                    return 9;
                case "enter":
                    return 13;
                case "shift":
                    return 16;
                case "ctrl":
                    return 17;
                case "alt":
                    return 18;
                case "pause":
                case "break":
                case "pause/break":
                    return 19;
                case "caps lock":
                    return 20;
                case "escape":
                    return 27;
                case "space":
                case "spacebar":
                    return 32;
                case "page up":
                    return 33;
                case "pgup":
                    return 33;
                case "page down":
                    return 34;
                case "pgdn":
                    return 34;
                case "end":
                    return 35;
                case "home":
                    return 36;
                case "left":
                case "left arrow":
                    return 37;
                case "up":
                case "up arrow":
                    return 38;
                case "right":
                case "right arrow":
                    return 39;
                case "down":
                case "down arrow":
                    return 40;
                case "insert":
                case "ins":
                    return 45;
                case "delete":
                case "del":
                    return 46;
                case "0":
                    return 48;
                case "1":
                    return 49;
                case "2":
                    return 50;
                case "3":
                    return 51;
                case "4":
                    return 52;
                case "5":
                    return 53;
                case "6":
                    return 54;
                case "7":
                    return 55;
                case "8":
                    return 56;
                case "9":
                    return 57;
                case ";":
                    return 59;
                case "=":
                    return 61;
                case "a":
                    return 65;
                case "b":
                    return 66;
                case "c":
                    return 67;
                case "d":
                    return 68;
                case "e":
                    return 69;
                case "f":
                    return 70;
                case "g":
                    return 71;
                case "h":
                    return 72;
                case "i":
                    return 73;
                case "j":
                    return 74;
                case "k":
                    return 75;
                case "l":
                    return 76;
                case "m":
                    return 77;
                case "n":
                    return 78;
                case "o":
                    return 79;
                case "p":
                    return 80;
                case "q":
                    return 81;
                case "r":
                    return 82;
                case "s":
                    return 83;
                case "t":
                    return 84;
                case "u":
                    return 85;
                case "v":
                    return 86;
                case "v":
                    return 87;
                case "x":
                    return 88;
                case "y":
                    return 89;
                case "z":
                    return 90;
                case "left window key":
                    return 91;
                case "right window key":
                    return 92;
                case "select key":
                    return 93;
                case "numpad 0":
                    return 96;
                case "numpad 1":
                    return 97;
                case "numpad 2":
                    return 98;
                case "numpad 3":
                    return 99;
                case "numpad 4":
                    return 100;
                case "numpad 5":
                    return 101;
                case "numpad 6":
                    return 102;
                case "numpad 7":
                    return 103;
                case "numpad 8":
                    return 104;
                case "numpad 9":
                    return 105;
                case "numpad *":
                    return 42;
                case "multiply":
                    return 106;
                case "numpad +":
                    return 43;
                case "add":
                    return 107;
                case "numpad -":
                    return 45;
                case "subtract":
                case "-":
                    return 109;
                case "numpad .":
                case "decimal point":
                    return 110;
                case "numpad /":
                    return 47;
                case "divide":
                    return 111;
                case "f1":
                    return 112;
                case "f2":
                    return 113;
                case "f3":
                    return 114;
                case "f4":
                    return 115;
                case "f5":
                    return 116;
                case "f6":
                    return 117;
                case "f7":
                    return 118;
                case "f8":
                    return 119;
                case "f9":
                    return 120;
                case "f10":
                    return 121;
                case "f11":
                    return 122;
                case "f12":
                    return 123;
                case "num lock":
                    return 144;
                case "scroll lock":
                    return 145;
                case "semi-colon":
                case ":":
                    return 186;
                case "equal sign":
                case "+":
                    return 187;
                case "comma":
                case ",":
                    return 188;
                case "dash":
                case "_":
                    return 189;
                case "period":
                case ".":
                    return 190;
                case "forward slash":
                case "/":
                    return 191;
                case "grave accent":
                case "`":
                    return 192;
                case "open bracket":
                case "[":
                    return 219;
                case "back slash":
                case "\\":
                    return 220;
                case "close bracket":
                case "]":
                    return 221;
                case "single quote":
                case "'":
                    return 222;
                default:
                    return parseInt(key_name, 10);
            }
        }
    };
}