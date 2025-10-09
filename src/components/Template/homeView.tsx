import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, Button, Typography } from "@mui/material";
import { appConfig } from "../../config/appConfig";

export default function HomeView({ onStart, onOpenCapstone }: { onStart: () => void; onOpenCapstone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <div className="relative mb-6">
        <div className="absolute inset-x-0 -top-8 -z-10 h-24 blur-2xl bg-gradient-to-r from-primary/30 via-purple-600/30 to-primary/30 rounded-full" />
        <Card className="border-primary/20">
          <CardHeader>
            <Typography variant="h4" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">What is this?</Typography>
            <Typography variant="body2">
              A compact, previewable workspace to showcase what I built in each chapter of a React tutorial and how I applied it in a final capstone project.
            </Typography>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                This isn’t a learning tracker. It’s a display of finished components per chapter with a clean way to preview them. Use the Chapters menu or the ribbon to jump around.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={onStart} className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary">Start Chapter 1</Button>
              <Button variant="outlined" onClick={onOpenCapstone} className="border-purple-600 text-purple-600 hover:bg-purple-600/10 focus-visible:ring-2 focus-visible:ring-purple-600">Open Capstone</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-primary/20">
        <CardHeader>
          <Typography variant="h6" className="text-base">Tutorial reference</Typography>
          <Typography variant="body2">Source tutorial and helpful links I followed.</Typography>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <div className="font-medium">{appConfig.tutorial.name}</div>
            {appConfig.tutorial.note && <div className="opacity-70 mt-1">{appConfig.tutorial.note}</div>}
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {appConfig.tutorial.youtube.map((y, i) => (
              <Button
                key={i}
                variant="outlined"
                className="justify-start hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
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