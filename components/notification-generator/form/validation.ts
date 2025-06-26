import { FieldType } from "../types";

export const validateField = (field: FieldType, value: string): string => {
  if (!value) return "";

  switch (field) {
    case "fadeIn":
    case "stay":
    case "fadeOut":
      if (!/^\d+(\.\d+)?s$/.test(value)) {
        return "Format: 1s, 0.5s, 2s, etc.";
      }
      break;
    case "sound":
      if (value && !/^[A-Z_]+(\s+[A-Z_]+)?$/.test(value)) {
        return "Invalid sound formatting";
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

