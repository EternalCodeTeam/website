import { AlertBox } from "@/components/ui/alert-box";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>

      <div className="prose max-w-none dark:prose-invert">
        <h2>Who We Are</h2>
        <p>
          EternalCode.pl is a team of programmers specializing in open-source projects. Our website
          provides information about our team, our projects, and documentation for our open-source
          work. We are committed to transparency and privacy for all visitors.
        </p>

        <h2>What Data We Collect</h2>
        <ul>
          <li>
            <strong>Cookies:</strong> We use cookies to remember your preferences, enable essential
            site functionality, and analyze site usage.
          </li>
          <li>
            <strong>Analytics Data:</strong> We use Vercel Analytics to collect anonymized
            information about how visitors use our site (e.g., page views, device type, browser).
            This data does not identify you personally.
          </li>
          <li>
            <strong>Contact Information:</strong> If you contact us by email, Discord, or the
            contact form, we will receive your email address, Discord username, and the content of
            your message.
          </li>
        </ul>

        <h2>How We Use Your Data</h2>
        <ul>
          <li>To provide and improve our website and services</li>
          <li>To understand how our website is used (analytics)</li>
          <li>To respond to inquiries sent to our email, Discord, or contact form</li>
          <li>To remember your cookie preferences</li>
        </ul>

        <h2>Cookies and Similar Technologies</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li>
            <strong>Necessary Cookies:</strong> Essential for the website to function (e.g.,
            remembering your cookie preferences).
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our
            website. These are only set if you consent.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> May be used to track visitors across websites for
            marketing purposes. These are only set if you consent.
          </li>
          <li>
            <strong>Preference Cookies:</strong> Remember your settings and preferences. These are
            only set if you consent.
          </li>
        </ul>
        <p>
          You can manage your cookie preferences at any time using the cookie settings menu (gear
          icon in the bottom right corner).
        </p>

        <h2>Contact Form</h2>
        <p>
          If you use the contact form on our website, we process the data you provide only to
          respond to your inquiry. Your data will not be used for marketing purposes or shared with
          third parties.
        </p>

        <h2>Third-Party Services and Links</h2>
        <ul>
          <li>
            <strong>Vercel Analytics:</strong> Used for anonymous site analytics. See{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel's privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Discord:</strong> You can contact us via Discord:{" "}
            <a
              href="https://discord.com/invite/FQ7jmGBd6c"
              target="_blank"
              rel="noopener noreferrer"
            >
              join our server
            </a>
            .
          </li>
          <li>
            <strong>External Links:</strong> Our site contains links to third-party services (e.g.,
            GitHub, YouTube, TikTok). We are not responsible for the privacy practices of these
            external sites.
          </li>
        </ul>

        <h2>Your Rights (GDPR)</h2>
        <p>If you are in the European Union, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Restrict or object to processing of your data</li>
          <li>Withdraw consent at any time (for cookies/analytics)</li>
        </ul>
        <p>To exercise your rights, please contact us by email or Discord.</p>

        <h2>Contact Us</h2>
        <p>For any questions about this privacy policy or your data, you can contact us:</p>
        <AlertBox
          type="info"
          title={<span className="flex items-center gap-2">Contact Information</span>}
        >
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:eternalcodeteam@gmail.com"
                className="text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                eternalcodeteam@gmail.com
              </a>
            </div>
            <div>
              <span className="font-semibold">Discord:</span>{" "}
              <a
                href="https://discord.com/invite/FQ7jmGBd6c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                join our server
              </a>
            </div>
          </div>
        </AlertBox>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be posted on this page
          with an updated date.
        </p>
      </div>
    </div>
  );
}
