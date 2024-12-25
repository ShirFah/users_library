// Columns Component
import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const columns = (
  handleEditClick: (user: any) => void,
  handleDeleteClick: (
    id: number,
    title: string,
    fName: string,
    lName: string
  ) => () => void
): GridColDef[] => {
  return [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params: GridRenderCellParams) =>
        `${params.title}, ${params.first} ${params.last}`,
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "location",
      headerName: "Location",
      width: 400,
      valueGetter: (params: GridRenderCellParams) =>
        `${params.city}, ${params.street.name} ${params.street.number}, ${params.country}`,
    },
    {
      field: "picture",
      headerName: "Profile Picture",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.row.picture.large}
          alt="Profile"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {
            handleEditClick(row);
          }}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(
            row.id,
            row.name.title,
            row.name.first,
            row.name.last
          )}
          color="inherit"
        />,
      ],
    },
  ];
};

export default columns;
