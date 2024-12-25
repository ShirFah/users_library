"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CircularProgress, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { User } from "./types";
import { fetchUserData } from "./getData";
import columns from "./userData";
import AddUser from "./addUser";
import CustomToolbar from "./toolBar";
import ErrorMessage from "./errorMessage";

export default function Home() {
  const [data, setData] = useState<User[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<{
    title: string;
    fName: string;
    lName: string;
  } | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await fetchUserData();
        const initialRows = userData.map((user: any, index: any) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          location: user.location,
          picture: user.picture,
        }));
        setData(userData);
        setRows(initialRows);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    handleOpen();
  };

  const handleDeleteClick =
    (id: number, title: string, fName: string, lName: string) => () => {
      console.log("Deleting user with ID:", id);
      setDeleteId(id);
      setSelectedUser({ title, fName, lName });
      setOpenConfirm(true);
    };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      const updatedRows = rows.filter((row) => row.id !== deleteId);
      setRows(updatedRows);
    }
    setSelectedUser(null);
    setOpenConfirm(false);
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setOpenConfirm(false);
  };

  const handleAddUser = (newUser: User) => {
    setRows([...rows, newUser]);
    setEditingUser(null);
  };

  const handleEditUser = (editedUser: User) => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.id === editedUser.id) {
          return {
            ...row,
            name: editedUser.name,
            email: editedUser.email,
            location: editedUser.location,
            picture: editedUser.picture,
          };
        }
        return row;
      });
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <div>
      <AddUser
        open={open}
        onClose={handleClose}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        user={editingUser}
        rows={rows}
      />

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid item xs={12} md={8}>
          <CustomToolbar onAddUserClick={handleOpen} />
          <div
            style={{
              height: 500,
              width: "95%",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns(handleEditClick, handleDeleteClick)}
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>

      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete:{" "}
            {selectedUser &&
              ` ${selectedUser.title} ${selectedUser.fName} ${selectedUser.lName}`}
            ?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
