// Get/ Fetch
// fetch call usinng URL and apiKey parameters
// in header Get method
// use cros as mode
// add X-API-KEY in header

// Post/ Create
// 1. Take URL and data as parameters
// 2. call fetch
// 2.1 use Post method (Create)
// 2.2 use cros as mode
// 2.3 add X-API-KEY in header, with apiKey parameter
// 2.4 add Content-Type application/json in header as its value
// 2.5 add body as JSON.stringify(data)
// 3. return response as json

// status code practice
// 1. use example like find a user by id
// 2. if user found return 200 with user data
// 3. if user not found return 404 with message user not found
// 4. if server error return 500 with message server error

// PUT request to update user data
// since it is update, it should be able to send requests safely multiple times
// 1. use PUT request to update user data, content-type application/json
// 1.1 retrieve that with GET request, use apiKey in both requests
// both return a promise that resolves to the response body
// use fullURL for url built with baseURL and id.

// DELETE request to delete user by id

import { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import UserToolbar from "./UserToolbar";
import UserFormDialog from "./UserFormDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useHttpMethods } from "./hooks/useHttpMethods";
import { generateKey, splitName } from "../../utils/serviceUtil";
import { User, UserResp } from "../../types/user";
import { emptyUser } from "./types";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowParams,
} from "@mui/x-data-grid";

const paginationModel = { page: 0, pageSize: 5 };

export default function HttpMethods() {
  const [form, setForm] = useState<User>(emptyUser); // POST request form data

  const [userId, setUserId] = useState<number | null>(null);

  const [editRowDialog, setEditRowDialog] = useState(false);

  const [deleteRowDialog, setDeleteRowDialog] = useState(false);

  const [createUserDialog, setCreateUserDialog] = useState(false);

  const {
    data,
    loading,
    error,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    clear,
  } = useHttpMethods(); // custom hook for HTTP methods

  const [apiKey] = useState(() => generateKey()); // runs once, on mount
  const url = "https://dummyjson.com/users"; // Replace with your actual API endpoint

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "Email", width: 250 },
      {
        field: "password",
        headerName: "Password",
        width: 200,
        sortable: false,
        renderCell: (params) => "********",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 120,
        sortable: false,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleEditRowClick(params);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              setDeleteRowDialog(true);
              setUserId(params.id as number);
            }}
          />,
        ],
      },
    ],
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: User) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleEditRowClick(params: GridRowParams<UserResp>) {
    const userToEdit = params.row;
    if (userToEdit) {
      setForm({
        id: userToEdit.id,
        firstName: splitName(userToEdit.name).firstName,
        lastName: splitName(userToEdit.name).lastName,
        email: userToEdit.email,
        password: userToEdit.password,
      });
      setUserId(userToEdit.id);
      setEditRowDialog(true);
    }
  }

  return (
    <>
      <div>
        {/* Fetch/Get */}
        <UserToolbar
          onFetch={() => getUsers(url, apiKey)}
          onClear={clear}
          onCreate={() => {
            setCreateUserDialog(true);
            setForm(emptyUser);
          }}
          loading={loading}
          error={error}
          canCreate={data.length > 0}
        />

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            className="[&_.MuiDataGrid-columnHeaders]:border-t-2 [&_.MuiDataGrid-columnHeaders]:border-gray-200"
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />

          {/* Create User Dialog */}
          <UserFormDialog
            open={createUserDialog}
            onClose={() => setCreateUserDialog(false)}
            title="Create User"
            submitLabel="Create"
            form={form}
            handleChange={handleChange}
            onAction={async () => {
              const success = await createUser(url, apiKey, form);
              if (success) setCreateUserDialog(false);
            }}
            error={error}
            loading={loading}
          />

          {/* Edit User Dialog */}
          <UserFormDialog
            open={editRowDialog}
            onClose={() => setEditRowDialog(false)}
            title="Edit User"
            submitLabel="Update"
            form={form}
            handleChange={handleChange}
            onAction={async () => {
              const success = await updateUser(
                url,
                apiKey,
                userId as number,
                form,
              );
              if (success) setEditRowDialog(false);
            }}
            error={error}
            loading={loading}
          />

          {/* Delete User Dialog */}
          <DeleteConfirmDialog
            open={deleteRowDialog}
            onClose={() => setDeleteRowDialog(false)}
            userName={
              data.find((user) => user.id === userId)?.name || "this user"
            }
            onDelete={async () => {
              const success = await deleteUser(url, apiKey, userId as number);
              if (success) setDeleteRowDialog(false);
            }}
            loading={loading}
          />
        </Paper>
      </div>
    </>
  );
}
