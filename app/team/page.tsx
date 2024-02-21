import Team from "@/components/team/Team";

export const dynamic = "force-static";
export const fetchCache = "force-cache";

export default function TeamMembers() {
  return (
    <main>
      <Team />
    </main>
  );
}
