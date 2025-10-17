import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { appConfig } from "../../config/appConfig";

export default function HomeView({
  onStart,
  onOpenCapstone,
}: {
  onStart: () => void;
  onOpenCapstone: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <Card sx={{ m: 2, border: "1px solid rgba(146, 145, 163, 0.2)" }}>
          <CardHeader
            title={
              <Typography
                variant="h4"
                className="!text-3xl bg-clip-text"
              >
                What is this?
              </Typography>
            }
            subheader={
              <Typography variant="body2">
                A compact, previewable workspace…
              </Typography>
            }
          />

          <CardContent className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                This isn’t a learning tracker. It’s a display of finished
                components per chapter with a clean way to preview them. Use the
                Chapters menu or the ribbon to jump around.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                sx={{ bgcolor: "black", color: "white", px: 2 }}
                onClick={onStart}
              >
                Start Chapter 1
              </Button>

              <Button
                variant="outlined"
                color="primary"
                sx={{ mx: 1 }}
              >
                Open Capstone
              </Button>
            </div>
          </CardContent>
        </Card>

      <Card sx={{ m: 2, border: "1px solid rgba(146, 145, 163, 0.2)" }}>
        <CardHeader
          title={
            <Typography variant="h6" className="text-base">
              Tutorial reference
            </Typography>
          }
          subheader="Source tutorial and helpful links I followed."
        />

        <CardContent className="space-y-3">
          <div className="text-sm">
            <div className="font-medium">{appConfig.tutorial.name}</div>
            {appConfig.tutorial.note && (
              <div className="opacity-70 mt-1">{appConfig.tutorial.note}</div>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {appConfig.tutorial.youtube.map((y, i) => (
              <Button
                key={i}
                variant="contained"
                className="flex items-center justify-start"
                component="a"
                href={y.url}
                target="_blank"
                rel="noreferrer"
              >
                {y.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

    </motion.div>
  );
}
