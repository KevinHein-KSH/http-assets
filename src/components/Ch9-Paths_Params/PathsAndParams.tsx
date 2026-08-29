// PathsAndParams - Chapter 9 page. Rationale in LESSON_PLAN.md §6.4.

import { useState, useMemo } from "react";
import { buildUrl, describeUrl } from "../../utils/urlUtil";
import { generateKey } from "../../utils/serviceUtil";
import { DUMMYJSON_BASE, SORT_KEYS, type Resource, METHOD_DOCS } from "./apiResource";
import usePathsParams from "./hooks/usePathsParams";
import { Stack,TextField, MenuItem } from "@mui/material";

export default function PathsAndParams() {
  const [resource, setResource] = useState<Resource>("products");
  const [itemId, setItemId] = useState<string>("");
  const [params, setParams] = useState({
    sortBy: "",
    order: "",
    limit: "",
    skip: "",
    select: "",
    q: ""
  });
  const [apiKey] = useState(() => generateKey()); 

  const segments = itemId ? [resource, itemId] : [resource];
  const url = useMemo(() => buildUrl(DUMMYJSON_BASE, segments, params), [resource, itemId, params]);
  const parts = useMemo(() => describeUrl(url), [url]);

  const { data, total, loading, error, sendRequest, clear } = usePathsParams();

  return (
    <> 
      <div>
        <Stack direction="row" spacing={2} marginTop={2} flexWrap="wrap">
          <TextField
            label="Resource"
            value={resource}
            onChange={(e) => setResource(e.target.value as Resource)}
            size="small"
            select
          >
            {Object.keys(SORT_KEYS).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            size="small"
          />
        </Stack>

        <Stack direction="row" spacing={2} flexWrap="wrap" marginTop={2}>
          <TextField
            label="sortBy"
            value={params.sortBy}
            onChange={(e) => setParams({ ...params, sortBy: e.target.value })}
            size="small"
            sx={{ minWidth: 90 }}
            select
            disabled={SORT_KEYS[resource].length === 0}
          >
            {SORT_KEYS[resource].map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="order"
            value={params.order}
            onChange={(e) => setParams({ ...params, order: e.target.value })}
            size="small"
            sx={{ minWidth: 90 }}
            select
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
          <TextField
            label="limit"
            value={params.limit}
            onChange={(e) => setParams({ ...params, limit: e.target.value })}
            size="small"
          />
          <TextField
            label="skip"
            value={params.skip}
            onChange={(e) => setParams({ ...params, skip: e.target.value })}
            size="small"
          />
          <TextField
            label="select"
            value={params.select}
            onChange={(e) => setParams({ ...params, select: e.target.value })}
            size="small"
          />
          <TextField
            label="query (q)"
            value={params.q}
            onChange={(e) => setParams({ ...params, q: e.target.value })}
            size="small"
          />
        </Stack>

        <Stack direction="row" spacing={2} marginTop={2}>
          <div style={{ fontFamily: "monospace" }}>{url}</div>
        </Stack>

        <Stack direction="row" spacing={2} marginTop={2}>
          {parts && (
            <table>
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Path Segments</th>
                  <th>Query Params</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parts.origin}</td>
                  <td>{parts.segments.join("/")}</td>
                  <td>{parts.params.map((p) => `${p.key}=${p.value}`).join("&")}</td>
                </tr>
              </tbody>
            </table>
          )}
        </Stack>

        <Stack direction="row" spacing={2} marginTop={2}>
          <button onClick={() => sendRequest(url, apiKey, resource)} disabled={loading}>
            Send Request
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Stack>

        <Stack direction="row" spacing={2} marginTop={2}>
          <div>Results: {JSON.stringify(data)}</div>
          <div>Total: {total}</div>
        </Stack>

        <details>
          <summary>Method Docs</summary>
          <pre>{JSON.stringify(METHOD_DOCS, null, 2)}</pre>
        </details>
      </div>
    </>
  );
}
