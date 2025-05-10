---
title: EternalCore - Homes
---

# 🏠 EternalCore Homes
EternalCore Homes is a feature that allows players to set their own homes and teleport to them.

## 🔒 Homes limit per permission 
It is possible to configure the maximum number of homes for a given permission.

```yaml
# Homes Section
homes:
  # Max homes per permission
  maxHomes:
    eternalcore.home.default: 1 # <- all players with this permission will have 1 limit home
    eternalcore.home.vip: 2 # <- all players with this permission will have 2 limit home
    eternalcore.home.premium: 3 # <- all players with this permission will have 3 limit home
    # If you want to add more permissions, just add them to the list with eternalcore.home.<unique name>
    # ^^^ Replace <unique name> with a unique name example: eternalcore.home.legend
    eternalcore.home.legend: 4
``` 