import React from "react";
import { Box, Card, Button } from "@mui/material";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
      }}
    >
      <Card
        sx={{
          padding: 3,
          maxWidth: 400,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        }}
      >
        <h2>Error</h2>
        <p>{message}</p>
        {onRetry && (
          <Button
            variant="contained"
            color="error"
            onClick={onRetry}
            sx={{ marginTop: 2 }}
          >
            Retry
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default ErrorMessage;
