import { AlertBox } from "../../components/docs/ui/AlertBox";

export function SoundInfoBox() {
  return (
    <AlertBox type="tip" title="Minecraft Sounds">
      <p className="mb-2">
        Select a sound from the dropdown menu above. You can preview the sound by clicking the play button.
      </p>
    </AlertBox>
  );
}
