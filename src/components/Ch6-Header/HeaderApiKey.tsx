import React, { useState } from "react";

export default function HeaderApiKey() {
  const [apiKeyState, setapiKeyState] = useState("");
  const [domainState, setDomainState] = useState<string>("httpbin.org");

  async function init(domain: string = domainState) {
    const items = await getItemData(domain);
    const contentType = items.headers.get("content-type");
    console.log("Content-Type from API:", contentType);

    try {
      const json = await items.json();
      console.log("Response sample:", json);
    } catch {
      const text = await items.text();
      console.log("Response text:", text.slice(0, 200));
    }
  }

  async function getItemData(domain: string) {
    let keyToUse = generateKey();
      setapiKeyState(keyToUse);
    const response = await fetch(`https://${domain}/anything`, {
      method: "GET",
      mode: "cors",
      headers: {
        "X-API-Key": keyToUse,
        "Content-Type": "application/json",
      },
    });
    return response;
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
    <>
      <h2>Header API Key Example</h2>
      <p>API Key: {apiKeyState}</p>
    <p>
      <strong>Example domain:</strong>{" "}
      <code>httpbin.org</code>
      <span style={{ display: "block", color: "#666", fontSize: "0.9em", marginTop: 6 }}>
        This endpoint echoes request headers. For this demo, only <code>httpbin.org</code> is supported.
      </span>
    </p>
      <input type="text" onChange={(e) => setDomainState(e.target.value)} />
      <button onClick={() => init(domainState)}>Fetch Item with API Key</button>
    </>
  );
}
