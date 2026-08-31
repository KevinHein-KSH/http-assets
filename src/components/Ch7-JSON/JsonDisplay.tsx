// component for chapter 7 JSON
// UI for displaying JSON data in a formatted way json.prase() and JSON.stringify()
// allowing users to copy the JSON data to clipboard as string or as JSON or as file
// showed results and types of result JSON data

import { useState } from "react";
import { isValidJsonObject } from "../../utils/jsonUtil";
import { Tab, Tabs, TextareaAutosize, Button } from "@mui/material";

export default function JsonDisplay() {
  const [inputParsedJson, setInputParsedJson] = useState<string>("");
  const [parsedJsonType, setParsedJsonType] = useState<string>("");
  const [parsedJsonData, setParsedJsonData] = useState<object>();

  const [inputStringifiedJson, setInputStringifiedJson] = useState<string>("");
  const [stringifiedJsonType, setStringifiedJsonType] = useState<string>("");
  const [stringifiedJsonData, setStringifiedJsonData] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [value, setValue] = useState(0);

  function handleParseJson(input: string) {
    setLoading(true);
    let parsedData;
    try {
      parsedData = JSON.parse(input);
      // in case of double-encoded JSON strings or the result is still a string
      if (typeof parsedData === "string") {
        try {
          parsedData = JSON.parse(parsedData);
        } catch {
          parsedData = JSON.parse(JSON.parse(parsedData));
        }
      }
      setParsedJsonData(parsedData);
      setParsedJsonType(typeof parsedData);

      setError(null);
    } catch (err) {
      setError("Invalid JSON string");
      setParsedJsonData({});
      setParsedJsonType("");
    } finally {
      setLoading(false);
    }
  }

  function handleStringifyJson(input: string) {
    setLoading(true);
    try {
      if (isValidJsonObject(input)) {
        const prasedData = JSON.parse(input);
        const stringifiedData = JSON.stringify(prasedData, null, 2);
        setStringifiedJsonData(stringifiedData);
        setStringifiedJsonType(typeof stringifiedData);

        setError(null);
      } else {
        setError("Input is not a valid JSON object");
        setStringifiedJsonData("");
        setStringifiedJsonType("");
      }
    } catch (err) {
      setError("Unable to stringify JSON data");
      setStringifiedJsonData("");
      setStringifiedJsonType("");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    // Handle tab change if needed
    setValue(newValue);
  }

  return (
    <div className="p-4">
      {loading && <div className="text-blue-600 mb-2">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1.5">
        <div className="grid gap-4 block shadow-xl shadow-gray-400/50 inset-shadow-sm inset-shadow-gray-500/50 rounded-lg p-4">
          <div className="flex justify-center">
            <h3 className="text-lg font-medium">Parsing JSON</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div>
                <TextareaAutosize
                  minRows={5}
                  onChange={(e) => setInputParsedJson(e.target.value)}
                  placeholder="Enter JSON data to parse"
                  className="w-full max-w-[300px] border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded p-2"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  className="branch-btn"
                  onClick={() => handleParseJson(inputParsedJson)}
                >
                  Parse JSON
                </Button>
              </div>
            </div>
            <div>
              <div>Data Type after Parse : {parsedJsonType}</div>
              {/* can't display complex objects directly */}
              <div className="whitespace-pre">
                {JSON.stringify(parsedJsonData, null, 2)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 block shadow-xl shadow-gray-400/50 inset-shadow-sm inset-shadow-gray-500/50 rounded-lg p-4">
          <div className="flex justify-center">
            <h3 className="text-lg font-medium">Stringifying JSON</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <TextareaAutosize
                  minRows={5}
                  onChange={(e) => setInputStringifiedJson(e.target.value)}
                  placeholder="Enter JSON data to stringify"
                  className="w-full max-w-[300px] border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded p-2"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  className="branch-btn"
                  onClick={() => handleStringifyJson(inputStringifiedJson)}
                >
                  Stringify JSON
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Data Type after Stringify : {stringifiedJsonType}</div>
              <div>{stringifiedJsonData}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
