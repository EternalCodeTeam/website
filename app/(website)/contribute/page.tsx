import { getPayload } from "payload";
import config from "@/payload.config";
import type { ContributePage as ContributePageType } from "@/payload-types-generated";
import ContributeView from "./contribute-view";

export const metadata = {
  title: "Contribute | EternalCode",
  description:
    "Join the EternalCode community. Contribute code, support us financially, or help with documentation and support.",
};

type CardData = NonNullable<ContributePageType["cards"]>[number];

export default async function ContributePage() {
  let cards: CardData[] = [];

  try {
    const payload = await getPayload({ config });
    const globalData = await payload.findGlobal({
      slug: "contribute-page",
    });

    if (globalData.cards && globalData.cards.length > 0) {
      cards = globalData.cards.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        icon: card.icon || "HelpCircle", // Fallback icon if missing
        actionText: card.actionText,
        href: card.href,
        color: card.color,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch contribution cards from Payload CMS", e);
  }

  return <ContributeView cards={cards} />;
}
