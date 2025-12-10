import { AlertBox } from "../../../ui/alert-box";

export function SoundInfoBox() {
  return (
    <AlertBox title="Sound Selection" type="tip">
      <p className="mb-2">
        Search for sounds by name or category, then sort them by name or category in ascending or
        descending order. Click on a row to select a sound, and use the play/stop button to preview
        it.
      </p>
    </AlertBox>
  );
}
