import Image from "next/image";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";
import { getTeamData } from "@/lib/team";
import TeamMember from "./team-member";

export default async function Team() {
  const sections = await getTeamData();

  return (
    <section id="team">
      <div className="relative mx-auto max-w-7xl px-4 pt-4 pb-20">
        <div className="mt-8 space-y-20">
          {sections.map((section) => (
            <div key={section.name}>
              <SlideIn className="mb-8" direction="up">
                <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
                  {section.name.endsWith("s") ? section.name : `${section.name}s`}
                </h2>
                <p className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </SlideIn>

              {section.variant === "contributors" ? (
                <StaggerContainer className="flex flex-wrap gap-4">
                  {section.members.map((member, index) => (
                    <SlideIn
                      delay={index * 0.01}
                      direction="up"
                      key={`${section.name}-${member.documentId || index}`}
                    >
                      <a
                        className="group relative block"
                        href={member.github}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={member.name}
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md dark:border-gray-800">
                          <Image
                            alt={member.name}
                            className="h-full w-full object-cover"
                            height={64}
                            src={member.avatar_url}
                            width={64}
                          />
                        </div>
                      </a>
                    </SlideIn>
                  ))}
                </StaggerContainer>
              ) : (
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
              )}
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
