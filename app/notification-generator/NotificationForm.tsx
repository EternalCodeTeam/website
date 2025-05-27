"use client";

import { useState } from "react";
import { AlertBox } from "../../components/docs/ui/AlertBox";
import { MiniMessageInfoBox } from "./MiniMessageInfoBox";
import { SoundInfoBox } from "./SoundInfoBox";

interface NotificationFormProps {
  notification: {
    chat: string;
    actionbar: string;
    title: string;
    subtitle: string;
    fadeIn: string;
    stay: string;
    fadeOut: string;
    sound: string;
    soundCategory: string;
    titleHide: boolean;
    pitch: string;
    volume: string;
  };
  setNotification: (notification: any) => void;
}

export function NotificationForm({
  notification,
  setNotification,
}: NotificationFormProps) {
  const [activeTab, setActiveTab] = useState("chat");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    setNotification({
      ...notification,
      [field]: value,
    });
    // Live validation for fadeIn, stay, fadeOut, volume, pitch
    if (["fadeIn", "stay", "fadeOut", "volume", "pitch"].includes(field)) {
      const error = validateField(field, value as string);
      setErrors({
        ...errors,
        [field]: error,
      });
    } else if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const validateField = (field: string, value: string) => {
    if (!value) return "";

    switch (field) {
      case "fadeIn":
      case "stay":
      case "fadeOut":
        // Validate time format (e.g. "1s", "0.5s", "2s")
        if (!/^\d+(\.\d+)?s$/.test(value)) {
          return "Format: 1s, 0.5s, 2s, etc.";
        }
        break;
      case "sound":
        if (value && !/^[A-Z_]+(\s+[A-Z_]+)?$/.test(value)) {
          return "Invalid sound format";
        }
        break;
      case "pitch":
      case "volume":
        if (!/^\d+(\.\d+)?$/.test(value)) {
          return "Format: 1.0, 2.0, 3.0, etc.";
        }
        break;
    }

    return "";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate time fields
    if (notification.fadeIn) {
      const error = validateField("fadeIn", notification.fadeIn);
      if (error) newErrors.fadeIn = error;
    }

    if (notification.stay) {
      const error = validateField("stay", notification.stay);
      if (error) newErrors.stay = error;
    }

    if (notification.fadeOut) {
      const error = validateField("fadeOut", notification.fadeOut);
      if (error) newErrors.fadeOut = error;
    }

    if (notification.sound) {
      const error = validateField("sound", notification.sound);
      if (error) newErrors.sound = error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const soundOptions = [
    { value: "", label: "None" },
    { value: "ENTITY_PLAYER_LEVELUP", label: "Level Up" },
    { value: "ENTITY_EXPERIENCE_ORB_PICKUP", label: "Experience Pickup" },
    { value: "ENTITY_PLAYER_ATTACK_STRONG", label: "Attack Strong" },
    { value: "ENTITY_PLAYER_ATTACK_WEAK", label: "Attack Weak" },
    { value: "ENTITY_PLAYER_HURT", label: "Player Hurt" },
    { value: "ENTITY_PLAYER_DEATH", label: "Player Death" },
    { value: "BLOCK_NOTE_BLOCK_PLING", label: "Note Block Pling" },
    { value: "BLOCK_NOTE_BLOCK_BASS", label: "Note Block Bass" },
    { value: "BLOCK_NOTE_BLOCK_HARP", label: "Note Block Harp" },
    { value: "BLOCK_NOTE_BLOCK_BELL", label: "Note Block Bell" },
    { value: "BLOCK_NOTE_BLOCK_CHIME", label: "Note Block Chime" },
    { value: "BLOCK_NOTE_BLOCK_FLUTE", label: "Note Block Flute" },
    { value: "BLOCK_NOTE_BLOCK_GUITAR", label: "Note Block Guitar" },
    { value: "BLOCK_NOTE_BLOCK_XYLOPHONE", label: "Note Block Xylophone" },
    {
      value: "BLOCK_NOTE_BLOCK_IRON_XYLOPHONE",
      label: "Note Block Iron Xylophone",
    },
    { value: "BLOCK_NOTE_BLOCK_COW_BELL", label: "Note Block Cow Bell" },
    { value: "BLOCK_NOTE_BLOCK_DIDGERIDOO", label: "Note Block Didgeridoo" },
    { value: "BLOCK_NOTE_BLOCK_BIT", label: "Note Block Bit" },
    { value: "BLOCK_NOTE_BLOCK_BANJO", label: "Note Block Banjo" },
  ];

  const soundCategoryOptions = [
    { value: "", label: "None" },
    { value: "MASTER", label: "Master" },
    { value: "MUSIC", label: "Music" },
    { value: "RECORDS", label: "Records" },
    { value: "WEATHER", label: "Weather" },
    { value: "BLOCKS", label: "Blocks" },
    { value: "HOSTILE", label: "Hostile" },
    { value: "NEUTRAL", label: "Neutral" },
    { value: "PLAYERS", label: "Players" },
    { value: "AMBIENT", label: "Ambient" },
    { value: "VOICE", label: "Voice" },
  ];

  return (
    <div>
      <div className="mb-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "chat"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "actionbar"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("actionbar")}
          >
            Action Bar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "title"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("title")}
          >
            Title
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "sound"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("sound")}
          >
            Sound
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "advanced"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>
      </div>

      {activeTab === "chat" && (
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Chat Message
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              rows={4}
              value={notification.chat}
              onChange={(e) => handleChange("chat", e.target.value)}
              placeholder="Enter your chat message (use multiple lines for multiline chat)"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use multiple lines to create a multiline chat message.
            </p>
          </div>
          <MiniMessageInfoBox />
        </div>
      )}

      {activeTab === "actionbar" && (
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Action Bar Message
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={notification.actionbar}
              onChange={(e) => handleChange("actionbar", e.target.value)}
              placeholder="Enter your action bar message"
            />
          </div>
          <MiniMessageInfoBox />
        </div>
      )}

      {activeTab === "title" && (
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={notification.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter your title"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtitle
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={notification.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              placeholder="Enter your subtitle"
            />
          </div>

          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fade In
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 ${errors.fadeIn ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                value={notification.fadeIn}
                onChange={(e) => handleChange("fadeIn", e.target.value)}
                placeholder="e.g. 1s"
              />
              <p
                className={`mt-1 text-xs ${errors.fadeIn ? "text-red-500" : "invisible"}`}
              >
                {errors.fadeIn || "placeholder"}
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stay
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 ${errors.stay ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                value={notification.stay}
                onChange={(e) => handleChange("stay", e.target.value)}
                placeholder="e.g. 2s"
              />
              <p
                className={`mt-1 text-xs ${errors.stay ? "text-red-500" : "invisible"}`}
              >
                {errors.stay || "placeholder"}
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fade Out
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 ${errors.fadeOut ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                value={notification.fadeOut}
                onChange={(e) => handleChange("fadeOut", e.target.value)}
                placeholder="e.g. 1s"
              />
              <p
                className={`mt-1 text-xs ${errors.fadeOut ? "text-red-500" : "invisible"}`}
              >
                {errors.fadeOut || "placeholder"}
              </p>
            </div>

          </div>
          <MiniMessageInfoBox />
        </div>
      )}

      {activeTab === "sound" && (
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sound
            </label>
            <input
              type="text"
              className={`w-full border px-3 py-2 ${errors.sound ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              value={notification.sound}
              onChange={(e) => handleChange("sound", e.target.value)}
              placeholder="Np. ENTITY_PLAYER_LEVELUP"
            />
            {errors.sound && (
              <p className="mt-1 text-xs text-red-500">{errors.sound}</p>
            )}
            <SoundInfoBox />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sound Category
            </label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={notification.soundCategory}
              onChange={(e) => handleChange("soundCategory", e.target.value)}
            >
              {soundCategoryOptions.map((option) => (
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
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Volume
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 ${errors.volume ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                value={notification.volume}
                onChange={(e) => handleChange("volume", e.target.value)}
                placeholder="Np. 2.0"
              />
              <p
                className={`mt-1 text-xs ${errors.volume ? "text-red-500" : "invisible"}`}
              >
                {errors.volume || "placeholder"}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pitch
              </label>
              <input
                type="text"
                className={`w-full border px-3 py-2 ${errors.pitch ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                value={notification.pitch}
                onChange={(e) => handleChange("pitch", e.target.value)}
                placeholder="Np. 1.0"
              />
              <p
                className={`mt-1 text-xs ${errors.pitch ? "text-red-500" : "invisible"}`}
              >
                {errors.pitch || "placeholder"}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "advanced" && (
        <div>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="titleHide"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={notification.titleHide}
                onChange={(e) => handleChange("titleHide", e.target.checked)}
              />
              <label
                htmlFor="titleHide"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Clear title/subtitle before sending new one
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          onClick={() =>
            setNotification({
              chat: "",
              actionbar: "",
              title: "",
              subtitle: "",
              fadeIn: "",
              stay: "",
              fadeOut: "",
              sound: "",
              soundCategory: "",
              titleHide: false,
              pitch: "",
              volume: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}
