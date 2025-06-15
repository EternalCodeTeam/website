import { AlertBox } from "../ui/AlertBox";

export function SoundInfoBox() {
  return (
    <AlertBox type="tip" title="Sound Selection">
      <p className="mb-2">
        Search for sounds by name or category, then sort them by name or category in ascending or
        descending order. Click on a row to select a sound, and use the play/stop button to preview
        it.
      </p>
    </AlertBox>
  );
}
