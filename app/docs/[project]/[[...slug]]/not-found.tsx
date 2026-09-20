import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function DocumentationNotFound() {
  return (
    <section className="docs-not-found">
      <SearchX aria-hidden="true" size={30} />
      <p className="docs-kicker">404 / DOCUMENTATION</p>
      <h1>This page is outside the map.</h1>
      <p>The guide may have moved, or the address is incomplete.</p>
      <Link href="/docs">
        <ArrowLeft aria-hidden="true" size={16} /> Back to documentation
      </Link>
    </section>
  );
}
