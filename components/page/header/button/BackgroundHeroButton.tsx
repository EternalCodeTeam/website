import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import PeopleGroupIcon from "@/components/icons/people-group";
import { Button } from "@/components/ui/button";

export default function BackgroundHeroButton() {
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
    <Link href="/team">
      <motion.div ref={ref} animate={controls} initial={{ opacity: 0, y: 20 }}>
        <Button
          variant="primary"
          leftIcon={<PeopleGroupIcon className="mb-[0.5px]" aria-hidden="true" />}
          aria-label="View our team"
        >
          See our team!
        </Button>
      </motion.div>
    </Link>
  );
}
