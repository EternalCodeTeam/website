"use client";

import { NotificationConfig, FieldType } from "../types";
import { FormField } from "./FormField";
import { SoundInfoBox } from "../SoundInfoBox";
import { SOUND_CATEGORY_OPTIONS } from "./constants";

interface SoundTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
  errors: Record<string, string>;
}

export const SoundTab = ({ notification, onChange, errors }: SoundTabProps) => (
  <div>
    <FormField
      label="Sound"
      name="sound"
      value={notification.sound}
      onChange={onChange}
      placeholder="Np. ENTITY_PLAYER_LEVELUP"
      error={errors.sound}
    />
    <SoundInfoBox />

    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Sound Category
      </label>
      <select
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        value={notification.soundCategory}
        onChange={(e) => onChange("soundCategory", e.target.value)}
      >
        {SOUND_CATEGORY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        If a player has the sound category set to 0% in game settings, the
        sound will not play.
      </p>
    </div>

    <div className="mb-4 grid grid-cols-2 gap-4">
      <FormField
        label="Volume"
        name="volume"
        value={notification.volume}
        onChange={onChange}
        placeholder="Np. 2.0"
        error={errors.volume}
      />
      
      <FormField
        label="Pitch"
        name="pitch"
        value={notification.pitch}
        onChange={onChange}
        placeholder="Np. 1.0"
        error={errors.pitch}
      />
    </div>
  </div>
); 