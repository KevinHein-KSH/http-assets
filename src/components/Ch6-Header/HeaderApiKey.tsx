import React, { useState } from "react";
import {
  Paper,
  Button,
  TextField,
  Typography,
  Stack,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Grid
} from "@mui/material";

type CatApiResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export default function HeaderApiKey() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [apiKeyState, setapiKeyState] = useState("");

  // const [domainState, setDomainState] = useState<string>("httpbin.org");
  const [domainState, setDomainState] = useState<string>("api.thecatapi.com");

  const [responseData, setResponseData] = useState<CatApiResponse[] | null>(
    null
  );

  async function init(domain: string = domainState) {
    let keyToUse = generateKey();
    setapiKeyState(keyToUse);

    try {
      setLoading(true);
      setError(null);
      const data = await getItemData(keyToUse, domain);
      setResponseData(data);
      console.log("Fetched data:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setResponseData(null);
    } finally {
      setLoading(false);
    }
  }

  async function getItemData(apiKey: string, domain: string) {
    const res = await fetch(
      `https://${domain}/v1/images/search?limit=1&breed_ids=beng`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "x-api-key": apiKey,
          //  'Content-Type': 'application/json'
          // no Content-Type needed on GET
        },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    debugPeek(res); // for debugging only

    return res.json() as Promise<CatApiResponse[]>;
  }

  async function debugPeek(original: Response) {
    const res = original.clone(); // Use a cloned Response to avoid "body used already" errors
    try {
      const text = await res.text();
      console.log("Sample response (peek):", text.slice(0, 200));
    } catch (e) {
      console.log("Peek failed:", e);
    }
    const contentType = original.headers.get("content-type");
    console.log("Content-Type from API:", contentType);
  }

  function generateKey() {
    const characters = "ABCDEF0123456789";
    let result = "";
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    console.log(result);
    return result;
  }

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, m: 3}}
      className="space-y-2"
    >
    
          <Typography variant="h6">Header API Key Example</Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              API Key:
            </Typography>
            {apiKeyState ? (
              <Chip
                label={apiKeyState}
                color="primary"
                variant="outlined"
                size="small"
              />
            ) : (
              <Chip label="None yet" variant="outlined" size="small" />
            )}
          </Stack>

          <Typography variant="body2">
            <strong>Example domain:</strong> <code>api.thecatapi.com</code>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This endpoint echoes request headers. For this demo, only{" "}
            <code>api.thecatapi.com</code> is supported.
          </Typography>

          <Stack direction="row" spacing={1} className="mt-1">
            <TextField
              label="Domain"
              value={domainState}
              onChange={(e) => setDomainState(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              onClick={() => init(domainState)}
              disabled={!domainState.trim()}
            >
              Fetch Item with API Key
            </Button>
          </Stack>

          {error && (
            <Typography variant="body2" color="error">
              Error: {error}
            </Typography>
          )}

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {responseData &&
            responseData.map((card) => (
              <Card key={card.id} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      id: {card.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dimensions: {card.width} x {card.height}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </Box>
    </Paper>
  );
}
