"use strict";
{
    C3.Behaviors.JeyDotC_jj_Weapon.Exps = {
        BulletsInClip()
        {
            return this.clip_bullets_count;
        },

        BulletsInStock()
        {
            return this.bullets_count;
        },

        ClipSize()
        {
            return this.clip_size;
        },

        ShotsInterval()
        {
            return this.interval;
        },

        ReloadTime()
        {
            return this.reload_time;
        },

        IsReadyToShoot()
        {
            return this.ready;
        },

        IsDisabled()
        {
            return !this.enabled;
        },

        LastShootBulletId()
        {
            return this.last_shoot_bullet;
        },

        IsReloading()
        {
            return this.was_reload_start;
        },

        LastShootTime()
        {
            return this.lastShootTimeSince();
        }
    };
}