"use client";

import { useRef, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { NotificationConfig, FieldType } from "../types";
import { FormField } from "./FormField";
import { SoundInfoBox } from "../SoundInfoBox";
import { SOUND_CATEGORY_OPTIONS } from "./constants";
import { SoundDropdown, SoundDropdownRef } from "./SoundDropdown";
import { SliderField } from "./SliderField";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown, DropdownOption } from "../../ui/Dropdown";

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
    const soundDropdownRef = useRef<SoundDropdownRef>(null);

    useImperativeHandle(ref, () => ({
      stopSound: () => {
        soundDropdownRef.current?.stopSound();
      }
    }));

    return (
      <div>
        <SoundDropdown
          ref={soundDropdownRef}
          value={notification.sound}
          onChange={(value) => onChange("sound", value)}
          volume={notification.volume}
          pitch={notification.pitch}
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