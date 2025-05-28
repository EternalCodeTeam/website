"use client";

import { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import { Dropdown, DropdownOption } from "../../ui/Dropdown";

interface SoundDropdownProps {
  value: string;
  onChange: (value: string) => void;
  volume?: number | string;
  pitch?: number | string;
}

interface Sound {
  id: string;
  name: string;
  path: string;
  category?: string;
}

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

export interface SoundDropdownRef {
  stopSound: () => void;
}

export const SoundDropdown = forwardRef<SoundDropdownRef, SoundDropdownProps>(
  ({ value, onChange, volume = 1, pitch = 1 }, ref) => {
    const [sounds, setSounds] = useState<Sound[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const selectedSound = useMemo(() => 
      sounds.find((s) => s.id === value),
      [sounds, value]
    );

    useImperativeHandle(ref, () => ({
      stopSound: () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          setPlaying(false);
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
    }, [value]);

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
        
      return [...filtered].sort((a, b) => {
        const catA = categoryOrder(a.category);
        const catB = categoryOrder(b.category);
        if (catA === catB) {
          return a.name.localeCompare(b.name);
        }
        return catA - catB;
      });
    }, [sounds, selectedCategory]);

    const handlePlaySound = () => {
      if (!selectedSound) return;
      
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      const newAudio = new Audio(`${SOUND_BASE_URL}${selectedSound.path}.ogg`);
      

      let volumeValue = 1.0;
      if (typeof volume === "string") {
        const parsedVolume = parseFloat(volume);
        if (!isNaN(parsedVolume) && isFinite(parsedVolume)) {
          volumeValue = Math.min(Math.max(parsedVolume, 0), 1.0);
        }
      } else if (typeof volume === "number" && isFinite(volume)) {
        volumeValue = Math.min(Math.max(volume, 0), 1.0);
      }
      

      try {
        newAudio.volume = volumeValue;
      } catch (err) {
        console.error("Error setting volume:", err);
        newAudio.volume = 1.0; 
      }
      

      let pitchValue = 1.0; 
      if (typeof pitch === "string") {
        const parsedPitch = parseFloat(pitch);
        if (!isNaN(parsedPitch) && isFinite(parsedPitch)) {
          pitchValue = Math.min(Math.max(parsedPitch, 0.5), 2.0);
        }
      } else if (typeof pitch === "number" && isFinite(pitch)) {
        pitchValue = Math.min(Math.max(pitch, 0.5), 2.0);
      }
      

      try {
        newAudio.playbackRate = pitchValue;
      } catch (err) {
        console.error("Error setting playback rate:", err);
      }
      
      newAudio.onended = () => setPlaying(false);
      newAudio.onerror = () => {
        setPlaying(false);
        setError("This sound is not available for preview.");
      };
      
      newAudio.play().catch(err => {
        setPlaying(false);
        setError("This sound is not available for preview.");
      });
      
      setAudio(newAudio);
      setPlaying(true);
    };

    const handleStopSound = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
      }
    };

    return (
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sound
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="w-full sm:w-40">
              <Dropdown
                options={[{ value: "", label: "All Categories" }, ...categoriesWithSounds.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ') }))] as DropdownOption[]}
                value={selectedCategory}
                onChange={(val: string) => setSelectedCategory(val)}
                placeholder="All Categories"
                disabled={loading}
              />
            </div>
            
            <div className="flex w-full">
              <div className="w-full">
                <Dropdown
                  options={filteredSounds.map((sound) => ({ value: sound.id, label: sound.name })) as DropdownOption[]}
                  value={value}
                  onChange={(val: string) => onChange(val)}
                  placeholder="Select a sound"
                  disabled={loading || filteredSounds.length === 0}
                />
              </div>
              
              <motion.button
                className="flex items-center justify-center border border-l-0 border-gray-200 bg-blue-50 px-2 py-1 text-blue-600 hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 rounded-r"
                onClick={playing ? handleStopSound : handlePlaySound}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!value || loading}
                aria-label={playing ? "Stop sound" : "Play sound"}
              >
                {playing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
        
        {filteredSounds.length === 0 && selectedCategory && (
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">No sounds in this category</span>
        )}
        
        {loading && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Loading sounds...</p>}
        {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
        
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Select a sound to play in your notification. You can preview it by clicking the play button.
        </p>
      </div>
    );
  }
);

SoundDropdown.displayName = 'SoundDropdown'; 