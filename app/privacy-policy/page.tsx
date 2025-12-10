"use client";

import {
  Cookie,
  Database,
  Eye,
  FileText,
  Globe,
  Mail,
  Server,
  Shield,
  ShieldCheck,
} from "lucide-react";

import { FacadePattern } from "@/components/ui/facade-pattern";
import {
  FadeIn,
  HoverScale,
  SlideIn,
  StaggerContainer,
} from "@/components/ui/motion/motion-components";

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 9, 2025";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="-left-20 absolute top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />
        <div className="-right-20 absolute top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl filter dark:bg-indigo-500/5" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl filter" />
        <FacadePattern className="absolute inset-0 opacity-20 dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-(--breakpoint-xl) px-4 pt-32 pb-20 sm:pt-40">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 text-sm dark:bg-blue-900/30 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4" />
              <span>Trust & Transparency</span>
            </div>
            <h1 className="mb-6 bg-linear-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text font-extrabold text-4xl text-transparent sm:text-5xl md:text-6xl dark:from-white dark:via-blue-100 dark:to-indigo-200">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg dark:text-gray-300">
              Your privacy is non-negotiable. We are committed to transparency in how we collect,
              use, and protect your data.
            </p>
            <p className="mt-4 text-gray-500 text-sm dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="w-full space-y-16">
          {/* Who We Are */}
          <SlideIn direction="up">
            <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/50 p-8 shadow-xs backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">
                    Who We Are
                  </h2>
                  <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                    EternalCode.pl is a collective of passionate developers dedicated to open-source
                    innovation. We build tools, libraries, and applications to empower the
                    community. Transparency isn't just a policy for us; it's a core value. We
                    believe you have the right to know exactly how your data interacts with our
                    services.
                  </p>
                </div>
              </div>
            </section>
          </SlideIn>

          {/* What We Collect - Grid */}
          <section>
            <SlideIn className="mb-8 text-center" direction="up">
              <h2 className="font-bold text-3xl text-gray-900 dark:text-white">Data We Collect</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                we only collect what is strictly necessary.
              </p>
            </SlideIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <HoverScale>
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <Cookie className="mb-4 h-8 w-8 text-orange-500" />
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                    Cookies
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    Used for site functionality, preferences, and anonymous analytics. You control
                    these via our consent manager.
                  </p>
                </div>
              </HoverScale>

              <HoverScale>
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <Eye className="mb-4 h-8 w-8 text-blue-500" />
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                    Analytics
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    Aggregated, anonymous data (views, device types) via Vercel Analytics to improve
                    performance.
                  </p>
                </div>
              </HoverScale>

              <HoverScale>
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <Mail className="mb-4 h-8 w-8 text-purple-500" />
                  <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                    Communications
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-300">
                    Email addresses and message content when you explicitly contact us via forms or
                    Discord.
                  </p>
                </div>
              </HoverScale>
            </div>
          </section>

          {/* Usage & Cookie Details - Split View */}
          <div className="grid gap-8 lg:grid-cols-2">
            <SlideIn direction="left">
              <section className="h-full rounded-2xl border border-gray-200 bg-white/50 p-8 dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-6 flex items-center gap-3">
                  <Server className="h-6 w-6 text-indigo-500" />
                  <h2 className="font-bold text-gray-900 text-xl dark:text-white">Data Usage</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "Provide and improve services",
                    "Understand user demographics (anonymously)",
                    "Respond to support inquiries",
                    "Maintain site security and performance",
                  ].map((item) => (
                    <li
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                      key={item}
                    >
                      <div className="relative top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </SlideIn>

            <SlideIn direction="right">
              <section className="h-full rounded-2xl border border-gray-200 bg-white/50 p-8 dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-6 flex items-center gap-3">
                  <Database className="h-6 w-6 text-teal-500" />
                  <h2 className="font-bold text-gray-900 text-xl dark:text-white">Cookie Types</h2>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      Necessary:
                    </span>{" "}
                    <span className="text-gray-600 text-sm dark:text-gray-300">
                      Essential for site operation.
                    </span>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      Analytics:
                    </span>{" "}
                    <span className="text-gray-600 text-sm dark:text-gray-300">
                      Anonymous usage metrics.
                    </span>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      Marketing:
                    </span>{" "}
                    <span className="text-gray-600 text-sm dark:text-gray-300">
                      Cross-site tracking (optional).
                    </span>
                  </div>
                </div>
              </section>
            </SlideIn>
          </div>

          {/* User Rights */}
          <SlideIn direction="up">
            <section className="overflow-hidden rounded-2xl bg-linear-to-br from-indigo-900 to-blue-900 px-8 py-10 text-white shadow-xl">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-indigo-200" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="mb-3 font-bold text-2xl">Your Rights (GDPR)</h2>
                  <p className="mb-4 text-indigo-100">
                    You remain in control of your digital footprint. You have the right to access,
                    correct, delete, and restrict processing of your data.
                  </p>
                  <p className="text-indigo-200/80 text-sm">
                    For specific requests, contact us directly. We process all GDPR requests within
                    legal timeframes.
                  </p>
                </div>
              </div>
            </section>
          </SlideIn>

          {/* Contact Section */}
          <SlideIn direction="up">
            <section className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-6 flex items-center gap-2 font-bold text-2xl text-gray-900 dark:text-white">
                <FileText className="h-6 w-6 text-gray-400" />
                Contact Us
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Have questions about this policy? Need to exercise your rights? Reach out to our
                    privacy team.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      href="mailto:eternalcodeteam@gmail.com"
                    >
                      <Mail className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">email</span>
                    </a>
                    <a
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      href="https://discord.com/invite/FQ7jmGBd6c"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Server className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Discord</span>
                    </a>
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Important Note
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                    We may update this policy periodically. Major changes will be communicated via
                    our website or social channels. Please review this page occasionally to stay
                    informed about how we protect your data.
                  </p>
                </div>
              </div>
            </section>
          </SlideIn>
        </StaggerContainer>
      </div>
    </div>
  );
}
