"use client";

import { useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";

import { Dropdown, type DropdownOption } from "../../../ui/dropdown";
import { SliderField } from "../../form/slider-field";
import type { FieldType, NotificationConfig } from "../../types";
import { SOUND_CATEGORY_OPTIONS } from "./sound-content";
import { SoundInfoBox } from "./sound-info-box";
import { type Sound, SoundTable } from "./sound-table";

const SOUNDS_JSON_URL =
  "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/sounds.json";
const SOUND_BASE_URL =
  "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/sounds/";

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

function parseSoundEntry(key: string, data: Record<string, unknown>): Sound {
  const soundEntry = data[key] as {
    category?: string;
    sounds?: Array<string | { name: string }>;
  };
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
}

interface SoundTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
  errors: Record<string, string>;
}

export interface SoundTabRef {
  stopSound: () => void;
}

export const SoundTab = ({
  notification,
  onChange,
  errors,
  ref,
}: SoundTabProps & {
  ref?: React.Ref<SoundTabRef>;
}) => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSoundType, setSelectedSoundType] = useState<string>("");
  const [currentAudioPlayingId, setCurrentAudioPlayingId] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const selectedSound = useMemo(
    () => sounds.find((s) => s.id === notification.sound),
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
    },
  }));

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        setLoading(true);
        const response = await fetch(SOUNDS_JSON_URL);
        const data = (await response.json()) as Record<string, unknown>;

        const formattedSounds: Sound[] = Object.keys(data)
          .map((key) => parseSoundEntry(key, data))
          .sort((a, b) => a.name.localeCompare(b.name));

        setSounds(formattedSounds);
        setSelectedCategory("");
        setErrorMessage("");
        setLoading(false);
      } catch (fetchError) {
        console.error("Error fetching sounds:", fetchError);
        setErrorMessage("Failed to load sounds. Using default list.");
        setSounds([
          {
            id: "entity.player.levelup",
            name: "ENTITY.PLAYER.LEVELUP",
            path: "entity/player/levelup",
            category: "entity",
          },
          {
            id: "entity.experience_orb.pickup",
            name: "ENTITY.EXPERIENCE_ORB.PICKUP",
            path: "entity/experience_orb/pickup",
            category: "entity",
          },
          {
            id: "block.note_block.pling",
            name: "BLOCK.NOTE_BLOCK.PLING",
            path: "block/note_block/pling",
            category: "block",
          },
          {
            id: "entity.ender_dragon.growl",
            name: "ENTITY.ENDER_DRAGON.GROWL",
            path: "entity/ender_dragon/growl",
            category: "entity",
          },
          { id: "ambient.cave", name: "AMBIENT.CAVE", path: "ambient/cave", category: "ambient" },
          {
            id: "music.creative",
            name: "MUSIC.CREATIVE",
            path: "music/creative",
            category: "music",
          },
          { id: "ui.toast.in", name: "UI.TOAST.IN", path: "ui/toast/in", category: "ui" },
          { id: "ui.toast.out", name: "UI.TOAST.OUT", path: "ui/toast/out", category: "ui" },
        ]);
        setSelectedCategory("");
        setErrorMessage("");
        setLoading(false);
      }
    };

    fetchSounds();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  });

  const categoriesWithSounds = useMemo(
    () => MANUAL_CATEGORIES.filter((cat) => sounds.some((s) => s.category === cat)),
    [sounds]
  );

  const categoryOrder = useCallback((cat: string | undefined) => {
    const idx = MANUAL_CATEGORIES.indexOf(cat || "");
    return idx === -1 ? 999 : idx;
  }, []);

  const filteredSounds = useMemo(() => {
    let filtered = selectedCategory
      ? sounds.filter((s) => s.category === selectedCategory)
      : sounds;

    filtered = selectedSoundType
      ? filtered.filter((s) => s.category === selectedSoundType)
      : filtered;

    return [...filtered].sort((a, b) => {
      const catA = categoryOrder(a.category);
      const catB = categoryOrder(b.category);
      if (catA === catB) {
        return a.name.localeCompare(b.name);
      }
      return catA - catB;
    });
  }, [sounds, selectedCategory, selectedSoundType, categoryOrder]);

  const handlePlaySound = useCallback(
    (sound: Sound) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setPlaybackError(null);

      const newAudio = new Audio(`${SOUND_BASE_URL}${sound.path}.ogg`);

      let volumeValue = 1.0;
      const parsedVolume = Number.parseFloat(notification.volume);
      if (!Number.isNaN(parsedVolume) && Number.isFinite(parsedVolume)) {
        volumeValue = Math.min(Math.max(parsedVolume, 0), 1.0);
      }

      try {
        newAudio.volume = volumeValue;
      } catch (error) {
        console.error("Error setting volume:", error);
        newAudio.volume = 1.0;
      }

      let pitchValue = 1.0;
      const parsedPitch = Number.parseFloat(notification.pitch);
      if (!Number.isNaN(parsedPitch) && Number.isFinite(parsedPitch)) {
        pitchValue = Math.min(Math.max(parsedPitch, 0.5), 2.0);
      }

      try {
        newAudio.playbackRate = pitchValue;
      } catch (error) {
        console.error("Error setting pitch:", error);
        newAudio.playbackRate = 1.0;
      }

      newAudio.onended = () => {
        setPlaying(false);
        setCurrentAudioPlayingId(null);
      };

      newAudio.onerror = () => {
        setPlaying(false);
        setCurrentAudioPlayingId(null);
        setPlaybackError("Failed to play sound. The file might be missing or corrupted.");
      };

      setAudio(newAudio);
      setPlaying(true);
      setCurrentAudioPlayingId(sound.id);

      newAudio.play().catch((error) => {
        console.error("Error playing sound:", error);
        setPlaying(false);
        setCurrentAudioPlayingId(null);
        setPlaybackError("Failed to play sound. Please try again.");
      });
    },
    [notification.volume, notification.pitch, audio]
  );

  const handleStopSound = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      setCurrentAudioPlayingId(null);
      setPlaybackError(null);
    }
  }, [audio]);

  const handleSelectSound = useCallback(
    (soundId: string) => {
      onChange("sound", soundId);
      setPlaybackError(null);
    },
    [onChange]
  );

  const handleSoundTypeChange = useCallback((type: string) => {
    setSelectedSoundType(type);
  }, []);

  const soundTypeOptions = useMemo(() => {
    const options: DropdownOption[] = [
      { value: "", label: "All Types" },
      ...categoriesWithSounds.map((cat) => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " "),
      })),
    ];
    return options;
  }, [categoriesWithSounds]);

  return (
    <div>
      {!!errorMessage && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm dark:bg-red-900/30 dark:text-red-400">
          {errorMessage}
        </div>
      )}
      <div className="mb-4">
        <div
          className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300"
          id="sound-type-label"
        >
          Sound Type
        </div>
        <Dropdown
          aria-labelledby="sound-type-label"
          onChange={handleSoundTypeChange}
          options={soundTypeOptions}
          placeholder="All Types"
          value={selectedSoundType}
        />
        <p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
          Filter sounds by their type.
        </p>
      </div>

      <SoundTable
        currentlyPlayingId={currentAudioPlayingId}
        isPlaying={playing}
        loading={loading}
        onPlaySound={handlePlaySound}
        onSelectSound={handleSelectSound}
        onStopSound={handleStopSound}
        playbackError={playbackError}
        selectedSound={selectedSound}
        sounds={filteredSounds}
      />

      <SoundInfoBox />

      <div className="mb-4">
        <div
          className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300"
          id="sound-category-label"
        >
          Sound Category
        </div>
        <Dropdown
          aria-labelledby="sound-category-label"
          onChange={(val: string) => onChange("soundCategory", val)}
          options={SOUND_CATEGORY_OPTIONS as DropdownOption[]}
          placeholder="All Categories"
          value={notification.soundCategory}
        />
        <p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
          If a player has the sound category set to 0% in game settings, the sound will not play.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SliderField
          error={errors.volume}
          label="Volume"
          max={1.0}
          min={0.0}
          name="volume"
          onChange={(name, value) => onChange(name as FieldType, value.toString())}
          step={0.1}
          value={notification.volume || "1.0"}
        />

        <SliderField
          error={errors.pitch}
          label="Pitch"
          max={2.0}
          min={0.5}
          name="pitch"
          onChange={(name, value) => onChange(name as FieldType, value.toString())}
          step={0.1}
          value={notification.pitch || "1.0"}
        />
      </div>
    </div>
  );
};
