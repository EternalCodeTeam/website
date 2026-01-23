export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EternalCode",
    alternateName: "EternalCode Team",
    url: "https://eternalcode.pl",
    logo: "https://eternalcode.pl/logo.svg",
    description:
      "EternalCode.pl delivers open source projects with a focus on quality, performance, and innovation. We create modern Minecraft server plugins and tools.",
    foundingDate: "2021",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Technical Support",
      url: "https://discord.com/invite/FQ7jmGBd6c",
    },
    sameAs: [
      "https://github.com/EternalCodeTeam",
      "https://discord.com/invite/FQ7jmGBd6c",
      "https://ko-fi.com/eternalcodeteam",
    ],
    keywords: [
      "minecraft plugins",
      "open source",
      "server software",
      "eternalcore",
      "eternalcombat",
      "minecraft essentials",
    ],
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="organization-schema"
      type="application/ld+json"
    />
  );
}
