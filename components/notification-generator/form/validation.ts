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

export const validateForm = (
  notification: Record<string, string>,
  validateFieldFn: (field: FieldType, value: string) => string
): Record<string, string> => {
  const errors: Record<string, string> = {};


  if (notification.fadeIn) {
    const error = validateFieldFn("fadeIn" as FieldType, notification.fadeIn);
    if (error) errors.fadeIn = error;
  }

  if (notification.stay) {
    const error = validateFieldFn("stay" as FieldType, notification.stay);
    if (error) errors.stay = error;
  }

  if (notification.fadeOut) {
    const error = validateFieldFn("fadeOut" as FieldType, notification.fadeOut);
    if (error) errors.fadeOut = error;
  }

  if (notification.sound) {
    const error = validateFieldFn("sound" as FieldType, notification.sound);
    if (error) errors.sound = error;
  }

  return errors;
}; 