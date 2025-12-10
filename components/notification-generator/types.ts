export type NotificationConfig = {
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

export type MinecraftPreviewProps = {
  notification: NotificationConfig;
};

export type TabType = "chat" | "actionbar" | "title" | "sound" | "advanced";
export type FieldType = keyof NotificationConfig;
