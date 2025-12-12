import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";
import { getTeamData } from "@/lib/team";
import TeamMember from "./team-member";

export default async function Team() {
  const sections = await getTeamData();

  return (
    <section id="team">
      <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 pt-4 pb-20">
        <div className="mt-8 space-y-20">
          {sections.map((section) => (
            <div key={section.name}>
              <SlideIn className="mb-8" direction="up">
                <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
                  {section.name}s
                </h2>
                <p className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </SlideIn>

              <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.members.map((member, index) => (
                  <SlideIn
                    delay={index * 0.05}
                    direction="up"
                    key={`${section.name}-${member.documentId || index}`}
                  >
                    <TeamMember index={index} member={member} />
                  </SlideIn>
                ))}
              </StaggerContainer>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="mt-12 text-center text-gray-500">No team members found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
