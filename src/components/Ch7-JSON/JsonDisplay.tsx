// component for chapter 7 JSON
// UI for displaying JSON data in a formatted way json.prase() and JSON.stringify()
// allowing users to copy the JSON data to clipboard as string or as JSON or as file
// showed results and types of result JSON data

import { useState} from "react";
import { Paper, Typography, TextareaAutosize, Button } from "@mui/material";

export default function JsonDisplay() {
  const [inputParsedJson, setInputParsedJson] = useState<string>("");
  const [parsedJsonType, setParsedJsonType] = useState<string>("");
  const [parsedJsonData, setParsedJsonData] = useState<object>({});
  const [toJsonData, setToJsonData] = useState<string>("");

  const [inputStringifiedJson, setInputStringifiedJson] =
    useState<object | unknown>();
  const [stringifiedJsonType, setStringifiedJsonType] =
    useState<string>("");
  const [stringifiedJsonData, setStringifiedJsonData] =
    useState<string>("");
  const [toStringData, setToStringData] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Accepts either a JSON string or a JS value, and returns a object/array/etc
function toJson(input: string | unknown): unknown {
  if (typeof input === "string") {
    return JSON.parse(input); // may throw → caller handles try/catch
  }
  return input;
}

// Accepts either an object/array/etc and returns a pretty JSON string
function toString(input: string | unknown): string {
  const value =
    typeof input === "string" ? JSON.parse(input) : input;
  return JSON.stringify(value, null, 2);
}


  function handleParseJson() {
    setLoading(true);
    try {
      const parsedData = JSON.parse(inputParsedJson);
      setParsedJsonData(parsedData);
      setParsedJsonType(typeof parsedData);
      console.log(parsedJsonType);
      
      setError(null);
    } catch (err) {
      setError("Invalid JSON string");
      setParsedJsonData({});
      setParsedJsonType("");
    } finally {
      setLoading(false);
    }
  }

  function handleStringifyJson() {
    setLoading(true);
    try {
      const stringifiedData = JSON.stringify(inputStringifiedJson, null, 2);
      setStringifiedJsonData(stringifiedData);
      console.log(stringifiedJsonData);
      setStringifiedJsonType(typeof stringifiedData);
      setError(null);
    } catch (err) {
      setError("Unable to stringify JSON data");
      setStringifiedJsonData("");
      setStringifiedJsonType("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper sx={{ p: 2, m: 3 }} className="space-y-2">
      <Typography variant="h6">Chapter 7: Working with JSON Data </Typography>

      <div className="grid grid-cols-2 gap-2 pt-1.5">
        <div className="grid gap-4">
          <div className="flex justify-center">
            <h3 className="text-lg font-medium">Parsing JSON</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>
                <TextareaAutosize
                  minRows={5}
                  onChange={(e) => setInputParsedJson(e.target.value)}
                  placeholder="Enter JSON string to parse"
                  className="w-[300px] border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded p-2"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  onClick={() => handleParseJson(inputParsedJson)}
                >
                  Parse JSON
                </Button>
              </div>
            </div>
            <div>
              <div>Data Type after Parse : {parsedJsonType}</div>
              {/* <div>{parsedJsonData}</div> */}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex justify-center">
            <h3 className="text-lg font-medium">Stringifying JSON</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <TextareaAutosize
                  minRows={5}
                  onChange={(e) => setInputStringifiedJson(e.target.value)}
                  placeholder="Enter JSON data to stringify"
                  className="w-[300px] border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded p-2"
                />
              </div>
              <div className="flex justify-end">
                <Button variant="contained" onClick={() => handleStringifyJson()}>Stringify JSON</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Data Type after Stringify : {stringifiedJsonType}</div>
              <div>{stringifiedJsonData}</div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
