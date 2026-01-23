interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  downloadUrl?: string;
  version?: string;
  license?: string;
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = "Java",
  downloadUrl,
  version,
  license = "GPL-3.0",
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(downloadUrl && { downloadUrl }),
    ...(version && { softwareVersion: version }),
    ...(license && { license }),
    author: {
      "@type": "Organization",
      name: "EternalCode Team",
      url: "https://eternalcode.pl",
    },
    publisher: {
      "@type": "Organization",
      name: "EternalCode",
      url: "https://eternalcode.pl",
    },
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="software-application-schema"
      type="application/ld+json"
    />
  );
}
