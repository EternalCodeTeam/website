import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | EternalCode.pl",
  description:
    "Learn about how EternalCode.pl collects, uses, and protects your personal data. Our privacy policy explains our data practices and your rights.",
  alternates: {
    canonical: "https://eternalcode.pl/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
