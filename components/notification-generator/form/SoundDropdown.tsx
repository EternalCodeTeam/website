"use client";

import { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import { Dropdown, DropdownOption } from "../../ui/Dropdown";
import { SoundTable } from "./SoundTable";

interface SoundDropdownProps {
  value: string;
  onChange: (value: string) => void;
  volume?: number | string;
  pitch?: number | string;
}

export interface Sound {
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
    const [showTable, setShowTable] = useState(false);
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
      if (audio && playing) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
      }
    }, [value]);

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

    const handlePlaySound = (sound: Sound) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      const newAudio = new Audio(`${SOUND_BASE_URL}${sound.path}.ogg`);
      
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
        console.error("Error setting pitch:", err);
        newAudio.playbackRate = 1.0;
      }
      
      newAudio.onended = () => {
        setPlaying(false);
      };
      
      newAudio.onerror = (e) => {
        console.error("Error playing sound:", e);
        setPlaying(false);
      };
      
      setAudio(newAudio);
      setPlaying(true);
      
      newAudio.play().catch(err => {
        console.error("Error playing sound:", err);
        setPlaying(false);
      });
    };
    
    const handleStopSound = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
      }
    };
    
    const toggleView = () => {
      setShowTable(!showTable);
    };
    
    const handleSelectSound = (soundId: string) => {
      onChange(soundId);
      setShowTable(false);
    };
    
    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
    };
    
    const dropdownOptions: DropdownOption[] = [
      { value: "", label: "All Categories" },
      ...categoriesWithSounds.map(cat => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ')
      }))
    ];
    
    return (
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <Dropdown
            options={dropdownOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Select category"
            className="w-48"
          />
          <button
            type="button"
            onClick={toggleView}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showTable ? "Show Dropdown" : "Show Table"}
          </button>
        </div>
        
        {showTable ? (
          <SoundTable
            sounds={filteredSounds}
            selectedSound={selectedSound}
            onSelectSound={handleSelectSound}
            onPlaySound={handlePlaySound}
            isPlaying={playing}
            onStopSound={handleStopSound}
            loading={loading}
          />
        ) : (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              disabled={loading}
            >
              <option value="">Select a sound</option>
              {filteredSounds.map((sound) => (
                <option key={sound.id} value={sound.id}>
                  {sound.name}
                </option>
              ))}
            </select>
            
            {selectedSound && (
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedSound.category ? (
                    <span className="mr-2 rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
                      {selectedSound.category.charAt(0).toUpperCase() + selectedSound.category.slice(1).replace(/_/g, ' ')}
                    </span>
                  ) : null}
                  {selectedSound.path}
                </div>
                <button
                  type="button"
                  onClick={() => handlePlaySound(selectedSound)}
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
                  disabled={playing}
                >
                  {playing ? "Playing..." : "Play"}
                </button>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="mt-2 text-sm text-red-500 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    );
  }
);

SoundDropdown.displayName = "SoundDropdown"; 