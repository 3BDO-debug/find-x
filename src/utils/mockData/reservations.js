import _ from "lodash";
import { Avatar, Button, Stack, Typography } from "@mui/material";

export const reservationsTableColumns = [
  { field: "id", headName: "ID", width: 50 },
  {
    field: "userAvatar",
    headerName: "Photo",
    disableExport: true,
    width: 100,
    renderCell: (params) => <Avatar />,
  },
  {
    field: "fullname",
    headName: "Full name",
    minWidth: 150,
    renderCell: (params) => (
      <Typography sx={{ ml: 2 }} variant="subtitle2">
        Full name here
      </Typography>
    ),
  },
  { field: "phone", headName: "Phone" },
  { field: "email", headerName: "Email", minWidth: 150 },
  { field: "notes", headerName: "Notes", flex: 1 },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 250,
    disableExport: true,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center">
        <Button variant="outlined" color="error">
          Cancel request
        </Button>
        <Button sx={{ ml: 2 }} variant="contained">
          Proceed request
        </Button>
      </Stack>
    ),
  },
];

export const reservationsTableRowMocker = (data) => {
  const mockedData = _.map(data, (row) => ({
    id: row.id,
    userAvatar: row.user_avatar,
    fullname: row.user_fullname,
    phone: row.user_phone,
    email: row.user_email,
    notes: row.notes,
    action: row.id,
  }));

  return mockedData;
};
