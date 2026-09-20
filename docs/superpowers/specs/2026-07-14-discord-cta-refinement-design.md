# Discord CTA refinement

## Goal

Refine the Discord CTA so it feels intentionally art-directed and consistent with the EternalCode visual system, without the layered decorative treatment associated with generic AI-generated landing pages.

## Visual direction

- Keep the blue Discord surface, rounded card geometry, strong headline, mascot, and primary Discord action.
- Emphasize only “good stuff” with a restrained blue-to-violet text gradient.
- Add a short, soft typographic accent beneath the emphasized phrase. It must follow the width of the phrase and remain secondary to the lettering.
- Remove the floating voxel squares, diagonal light beam, top highlight line, oversized glass pane, and excessive ambient glow.
- Use a simple tonal division behind the mascot instead of a glass-effect decorative object.
- Reduce hover movement and shadow intensity so interactions feel deliberate rather than theatrical.

## Layout

The existing two-column layout remains. Copy and action stay on the left; the mascot remains large and partially cropped on the right. Mobile keeps the stacked layout and full-width action.

## Accessibility and motion

The emphasized phrase remains readable without gradient support. Decorative accents remain hidden from assistive technology. Motion is limited to a small button-arrow shift and a subtle mascot lift, with reduced-motion behavior inherited from the site.

## Verification

- Run the CTA component tests, lint, TypeScript, and production build.
- Inspect the CTA in the dev server at desktop and mobile widths in both themes.
