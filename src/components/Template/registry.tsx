import FetchCall from "../Ch1-Fetch_API/FetchCall";
import FetchIPAddress from "../Ch2-DNS/FetchIPAddress";
import URLParts from "../Ch3-URL/URLParts";

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

type ComponentRegistry = Record<string, React.ReactNode>;

export const componentRegistry: ComponentRegistry = {
  "ch-01": <FetchCall />,
  "ch-02": <FetchIPAddress />,
  "ch-03": <URLParts />,
  "ch-04": <Placeholder title="Chapter 4: Forms" />,
  "ch-05": <Placeholder title="Chapter 5: Effects" />,
  "ch-06": <Placeholder title="Chapter 6: Headers" />,
  "ch-07": <Placeholder title="Chapter 7: JSON" />,
  "ch-08": <Placeholder title="Chapter 8: Routing" />,
  "ch-09": <Placeholder title="Chapter 9: Data Fetching" />,
  "ch-10": <Placeholder title="Chapter 10: Testing" />,
  "project-final": <Placeholder title="Capstone Project" />,
};
export default Placeholder;
