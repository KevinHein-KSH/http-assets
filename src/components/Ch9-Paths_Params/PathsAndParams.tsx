// PathsAndParams - Chapter 9 page. Rationale in LESSON_PLAN.md §6.4.

import { useState, useMemo } from "react";
import { buildUrl, describeUrl } from "../../utils/urlUtil";
import { generateKey } from "../../utils/serviceUtil";
import { toJsonString } from "../../utils/jsonUtil";
import { DUMMYJSON_BASE, SORT_KEYS, type Resource, METHOD_DOCS, PARAM_DOCS } from "./apiResource";
import usePathsParams from "./hooks/usePathsParams";
import { Stack, TextField, MenuItem, Button, Paper, Typography, Divider, Alert, Chip } from "@mui/material";

export default function PathsAndParams() {
  const [resource, setResource] = useState<Resource | "">("");
  const [itemId, setItemId] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [params, setParams] = useState({
    sortBy: "",
    order: "",
    limit: "",
    skip: "",
    select: "",
    q: ""
  });
  const [apiKey] = useState(() => generateKey()); 

  const segments = !resource ? [] : itemId ? [resource, itemId] : [resource];
  const url = useMemo(() => buildUrl(DUMMYJSON_BASE, segments, params), [resource, itemId, params]);
  const parts = useMemo(() => describeUrl(url), [url]);

  const { data, body, total, loading, error, sendRequest, clear } = usePathsParams();

  const sortKeys = resource ? SORT_KEYS[resource] : [];

  function handleSend() {
    if (!resource) {
      setFormError("Pick a resource first - the path needs at least one segment.");
      return;
    }
    setFormError(null);
    sendRequest(url, apiKey, resource);
  }

  return (
    <> 
      <div>
        <Stack direction="row" spacing={2} marginTop={2} flexWrap="wrap">
          <TextField
            label="Resource"
            value={resource}
            onChange={(e) => {
              setResource(e.target.value as Resource);
              setFormError(null);
            }}
            size="small"
            sx={{ minWidth: 120 }}
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
            sx={{ minWidth: 120 }}
            select
            disabled={sortKeys.length === 0}
          >
            {sortKeys.map((key) => (
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
            sx={{ maxWidth: 200 }}
          />
          <TextField
            label="skip"
            value={params.skip}
            onChange={(e) => setParams({ ...params, skip: e.target.value })}
            size="small"
            sx={{ maxWidth: 200 }}
          />
          <TextField
            label="select"
            value={params.select}
            onChange={(e) => setParams({ ...params, select: e.target.value })}
            size="small"
            sx={{ maxWidth: 200 }}
          />
          <TextField
            label="query (q)"
            value={params.q}
            onChange={(e) => setParams({ ...params, q: e.target.value })}
            size="small"
            sx={{ maxWidth: 200 }}
          />
        </Stack>

        <Paper variant="outlined" sx={{ p: 2, mt: 2 }} className="space-y-2">
          <Typography variant="subtitle2">Composed URL</Typography>
          <code className="break-all">{url}</code>

          <Divider />

          {parts ? (
            <table className="kv">
              <tbody>
                <tr>
                  <td className="key kcol">origin</td>
                  <td>{parts.origin}</td>
                </tr>
                {parts.segments.map((segment, i) => (
                  <tr key={`${segment}-${i}`}>
                    <td className="key kcol">
                      <span className="opacity-50">/</span>
                      segment {i + 1}
                    </td>
                    <td>{segment}</td>
                  </tr>
                ))}
                {parts.params.map((param, i) => (
                  <tr key={param.key}>
                    <td className="key kcol">
                      <span className="opacity-50">{i === 0 ? "?" : "&"}</span>
                      {param.key}
                    </td>
                    <td>{param.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Could not describe this URL.
            </Typography>
          )}
        </Paper>

        <Stack direction="row" spacing={2} marginTop={2}>
          <Button
            variant="contained"
            size="small"
            className="branch-btn"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="branch-btn"
            onClick={() => {
              clear();
              setFormError(null);
            }}
            disabled={loading || (!body && !error && !formError)}
          >
            Clear
          </Button>
        </Stack>

        {formError && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {formError}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {body && (
          <Paper variant="outlined" sx={{ p: 2, mt: 2 }} className="space-y-2">
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography variant="subtitle2">Response</Typography>
              {data.length > 0 ? (
                <>
                  <Chip size="small" label={`${data.length} shown`} />
                  <Chip size="small" variant="outlined" label={`total ${total}`} />
                </>
              ) : (
                <Chip size="small" variant="outlined" label="single item - no list envelope" />
              )}
            </Stack>

            <pre className="max-h-80 overflow-auto text-xs whitespace-pre rounded bg-black/5 p-3">
              {toJsonString(data.length > 0 ? data : body)}
            </pre>
          </Paper>
        )}

        <details className="mt-4">
          <summary className="w-fit cursor-pointer select-none">
            Method Docs
          </summary>
          <pre className="mt-2 overflow-auto text-xs whitespace-pre rounded bg-black/5 p-3">
            {toJsonString(METHOD_DOCS)}
          </pre>
          
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Query parameters
          </Typography>
          <div className="mt-2 overflow-auto text-xs font-mono rounded bg-black/5 p-3">
            <table className="kv">
              <tbody>
                {PARAM_DOCS.map((doc) => (
                  <tr key={doc.param}>
                    <td className="key kcol">{doc.example}</td>
                    <td>{doc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Silent failures
          </Typography>
          <div className="mt-2 overflow-auto text-xs font-mono rounded bg-black/5 p-3">
            Three things this server does silently: <code>?sortBy=nonsense</code> returns 200 with
            unsorted data, <code>/comments</code> ignores sorting entirely, and{" "}
            <code>POST /products</code> returns 404 because it wants <code>/products/add</code>.
          </div>
        </details>
      </div>
    </>
  );
}
