"use client";

import { useEffect, useState } from "react";
import Prism from "prismjs";
import "@/app/prism-languages";

const yamlConfig = `
#  
# Settings for the plugin.
# Modify these to customize the plugin's behavior.
settings:
  # Notify players about new plugin updates when they join the server.
  # Set to 'true' to enable update notifications, or 'false' to disable them.
  notifyAboutUpdates: true
  # The duration (in seconds) that a player remains in combat after being attacked.
  # After this time expires, the player will no longer be considered in combat.
  combatTimerDuration: 20s
  # List of worlds where combat logging is disabled.
  # Players in these worlds will not be tagged or affected by combat rules.
  ignoredWorlds:
  - your_world
#  
# Settings related to Ender Pearls.
# Configure cooldowns, restrictions, and other behaviors for Ender Pearls during combat.
pearl:
  # Is pearl damage to be enabled?
  # This will work globally
  pearlThrowDamageEnabled: true
  # Set true, If you want to disable throwing pearls during combat
  # This will work globally, but can be overridden by region settings
  pearlThrowDisabledDuringCombat: true
  # Set true, If you want add cooldown to pearls
  pearlCooldownEnabled: false
  # Block throwing pearls with delay?
  # If you set this to for example 3s, player will have to wait 3 seconds before throwing another pearl
  pearlThrowDelay: 3s
  # Message sent when player tries to throw ender pearl, but are disabled
  pearlThrowBlockedDuringCombat: <red>Throwing ender pearls is prohibited during combat!
  # Message sent when player tries to throw ender pearl, but has delay
  pearlThrowBlockedDelayDuringCombat: <red>You must wait {TIME} before next throw!
#  
# Custom effects applied during combat.
# Configure effects like blindness, slowness, or other debuffs that are applied to players in combat.
effect:
  # Do you want to add effects to players in combat?
  customEffectsEnabled: false
  # If the option above is set to true, you can add effects to players in combat below
  # You can find a list of all potion effects here: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffectType.html
  # Correct format: 'EFFECT_TYPE:AMPLIFIER' Amplifier strength starts from 0, so level 1 gives effect strength 2
  # Example: SPEED:1, DAMAGE_RESISTANCE:0
  customEffects:
    DAMAGE_RESISTANCE: 0
    SPEED: 1
#  
# Customize how items are dropped when a player dies during combat.
# Configure whether items drop, how they drop, and any additional rules for item drops.
drop:
  # The event priority at which the head drop logic should run.
  # Options: LOWEST, LOW, NORMAL, HIGH, HIGHEST, MONITOR
  # Useful if you want to control when drops are processed relative to other plugins.
  # Default: NORMAL
  dropEventPriority: NORMAL
  # UNCHANGED - The default way of item drop defined by the engine
  # PERCENT - Drops a fixed percentage of items
  # PLAYERS_HEALTH - Drops inverted percentage of the player's health (i.e. if the player has, for example, 80% HP, he will drop 20% of items. Only works when the player escapes from combat by quiting game)
  dropType: UNCHANGED
  # What percentage of items should drop from the player? (Only if Drop Type is set to PERCENT)
  dropItemPercent: 100
  # This option is responsible for the lowest percentage of the player that can drop (i.e. if the player leaves the game while he has 100% of his HP, the percentage of items that is set in this option will drop, if you set this option to 0, then nothing will drop from such a player)
  playersHealthPercentClamp: 20
  # Does the drop modification affect the experience drop?
  affectExperience: false
  
  # If true, players can drop their head on death based on chance settings below.
  headDropEnabled: false
  # Chance for a head to drop on death (0-100).
  # Set to 0 to disable even if feature is enabled.
  # Example: 25.0 means 25% chance.
  headDropChance: 0.0
  # Only drop the head if the player was in combat at time of death.
  headDropOnlyInCombat: true
  # The display name of the dropped head.
  # Placeholders: {PLAYER}, {KILLER}
  # Example: "{PLAYER}'s Head"
  headDropDisplayName: '{PLAYER}''s Head'
  # Lore lines shown on the head item.
  # Placeholders: {PLAYER}, {KILLER}
  # Set to [] to disable lore entirely.
  headDropLore:
  - Slain by {KILLER}
  - Collected in battle
#  
# Settings related to knockback during combat.
# Configure knockback settings and behaviors for players in combat.
knockback:
  # Adjust the knockback multiplier for restricted regions.
  # Higher values increase the knockback distance. Avoid using negative values.
  # A value of 1.0 typically knocks players 2-4 blocks away.
  multiplier: 1.0
  # Time after which the player will be force knocked back outside the safe zone
  forceDelay: 1s
#  
# Border Settings
# Configure the border that appears during combat.
border:
  # Border view distance in blocks
  distance: 6.5
  #  
  # Border block animation settings
  # Configure the block animation that appears during combat.
  block:
    # Enable block animation?
    enabled: true
    # Block type used for rendering the border
    # Custom: RAINBOW_GLASS, RAINBOW_WOOL, RAINBOW_TERRACOTTA, RAINBOW_CONCRETE
    # Vanilla: https://javadocs.packetevents.com/com/github/retrooper/packetevents/protocol/world/states/type/StateTypes.html
    type: RAINBOW_GLASS
    # Delay between each async animation update (need restart to apply)
    # Lower values will decrease performance but will make the animation smoother
    # Higher values will increase performance
    updateDelay: 250ms
    # Delay between each chunk cache update (need restart to apply)
    # Lower values will decrease performance
    # Higher values will increase performance but may cause overlapping existing blocks (this does not modify the world)
    chunkCacheDelay: 300ms
  #  
  # Border particle animation settings
  # Configure the particle animation that appears during combat.
  particle:
    # Enable particle animation?
    enabled: true
    # Particle type - https://javadocs.packetevents.com/com/github/retrooper/packetevents/protocol/particle/type/ParticleTypes.html
    type: DUST
    # Particle color (used only for DUST or ENTITY_EFFECT particle type)
    # You can set hex color e.g. "#ca4c45" or use "RAINBOW" to generate rainbow gradient based on x and z coordinates.
    color: RAINBOW
    count: 1
    scale: 1.7
    maxSpeed: 0.0
    offsetX: 0.2
    offsetY: 0.2
    offsetZ: 0.2
#  
# Settings related to block placement during combat.
# Configure restrictions and behaviors for block placement while players are in combat.
blockPlacement:
  # Prevent players from placing blocks during combat.
  # Set to 'true' to block block placement while in combat.
  disableBlockPlacing: true
  # Restrict block placement above or below a specific Y coordinate.
  # Available modes: ABOVE (blocks cannot be placed above the Y coordinate), BELOW (blocks cannot be placed below the Y coordinate).
  blockPlacementMode: ABOVE
  # Custom name for the block placement mode used in messages.
  # This name will be displayed in notifications related to block placement restrictions.
  blockPlacementModeDisplayName: above
  # Define the Y coordinate for block placement restrictions.
  # This value is relative to the selected block placement mode (ABOVE or BELOW).
  blockPlacementYCoordinate: 40
  # Restrict the placement of specific blocks during combat.
  # Add blocks to this list to prevent their placement. Leave the list empty to block all blocks.
  # Note: This feature requires 'disableBlockPlacing' to be enabled.
  restrictedBlockTypes: []
#  
# Settings related to crystal PvP.
# Configure behaviors, restrictions, and features specific to crystal PvP combat.
crystalPvp:
  # Should player be tagged when damaged from crystal explosion set by other player
  tagFromCrystals: true
  #Should player be tagged when damaged from respawn anchor explosion set by other player
  tagFromRespawnAnchor: true
#  
# Settings related to commands during combat.
# Configure command restrictions and behaviors for players in combat.
commands:
  # Set the mode for command restrictions during combat.
  # Available modes: WHITELIST (only listed commands are allowed), BLACKLIST (listed commands are blocked).
  commandRestrictionMode: BLACKLIST
  # List of commands affected by the command restriction mode.
  # In BLACKLIST mode, these commands are blocked. In WHITELIST mode, only these commands are allowed.
  restrictedCommands:
  - gamemode
  - spawn
  - tp
  - tpa
  - tpaccept
#  
# Settings related to the plugin's admin commands and features.
# Configure admin-specific settings and behaviors for the plugin.
admin:
  # Exclude server administrators from combat tagging and being tagged.
  # Set to 'true' to prevent admins from being tagged or tagging others.
  # Set to 'false' to allow admins to participate in combat.
  excludeAdminsFromCombat: false
  # Exclude players in creative mode from combat tagging and being tagged.
  # Set to 'true' to prevent creative mode players from being tagged or tagging others.
  # Set to 'false' to allow creative mode players to participate in combat.
  excludeCreativePlayersFromCombat: false
#  
# Settings related to regions.
# Configure region-specific settings and behaviors for combat.
regions:
  # List of regions where combat is restricted.
  # Players in these regions will not be able to engage in combat.
  blockedRegions:
  - your_region
  # Prevent players from entering regions where PVP is disabled by WorldGuard.
  # Set to 'true' to enforce this restriction, or 'false' to allow PVP in all regions.
  preventPvpInRegions: true
  # Define the radius of restricted regions if WorldGuard is not used.
  # This setting is based on the default spawn region.
  restrictedRegionRadius: 10
#  
# Settings related to combat and player tagging.
# Configure combat rules, and behaviors for player tagging.
combat:
  # Automatically release the attacker from combat when the victim dies.
  # Set to 'true' to enable this feature, or 'false' to keep the attacker in combat.
  releaseAttackerOnVictimDeath: true
  # Disable the use of elytra during combat.
  # Set to 'true' to prevent players from using elytra while in combat.
  disableElytraUsage: true
  # Disable the use of elytra when a player takes damage.
  # Set to 'true' to disable elytra usage upon taking damage, even when the player is mid-air.
  disableElytraOnDamage: true
  # Prevent players from flying during combat.
  # Flying players will fall to the ground if this is enabled.
  disableFlying: true
  # Prevent players from boosting themselves while flying with fireworks
  # This setting blocks usage of fireworks to boost elytra flight during combat
  disableFireworks: true
  # Prevent players from opening their inventory during combat.
  # Set to 'true' to block inventory access while in combat.
  disableInventoryAccess: false
  # Enable or disable combat logging for damage caused by non-player entities.
  # Set to 'true' to log damage from non-player sources, or 'false' to disable this feature.
  enableDamageCauseLogging: false
  # Set the mode for logging damage causes.
  # Available modes: WHITELIST (only listed causes are logged), BLACKLIST (all causes except listed ones are logged).
  damageCauseRestrictionMode: WHITELIST
  # List of damage causes to be logged based on the selected mode.
  # In WHITELIST mode, only these causes are logged. In BLACKLIST mode, all causes except these are logged.
  # For a full list of damage causes, visit: https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/entity/EntityDamageEvent.DamageCause.html
  loggedDamageCauses:
  - LAVA
  - CONTACT
  - FIRE
  - FIRE_TICK
  # List of projectile types that do not trigger combat tagging.
  # Players hit by these projectiles will not be tagged as in combat.
  # For a full list of entity types, visit: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityType.html
  ignoredProjectileTypes:
  - ENDER_PEARL
  - EGG
  # The event priority at which quit punishments should be handled.
  # This determines when the plugin processes combat log punishment during PlayerQuitEvent.
  # Options: LOWEST, LOW, NORMAL, HIGH, HIGHEST, MONITOR
  # Tip: Set to LOWEST or LOW if you want quit punishments to happen before most other plugins.
  # Default: NORMAL
  quitPunishmentEventPriority: NORMAL
  # List of kick reasons where players will NOT be punished for combat logging.
  # If this list is empty, players are ALWAYS punished when kicked during combat.
  # If one of the listed phrases is found in the kick reason (case-insensitive),
  # the player will NOT be punished.
  # Example: 'Timed out', 'Kicked for inactivity', etc.
  # To always punish players on kick, set: whitelistedKickReasons: []
  whitelistedKickReasons:
  - Kicked for inactivity
  - Timed out
  - Server is restarting
  disableCombatPunishment: true
`;

export const ConfigPreview = () => {
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    // Determine the language; strictly use YAML
    const grammar = Prism.languages.yaml;
    const highlighted = Prism.highlight(yamlConfig, grammar, "yaml");
    setHighlightedCode(highlighted);
  }, []);

  return (
    <pre className="!bg-transparent !m-0 !p-8 font-mono text-[11px] leading-relaxed font-medium overflow-visible">
      {/* 
          We use dangerouslySetInnerHTML to render the Prism-highlighted HTML.
          We add the 'language-yaml' class to proper scope CSS.
          The 'whitespace-pre-wrap' ensures long lines wrap if necessary (though text-nowrap usually preferred for code, here wrapping is handled by pre).
      */}
      <code
        className="language-yaml whitespace-pre-wrap"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content from Prism.js
        dangerouslySetInnerHTML={{ __html: highlightedCode || yamlConfig }} // Fallback to raw text before hydration
      />
    </pre>
  );
};
