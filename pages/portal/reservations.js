import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// material
import { Box, Card, Container, Grid } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
// atoms
import { userState } from "src/recoil/atoms/auth";
// apis
import { bookingRequestsFetcher } from "src/apis/booking";
// layouts
import DashboardLayout from "src/layouts/dashboard";
// utils
import {
  reservationsTableColumns,
  reservationsTableRowMocker,
} from "src/utils/mockData/reservations";
//
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";

// ----------------------------------------------------------------------

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

// ----------------------------------------------------------------------

function ReservationsPage() {
  const user = useRecoilValue(userState);
  const [isFetching, setIsFetching] = useState(false);
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(async () => {
    if (user) {
      setIsFetching(true);
      await bookingRequestsFetcher("placeOwner", user?.id)
        .then((reservationsResponse) =>
          setReservationsData(reservationsTableRowMocker(reservationsResponse))
        )
        .catch((error) => console.log("portal reservations page", error));
      setIsFetching(false);
    }
  }, [user]);

  return (
    <DashboardLayout>
      <Container>
        <HeaderBreadcrumbs
          heading="Reservations"
          links={[
            { name: "Overview", href: "/portal" },
            { name: "Reservations" },
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid
                  columns={reservationsTableColumns}
                  rows={reservationsData}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  loading={isFetching}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

export default ReservationsPage;
