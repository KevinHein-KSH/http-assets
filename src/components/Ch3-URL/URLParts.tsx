import { useState } from "react";
import { getUrl } from "../../utils/urlUtil";

export default function UrlViewer() {
  const [url, setUrl] = useState<URL | string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  async function handleParse(inputUrl: string) {
    setLoading(true);
    setError(null);
    setUrl(null);

    await delay(1000); // simulate loading

    const parsedUrl = getUrl(inputUrl);
    if (parsedUrl instanceof URL) {
      setUrl(parsedUrl);
      setError(null);
    } else {
      setUrl(null);
      setError("Invalid URL format");
    }
    setLoading(false);
  }

  return (
    <>
      <h2>URL Parts Viewer</h2>

      <p>Use this e.g url: http://dragonslayer:pwn3d@fantasyquest.com:8080/maps?sort=rank#id</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
          handleParse(input);
            }}}
        placeholder="Enter a URL"
        style={{ width: "500px" }}
      />
      <button onClick={() => handleParse(input)} disabled={loading}>
        {loading ? "Parsing..." : "Parse URL"}
      </button>
      <button
        onClick={() => {
          setUrl(null);
          setInput("");
          setError(null);
        }}
        disabled={loading || !(url instanceof URL)}
      >
        Clear
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {url && url instanceof URL && (
        <table className="kv">
          <tbody>
            <tr>
              <td className="key">
                href
              </td>
              <td>{url.href}</td>
            </tr>
            <tr>
              <td className="key">
                protocol
              </td>
              <td>{url.protocol}</td>
            </tr>
            <tr>
              <td className="key">
                host
              </td>
              <td>{url.host}</td>
            </tr>
            <tr>
              <td className="key">
                hostname
              </td>
              <td>{url.hostname}</td>
            </tr>
            <tr>
              <td className="key">
                port
              </td>
              <td>{url.port || "(default)"}</td>
            </tr>
            <tr>
              <td className="key">
                pathname
              </td>
              <td>{url.pathname}</td>
            </tr>
            <tr>
              <td className="key">
                search
              </td>
              <td>{url.search || "(none)"}</td>
            </tr>
            <tr>
              <td className="key">
                hash
              </td>
              <td>{url.hash || "(none)"}</td>
            </tr>
            <tr>
              <td className="key">
                origin
              </td>
              <td>{url.origin}</td>
            </tr>
            <tr>
              <td className="key">
                username
              </td>
              <td>{url.username || "(none)"}</td>
            </tr>
            <tr>
              <td className="key">
                password
              </td>
              <td>{url.password ? "••••••" : "(none)"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}


// add mailto
// remove # and ? in search and hash 
