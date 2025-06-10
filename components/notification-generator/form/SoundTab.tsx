"use client";

import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useMemo, useCallback } from "react";
import { NotificationConfig, FieldType } from "../types";
import { FormField } from "./FormField";
import { SoundInfoBox } from "../SoundInfoBox";
import { SOUND_CATEGORY_OPTIONS } from "./constants";
import { SoundTable } from "./SoundTable";
import { SliderField } from "./SliderField";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown, DropdownOption } from "../../ui/Dropdown";
import { Sound } from "./SoundTable";

const SOUNDS_JSON_URL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/sounds.json";
const SOUND_BASE_URL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/sounds/";

const MANUAL_CATEGORIES = [
  "ambient",
  "block",
  "enchant",
  "entity",
  "event",
  "item",
  "music",
  "music_disc",
  "particle",
  "ui",
  "weather",
];

interface SoundTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
  errors: Record<string, string>;
}

export interface SoundTabRef {
  stopSound: () => void;
}

export const SoundTab = forwardRef<SoundTabRef, SoundTabProps>(
  ({ notification, onChange, errors }, ref) => {
    const [sounds, setSounds] = useState<Sound[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSoundType, setSelectedSoundType] = useState<string>("");
    const [currentAudioPlayingId, setCurrentAudioPlayingId] = useState<string | null>(null);
    const [playbackError, setPlaybackError] = useState<string | null>(null);

    const selectedSound = useMemo(() => 
      sounds.find((s) => s.id === notification.sound),
      [sounds, notification.sound]
    );

    useImperativeHandle(ref, () => ({
      stopSound: () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          setPlaying(false);
          setCurrentAudioPlayingId(null);
        }
      }
    }));

    useEffect(() => {
      const fetchSounds = async () => {
        try {
          setLoading(true);
          const response = await fetch(SOUNDS_JSON_URL);
          const data = await response.json() as Record<string, any>;
          
          const formattedSounds: Sound[] = Object.keys(data)
            .map((key) => {
              const soundEntry = data[key];
              let path = key.replace(/\./g, "/");
              let category = soundEntry.category || "other";
              
              if (Array.isArray(soundEntry.sounds) && soundEntry.sounds.length > 0) {
                const first = soundEntry.sounds[0];
                if (typeof first === "string") {
                  path = first;
                } else if (typeof first === "object" && first.name) {
                  path = first.name;
                }
              }
              
              if (!category || category === "other") {
                const idParts = key.split(".");
                if (idParts.length > 0 && MANUAL_CATEGORIES.includes(idParts[0])) {
                  category = idParts[0];
                }
              }
              
              return {
                id: key,
                name: key.toUpperCase(),
                path,
                category,
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
            
          setSounds(formattedSounds);
          setSelectedCategory("");
          setError("");
          setLoading(false);
        } catch (err) {
          setError("Failed to load sounds. Using default list.");
          setSounds([
            { id: "entity.player.levelup", name: "ENTITY.PLAYER.LEVELUP", path: "entity/player/levelup", category: "entity" },
            { id: "entity.experience_orb.pickup", name: "ENTITY.EXPERIENCE_ORB.PICKUP", path: "entity/experience_orb/pickup", category: "entity" },
            { id: "block.note_block.pling", name: "BLOCK.NOTE_BLOCK.PLING", path: "block/note_block/pling", category: "block" },
            { id: "entity.ender_dragon.growl", name: "ENTITY.ENDER_DRAGON.GROWL", path: "entity/ender_dragon/growl", category: "entity" },
            { id: "ambient.cave", name: "AMBIENT.CAVE", path: "ambient/cave", category: "ambient" },
            { id: "music.creative", name: "MUSIC.CREATIVE", path: "music/creative", category: "music" },
            { id: "ui.toast.in", name: "UI.TOAST.IN", path: "ui/toast/in", category: "ui" },
            { id: "ui.toast.out", name: "UI.TOAST.OUT", path: "ui/toast/out", category: "ui" },
          ]);
          setSelectedCategory("");
          setError("");
          setLoading(false);
        }
      };
      
      fetchSounds();
    }, []);

    useEffect(() => {
      setError("");
    }, [notification.sound]);

    const categoriesWithSounds = useMemo(() => {
      return MANUAL_CATEGORIES.filter(cat => 
        sounds.some(s => s.category === cat)
      );
    }, [sounds]);

    const categoryOrder = (cat: string | undefined) => {
      const idx = MANUAL_CATEGORIES.indexOf(cat || "");
      return idx === -1 ? 999 : idx;
    };

    const filteredSounds = useMemo(() => {
      let filtered = selectedCategory 
        ? sounds.filter(s => s.category === selectedCategory)
        : sounds;
        
      filtered = selectedSoundType
        ? filtered.filter(s => s.category === selectedSoundType)
        : filtered;

      return [...filtered].sort((a, b) => {
        const catA = categoryOrder(a.category);
        const catB = categoryOrder(b.category);
        if (catA === catB) {
          return a.name.localeCompare(b.name);
        }
        return catA - catB;
      });
    }, [sounds, selectedCategory, selectedSoundType]);

    const handlePlaySound = useCallback((sound: Sound) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setPlaybackError(null);
      
      const newAudio = new Audio(`${SOUND_BASE_URL}${sound.path}.ogg`);
      console.log("Attempting to play sound from URL:", newAudio.src);

      let volumeValue = 1.0;
      if (typeof notification.volume === "string") {
        const parsedVolume = parseFloat(notification.volume);
        if (!isNaN(parsedVolume) && isFinite(parsedVolume)) {
          volumeValue = Math.min(Math.max(parsedVolume, 0), 1.0);
        }
      } else if (typeof notification.volume === "number" && isFinite(notification.volume)) {
        volumeValue = Math.min(Math.max(notification.volume, 0), 1.0);
      }
      
      try {
        newAudio.volume = volumeValue;
        console.log("Set volume to:", newAudio.volume);
      } catch (err) {
        console.error("Error setting volume:", err);
        newAudio.volume = 1.0; 
      }
      
      let pitchValue = 1.0; 
      if (typeof notification.pitch === "string") {
        const parsedPitch = parseFloat(notification.pitch);
        if (!isNaN(parsedPitch) && isFinite(parsedPitch)) {
          pitchValue = Math.min(Math.max(parsedPitch, 0.5), 2.0);
        }
      } else if (typeof notification.pitch === "number" && isFinite(notification.pitch)) {
        pitchValue = Math.min(Math.max(notification.pitch, 0.5), 2.0);
      }
      
      try {
        newAudio.playbackRate = pitchValue;
        console.log("Set pitch to:", newAudio.playbackRate);
      } catch (err) {
        console.error("Error setting pitch:", err);
        newAudio.playbackRate = 1.0;
      }
      
      newAudio.onended = () => {
        console.log("Sound playback ended.");
        setPlaying(false);
        setCurrentAudioPlayingId(null);
      };
      
      newAudio.onerror = (e) => {
        console.error("Error playing sound:", e);
        setPlaying(false);
        setCurrentAudioPlayingId(null);
        setPlaybackError("Failed to play sound. The file might be missing or corrupted.");
      };
      
      setAudio(newAudio);
      setPlaying(true);
      setCurrentAudioPlayingId(sound.id);
      
      newAudio.play().then(() => {
        console.log("Sound playback started successfully.");
      }).catch(err => {
        console.error("Error playing sound promise:", err);
        setPlaying(false);
        setCurrentAudioPlayingId(null);
        setPlaybackError("Failed to play sound. Please try again.");
      });
    }, [notification.volume, notification.pitch, notification.sound]);
    
    const handleStopSound = useCallback(() => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
        setCurrentAudioPlayingId(null);
        setPlaybackError(null);
      }
    }, [audio]);
    
    const handleSelectSound = useCallback((soundId: string) => {
      onChange("sound", soundId);
      setPlaybackError(null);
    }, [onChange]);
    
    const handleCategoryChange = useCallback((category: string) => {
      setSelectedCategory(category);
    }, []);

    const handleSoundTypeChange = useCallback((type: string) => {
      setSelectedSoundType(type);
    }, []);

    const soundTypeOptions = useMemo(() => {
      const options: DropdownOption[] = [
        { value: "", label: "All Types" },
        ...categoriesWithSounds.map(cat => ({
          value: cat,
          label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ')
        }))
      ];
      return options;
    }, [categoriesWithSounds]);

    return (
      <div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sound Type
          </label>
          <Dropdown
            options={soundTypeOptions}
            value={selectedSoundType}
            onChange={handleSoundTypeChange}
            placeholder="All Types"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Filter sounds by their type.
          </p>
        </div>

        <SoundTable
          sounds={filteredSounds}
          selectedSound={selectedSound}
          onSelectSound={handleSelectSound}
          onPlaySound={handlePlaySound}
          isPlaying={playing}
          onStopSound={handleStopSound}
          loading={loading}
          currentlyPlayingId={currentAudioPlayingId}
          playbackError={playbackError}
        />

        <SoundInfoBox />

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sound Category
          </label>
          <Dropdown
            options={SOUND_CATEGORY_OPTIONS as DropdownOption[]}
            value={notification.soundCategory}
            onChange={(val: string) => onChange("soundCategory", val)}
            placeholder="All Categories"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            If a player has the sound category set to 0% in game settings, the
            sound will not play.
          </p>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SliderField
            label="Volume"
            name="volume"
            value={notification.volume}
            onChange={(name, value) => onChange(name as FieldType, value)}
            min={0.0}
            max={1.0}
            step={0.1}
            error={errors.volume}
          />
          
          <SliderField
            label="Pitch"
            name="pitch"
            value={notification.pitch}
            onChange={(name, value) => onChange(name as FieldType, value)}
            min={0.5}
            max={2.0}
            step={0.1}
            error={errors.pitch}
          />
        </div>
      </div>
    );
  }
);

SoundTab.displayName = 'SoundTab'; 