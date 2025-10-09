import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { chapters } from "../../types/chapters";
import { componentRegistry } from "./PlaceHolders";
import { Github } from "lucide-react";
import { Suspense } from "react";

export default function ItemView({ id }: { id: string }) {
  const active = chapters.find((c) => c.id === id)!;
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Typography className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                {active.label}
              </Typography>
              {active.description && (
                <Typography className="mt-1">{active.description}</Typography>
              )}
            </div>
            <div className="flex items-center gap-2">
              {active.href && (
                <Button
                  component="a"
                  href="{active.href}"
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  size="small"
                  className="border-primary text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Github className="mr-2 size-4" /> Repo
                </Button>
              )}
              {active.externalUrl && (
                <Button
                  component="a"
                  href={active.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: "purple.600",
                    "&:hover": { bgcolor: "purple.600", opacity: 0.9 },
                  }}
                >
                  Live
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={<div className="p-6 text-sm opacity-70">Loading…</div>}
          >
            <div className="p-2">{componentRegistry[id]}</div>
          </Suspense>
        </CardContent>
      </Card>
    </motion.div>
  );
}
