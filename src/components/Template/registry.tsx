import FetchCall from "../Ch1-Fetch_API/FetchCall";
import FetchIPAddress from "../Ch2-DNS/FetchIPAddress";
import URLParts from "../Ch3-URL/URLParts";
import Ch3URLNote from "../Ch3-URL/Readme.md?raw";
import AsyncDemo from "../Ch4-Async/AsyncDemo";
import Ch4Async from "../Ch4-Async/Readme.md?raw";
import ErrorDemo from "../Ch5-Errors/ErrorDemo";
import Ch5Errors from "../Ch5-Errors/Readme.md?raw";
import HeaderApiKey from "../Ch6-Header/HeaderApiKey";
import JsonDisplay from "../Ch7-JSON/JsonDisplay";
import HttpMethods from "../Ch8-HTTP_Methods/HttpMethods";
import PathsAndParams from "../Ch9-Paths_Params/PathsAndParams";
import Ch9PathsNote from "../Ch9-Paths_Params/Readme.md?raw";

const Placeholder = ({ title }: { title: string }) => (
  <div className="prose prose-sm dark:prose-invert max-w-none">
    <h2 className="mb-2">{title}</h2>
    <p className="opacity-80">
      Replace this with your real component by editing{" "}
      <code>componentRegistry</code>.
    </p>
    <ul className="list-disc ml-5">
      <li>Keep each chapter focused (one concept per component).</li>
      <li>Use small, clear props to demonstrate behaviors.</li>
      <li>Link the source in the header if relevant.</li>
    </ul>
  </div>
);

type ChapterContent = {
  home: React.ReactNode;
  note?: string;
};

type ComponentRegistry = Record<string, ChapterContent>;

export const componentRegistry: ComponentRegistry = {
  "ch-01": { home: <FetchCall /> },
  "ch-02": { home: <FetchIPAddress /> },
  "ch-03": { home: <URLParts />, note: Ch3URLNote },
  "ch-04": { home: <AsyncDemo />, note: Ch4Async },
  "ch-05": { home: <ErrorDemo />, note: Ch5Errors },
  "ch-06": { home: <HeaderApiKey /> },
  "ch-07": { home: <JsonDisplay /> },
  "ch-08": { home: <HttpMethods /> },
  "ch-09": { home: <PathsAndParams />, note: Ch9PathsNote },
  "ch-10": { home: <Placeholder title="Chapter 10: Testing" /> },
  "project-final": { home: <Placeholder title="Capstone Project" /> },
};

export const getChapterContent = (id: string) => componentRegistry[id];

export default Placeholder;
