import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CustomToolbarProps {
  onAddUserClick: () => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onAddUserClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#fff",
        width: "95%",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontFamily: "system-ui",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Users Library
      </div>
      <Button
        sx={{ backgroundColor: "#f5f5f5", color: "black" }}
        variant="contained"
        color="primary"
        onClick={onAddUserClick}
        style={{
          borderRadius: "8px",
          padding: "6px 12px",
          fontSize: "14px",
        }}
      >
        Add User
        <AddIcon sx={{ marginLeft: "8px", width: "18px", height: "18px" }} />
      </Button>
    </div>
  );
};

export default CustomToolbar;
