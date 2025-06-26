import { AlertBox } from "../../ui/alert-box";

export function MiniMessageInfoBox() {
  return (
    <AlertBox type="tip" title="MiniMessage support">
      If you want to use <b>MiniMessage</b>, first generate your message in the{" "}
      <a
        href="https://webui.adventure.kyori.net/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        MiniMessage WebUI
      </a>{" "}
      and then copy it here.
    </AlertBox>
  );
}
