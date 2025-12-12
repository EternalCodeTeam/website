import type { FieldType } from "../types";

const TIME_FORMAT_REGEX = /^\d+(\.\d+)?s$/;
const SOUND_FORMAT_REGEX = /^[A-Z_]+(\s+[A-Z_]+)?$/;
const NUMBER_FORMAT_REGEX = /^\d+(\.\d+)?$/;

export const validateField = (field: FieldType, value: string): string => {
  if (!value) {
    return "";
  }

  switch (field) {
    case "fadeIn":
    case "stay":
    case "fadeOut":
      if (!TIME_FORMAT_REGEX.test(value)) {
        return "Format: 1s, 0.5s, 2s, etc.";
      }
      break;
    case "sound":
      if (value && !SOUND_FORMAT_REGEX.test(value)) {
        return "Invalid sound formatting";
      }
      break;
    case "pitch":
    case "volume":
      if (!NUMBER_FORMAT_REGEX.test(value)) {
        return "Format: 1.0, 2.0, 3.0, etc.";
      }
      break;
    default:
      break;
  }

  return "";
};
