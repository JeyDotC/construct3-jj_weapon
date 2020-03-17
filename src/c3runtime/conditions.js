"use strict";
{
    C3.Behaviors.JeyDotC_jj_Weapon.Cnds = {
        IsReady()
        {
            return this.ready;
        },

        BulletsInClip(comparison, bulletsCount)
        {
            return C3.compare(this.clip_bullets_count, comparison, bulletsCount);
        },

        ReloadStart()
        {
            const was_reload_start = this.was_reload_start;
            this.was_reload_start = false;
            return was_reload_start;
        },

        ReloadFinish()
        {
            const was_reload_finish = this.was_reload_finish;
            this.was_reload_finish = false;
            return was_reload_finish;
        },

        Shoot()
        {
            const was_shoot = this.was_shoot;
            this.was_shoot = false;
            return was_shoot;
        },

        Disabled()
        {
            return !this.enabled;
        },

        Enabled()
        {
            return this.enabled;
        },

        ReloadCanceled()
        {
            const reloadCancel = this.reloadCancel;
            this.reloadCancel = false;
            return reloadCancel;
        },

        LastShootTime(comparison, lastShootTime)
        {
            return C3.compare(this.lastShootTimeSince(), comparison, lastShootTime);
        },

        IsReloading()
        {
            return this.reload;
        }
    };
}