import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { User } from "./types";

interface AddUserFormProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
  onEditUser: (user: User) => void;
  user: User | null;
  rows: any[];
}

const AddUser: React.FC<AddUserFormProps> = ({
  open,
  onClose,
  onAddUser,
  onEditUser,
  user,
  rows,
}) => {
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
    country: "",
    picture: "",
  });

  useEffect(() => {
    if (!open) {
      setErrors({ firstName: "", lastName: "", email: "" });
    }
  }, [open]);

  useEffect(() => {
    if (user) {
      setFormData({
        title: user.name.title,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        city: user.location.city,
        street: user.location.street.name,
        country: user.location.country,
        picture: user.picture.thumbnail,
      });
    } else {
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        street: "",
        country: "",
        picture: "",
      });
    }
  }, [user]);

  const isFormValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(formData).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if ((name === "firstName" || name === "lastName") && value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${
          name === "firstName" ? "First Name" : "Last Name"
        } must be at least 3 characters.`,
      }));
    } else if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email address.",
        }));
      } else {
        const emailExists = rows.some((row) => row.email === value);
        console.log("Email exists:", emailExists);
        if (emailExists) {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already in use.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }
    if (
      !formData.title ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.city ||
      !formData.street ||
      !formData.country ||
      !formData.picture
    ) {
      alert("All fields are required!");
      return;
    }
    const newId = rows.length + 1;
    const newUser: User = {
      id: user ? user.id : newId,
      name: {
        title: formData.title,
        first: formData.firstName,
        last: formData.lastName,
      },
      email: formData.email,
      location: {
        city: formData.city,
        street: formData.street,
        country: formData.country,
      },
      picture: formData.picture,
    };

    if (user) {
      onEditUser(newUser);
    } else {
      onAddUser(newUser);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center" }}>
        {user ? "Edit User" : "Add User"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={Boolean(user)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Profile Picture URL"
              name="picture"
              value={formData.picture}
              onChange={handleInputChange}
              disabled={Boolean(user)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit} color="primary">
          {user ? "Save Changes" : "Add User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
