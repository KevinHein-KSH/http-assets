// DeleteConfirmDialog - confirmation dialog for deleting a user
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  userName: string;
  onDelete: () => void;
  loading: boolean;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  userName,
  onDelete,
  loading,
}: DeleteConfirmDialogProps) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          {userName && <div>Are you sure you want to delete {userName}?</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="error" onClick={onDelete} disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
