"use strict";
{
    const C3 = self.C3;
    
    C3.Behaviors.JeyDotC_jj_Weapon.Acts = {
        MakeAShoot()
        {
            this.simshoot = true;
        },

        AddBulletsToClip(count)
        {
            if (this.clip_bullets_count == -1) return;

            this.clip_bullets_count += parseInt(count, 10);
            if (this.clip_bullets_count > this.clip_size)
            {
                this.bullets_count += this.clip_size - this.clip_bullets_count;
                this.clip_bullets_count = this.clip_size;
                this.bullets_count = Math.min(this.bullets_count, this.max_bullets_count);
            }
            if (this.clip_bullets_count < 0)
            {
                this.clip_bullets_count = 0;
            }
        },

        SetBulletsInClip(count)
        {
            if (count == -1)
            {
                this.clip_bullets_count = this.clip_size;
            }
            if (count >= 0)
            {
                this.clip_bullets_count = Math.min(count, this.clip_size);
            }
        },

        SetBulletStockCount(count)
        {
            if (count == -1)
            {
                this.bullets_count = this.max_bullets_count;
            }
            if (count >= 0)
            {
                this.bullets_count = Math.min(parseInt(count, 10), this.max_bullets_count);
            }
        },

        SetSizeOfStock(count)
        {
            this.max_bullets_count = parseInt(count, 10);
        },

        SetSizeOfClip(count)
        {
            count = parseInt(count, 10);
            if (count >= -1)
            {
                this.clip_size = count;
                if (this.clip_size != -1 && (this.clip_bullets_count == -1 || this.clip_bullets_count > this.clip_size))
                {
                    if (this.clip_bullets_count != -1)
                    {
                        count = this.clip_size - this.clip_bullets_count;
                    }
                    else
                    {
                        count = -1;
                    }
                    this.clip_bullets_count = this.clip_size;
                    C3.Behaviors.JeyDotC_jj_Weapon.Cnds.SetBulletStockCount.call(this, count == -1 ? -1 : this.bullets_count + count);
                }
            }
        },

        SetInterval(count)
        {
            if (count < 0) count = 0;
            this.interval = count;
        },

        SetReloadTime(count)
        {
            if (count < 0) count = 0;
            this.reload_time = count;
        },

        SetReadyToShoot()
        {
            this.EnableWeapon();
            this.ready = true;
        },

        DisableWeaponDuring(ms)
        {
            if (ms < 0 && ms != -1) return;
            this.enabled = false;
            if (ms == -1) return;
            const obj = this;
            setTimeout(function()
            {
                obj.enabled = true;
            }, ms);
        },

        EnableWeapon()
        {
            this.enabled = true;
        },

        SetShootKey(shootKey)
        {
            this.shoot_keycode = shootKey;
        },

        SetReloadKey(reloadKey)
        {
            this.reload_keycode = reloadKey;
        },

        SetBulletInstance(bullet)
        {
            this.bullet_instance = bullet;
        },

        SetBulletByName(bulletName)
        {
            this.bullet_instance = this._runtime.GetObjectClassByName(bulletName);
        },

        Reload()
        {
            this.simreload = true;
        },

        CancelReload()
        {
            if (this.reload)
            {
                this.reloadCancel = true;
            }
        }
    };
}