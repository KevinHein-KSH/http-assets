// UserFormDialog - reusable dialog for Create and Edit user forms
import React from "react";
import { User } from "../../types/user"; // Import the User type from your types file
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

type UserFormDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
  form: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAction: () => void;
  error: string | null;
  loading: boolean;
};

export default function UserFormDialog({
  open,
  onClose,
  title,
  submitLabel,
  form,
  handleChange,
  error,
  loading,
  onAction,
}: UserFormDialogProps) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {error && <div className="text-red-500 mb-2">Error: {error}</div>}
          <div className="flex gap-2">
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              name="firstName"
              value={form.firstName || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              name="lastName"
              value={form.lastName || ""}
              onChange={handleChange}
            />
          </div>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            name="password"
            value={form.password || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => onAction()} disabled={loading}>
            {submitLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
