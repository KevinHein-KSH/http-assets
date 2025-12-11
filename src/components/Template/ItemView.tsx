import { motion } from "framer-motion";
import { chapters } from "../../types/chapters";
import { componentRegistry } from "./PlaceHolders";
import { Suspense } from "react";

export default function ItemView({ id }: { id: string }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <div className="w-full">
        <Suspense fallback={<div className="text-sm opacity-70">Loading…</div>}>
          <div className="w-full overflow-x-auto">
            {componentRegistry[id] ?? <div>Content not found for this chapter.</div>}
          </div>
        </Suspense>
      </div>
    </motion.div>
  );
}
