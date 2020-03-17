Represents weapon logic with a bullets stock, bullet clips, shoot/reload times and bullet instantiation.

# Properties

| Name | Description |
|------|-------------|
| **Clip size** | Count of bullets in each clip (-1 = infinity). |
| **Bullets in clip** | Bullets in clip at start (-1 = infinity). |
| **Bullets in stock** | Count of bullets for current weapon (-1 = infinity). |
| **Stock size** | Volume of current weapon for bullets. Max bullets count. (-1 = infinity). |
| **Shoot interval** | Interval in milliseconds between shoots. |
| **Reload time** | Reload time in milliseconds. |
| **Auto-reload** | When clip is empty, weapon start reload automatically.|
| **User control** | Type of weapon firing: None: weapon not controlling by player. Single: for each shoot user must make click (down and up key). Burst: down shoot-key for constantly shoot and up for enought.|
| **Enabled** | If disabled, weapon can not make shoots.|
| **Shoot key** | Name or code of key for shoot.|
| **Reload key** | Name or code of key for reload.|
| **Weapon image-point** | Set point for the weapon from which bullets will fly. |

# ACES

## Actions

| Name | Description | Params |
|------|-------------|--------|
| **Make a shoot** | Make a one shoot. | |
| **Add bullets to clip** | Add bullets to a clip for object. You can use negative values (e.g.: -5) | **Count:** The number of bullets to add to the clip. | 
| **Set bullets in the clip** | Set bullets count in the clip of object. (-1 = infinity) | **Count:** Set count of bullets in the clip. | 
| **Set weapon bullets count** | Set bullets count for the current weapon. From 0 to -1 (=infinity) | **Count:** Set count of bullets in the stock. | 
| **Set weapon size of stock** | Set size of stock for the current weapon. (-1 = infinity) | **size:** Set size of stock. | 
| **Set size of the clip** | Set maximum of bullets count in a clip. (-1 = infinity) | **Count:** Set maximum of bullets count in a clip. | 
| **Set interval** | Set interval between shoots for current weapon (ms). | **Interval:** Set interval between shots for current weapon (milliseconds). | 
| **Set reload time** | Set interval between shoots for current weapon (ms). | **ReloadTime:** Set interval for reload current weapon (milliseconds). | 
| **Set ready to shoot** | Set the weapon to ready for a shoot. | |
| **Disable weapon during...** | Set the disabled status for weapon during some time. (-1 = not limited in time) | **During:** Disable weapon during in milliseconds. -1 means "not limited by time". | 
| **Enable weapon** | Set the weapon enabled. | |
| **Set shoot key** | Set the shoot key for weapon. | **Shoot key:** Choose the key for shoot from weapon | 
| **Set reload key** | Set the reload key for weapon. | **Reload key:** Choose the key for weapon reload | 
| **Set bullet instance** | Set the weapon bullet type. | **Bullet:** Choose the bullet object for weapon | 
| **Reload** | Start reload. | |
| **Cancel reload** | Cancel the current reload. | |
| **Set bullet instance by name** | Set the weapon bullet type by name.| **Instance type name:** Name of the bullet instance type. |

## Conditions

| Name | Description | Params |
|------|-------------|--------|
| **Is ready** | True when the object is make pause and ready to shoot now. | |
| **Bullets in clip** | True when the object clip have some bullets. | **Comparison:** Choose bullets count to compare, **Bullets count:** The bullets in clip. |
| **Reload start** | True when weapon is reload start. | |
| **Reload finish** | True when weapon is reload finish. | |
| **Shoot** | True when the object is make shoot. | |
| **Disabled** | True when weapon is disabled. | |
| **Enabled** | True when weapon is enabled. | |
| **Reload canceled** | True when weapon reload was canceled. | |
| **Last shoot time** | True when has passed some time since last shoot. | **Comparison:** Time in miliseconds to compare. **Last shoot time:** Last shoot time in miliseconds. |
| **Is reloading** | True when the weapon is currently reloading. | |

## Expressions

| Name | Description |
|------|-------------|
| **getClipBulletsCount** | Get bullets count in the clip. |
| **getBulletsCount** | Get bullets count for weapon.      |
| **getClipSize** | Get clip size.                         |
| **getInterval** | Get shots interval.                    |
| **getReloadTime** | Get reload time.                     |
| **getReady** | Get ready status.                         |
| **getDisabled** | Get disabled status.                   |
| **getLastShootBullet** | Get last shot bullet UID.       |
| **getIsReloading** | Get is reloading.                   |
| **getLastShootTime** | Get last shoot time.              |