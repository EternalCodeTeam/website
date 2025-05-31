import Link from "next/link";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useCallback } from "react";
import ArrowForwardHeroIcon from "@/components/icons/arrow-forward-hero";
import { Button } from "@/components/ui/button";

export default function TransparentHeroButton() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();

  const handleAnimation = useCallback(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [inView, controls]);

  useEffect(() => {
    handleAnimation();
  }, [handleAnimation]);

  return (
    <Link href="/#about">
      <Button
        ref={ref}
        variant="ghost"
        animate={false}
        className="group mb-2 ml-0 flex items-center gap-2 py-2.5 pr-3 text-left text-sm font-medium text-black transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
        aria-label="Learn more about us"
      >
        <ArrowForwardHeroIcon
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        About us
      </Button>
    </Link>
  );
}
