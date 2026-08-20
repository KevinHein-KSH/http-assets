// UserToolbar - action buttons (Fetch, Clear, Create) and error display
import React from "react";
import { Button } from "@mui/material";

type UserToolbarProps = {
    onFetch: () => void;
    onClear: () => void;
    onCreate: () => void;
    loading: boolean;
    error: string | null;
    canCreate: boolean;
};

export default function UserToolbar({
  onFetch,
  onClear,
  onCreate,
  loading,
  error,
  canCreate
}: UserToolbarProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full px-1 my-4">
        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            color="secondary"
            className="mr-2"
            onClick={onFetch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch User"}
          </Button>

          <Button
            variant="outlined"
            className="branch-btn"
            onClick={onClear}
            disabled={loading}
          >
            Clear
          </Button>
          {error && <div className="text-red-500 mt-2">Error: {error}</div>}
        </div>

        <div className="ml-auto">
          <Button
            variant="contained"
            color="secondary"
            onClick={onCreate}
            disabled={loading || !canCreate}
          >
            Create User
          </Button>
        </div>
      </div>
    </>
  );
}
