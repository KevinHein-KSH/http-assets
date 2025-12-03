// component for chapter 7 JSON
// UI for displaying JSON data in a formatted way json.prase() and JSON.stringify()
// allowing users to copy the JSON data to clipboard as string or as JSON or as file
// showed results and types of result JSON data

import React from "react";
import { Paper, Typography, TextareaAutosize, Button } from "@mui/material";

export default function JsonDisplay() {
  return (
    <Paper sx={{ p: 2, m: 3 }} className="space-y-2">
      <Typography variant="h6">Chapter 7: Working with JSON Data </Typography>
      <h3 className="text-lg font-medium">Parsing JSON</h3>
      {/* //textarea for user to input JSON string                
                //button to parse JSON string
                //display parsed JSON data in formatted way
                //show type of parsed data and prased JSON data (object, array, etc.) */}
        <TextareaAutosize
            minRows={5}
            className="w-[300px] border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded p-2"
        />
        <Button variant="contained">
            Parse JSON
        </Button>

      <h3 className="text-lg font-medium">Stringifying JSON</h3>
      {/* //textarea for user to input JSON data (object, array, etc.)
                //button to stringify JSON data
                //display stringified JSON data
                //show type of stringified data (string) */}
        <TextareaAutosize
            minRows={5}
            className="w-[300px] border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded p-2"
        />
        <Button variant="contained">
            Stringify JSON
        </Button>
    </Paper>
  );
}
