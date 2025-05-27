import { AlertBox } from "../../components/docs/ui/AlertBox";

export function SoundInfoBox() {
  return (
    <AlertBox type="tip" title="Choose a Minecraft sound">
      You can find and test Minecraft sounds at{" "}
      <a
        href="https://minecraftsounds.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        minecraftsounds.com
      </a>
      . Copy the sound name and paste it below.
    </AlertBox>
  );
}
