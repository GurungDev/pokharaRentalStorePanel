"use client";
import withAuth from "@/components/authMiddleware";
import { toast } from "@/components/ui/use-toast";
import { getAllOrders } from "@/services/order.service";
import { approveStore } from "@/services/store.service";
import { Box, Switch } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function Orders() {
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [rowChanged, setChanged] = useState(false);
  async function getRows() {
    try {
      let row = await getAllOrders({});

      const updatedRow = row.data.map((e, index) => {
        const bookingDate = e?.bookingDate;
        const dateObj = new Date(bookingDate);
        const formattedDate = dateObj.toISOString().split("T")[0];

        return {
          ...e,
          id: e.id,
          title: e?.boat?.title || e?.cycle?.title,
          bookingDate: formattedDate,
          customer_name: e?.customer?.name,
          email: e?.customer?.email,
        };
      });
      setRows(updatedRow);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.data?.message || "Couldn't connect to the server",
      });
    }
  }

  useEffect(() => {
    getRows();
  }, [rowChanged]);

  const columns = [
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "transaction_uuid",
      headerName: "Order ID",
      flex: 1,
      minWidth: 320,
      maxWidth: 320,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      minWidth: 90,
      maxWidth: 90,
    },
    {
      field: "totalPriceInRs",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },

    {
      field: "title",
      headerName: "Listing Name",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },

    {
      field: "priceOfSingleProduct",
      headerName: "Unit Price",
      flex: 0.5,
      minWidth: 90,
      maxWidth: 90,
    },

    {
      field: "bookingDate",
      headerName: "Booking Date",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },

    {
      field: "durationInHour",
      headerName: "Duration In Hour",
      type: "number",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
      minWidth: 90,
      maxWidth: 90,
    },
    // {
    //   field: "is_approved",
    //   headerName: "Is Approved",
    //   type: "actions",
    //   minWidth: 150,
    //   maxWidth: 200,
    //   flex: 1,
    //   renderCell: (params) => {
    //     const data = params.row.id;
    //     const update = async () => {
    //       console.log(params);
    //       try {
    //         const store = await approveStore(data);
    //         setChanged(!rowChanged);
    //         toast({
    //           title: "Successfully updated",
    //         });
    //       } catch (error) {
    //         toast({
    //           variant: "destructive",
    //           title: "Failed",
    //         });
    //       }
    //     };
    //     return (
    //       <Switch
    //         checked={params.row.is_approved}
    //         onChange={() => update()}
    //         inputProps={{ "aria-label": "controlled" }}
    //       />
    //     );
    //   },
    // },

    // {
    //     field: "actions",
    //     headerName: "",
    //     type: "actions",
    //     renderCell: (params) => {
    //       const data = params.id;
    //       const update = async () => {
    //         try {
    //           const store = await approveStore(data );
    //           setChanged(!rowChanged);
    //           toast({
    //             title: "Approved",
    //           });
    //         } catch (error) {
    //           toast({
    //             title: "Failed",

    //           });
    //         }
    //       };
    //       return (
    //         <Box
    //           onClick={() => {
    //               update();
    //           }}
    //           className="btn bg-blue-600 text-white py-2 px-5 rounded"
    //         >
    //           Approve
    //         </Box>
    //       );
    //     },
    //   },
  ];

  return (
    <div className="">
      <div className="layout">
        <div className="m-0 bg-white sticky top-[0vh] z-[10] m-auto border-b-2">
          <h1 className="text-[1.5rem] text-neutral-800">Order Details</h1>
          <h2 className="text-[.8rem] pb-6 text-neutral-600">
            List of all the Orders
          </h2>
        </div>
        <div className="m-initial">
          {" "}
          <Box
            className="h-[50vh] lg:h-[60vh]"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell": {
                outline: "none",
                borderBottom: "1px solid grey",
              },

              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid grey",
                backgroundColor: "rgb(30 64 175)",
                color: "white",
                fontSize: 16,
              },
              "& .MuiDataGrid-virtualScroller": {},
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
              },

              "& .MuiDataGrid-virtualScrollerRenderZone": {
                "& .MuiDataGrid-row": {
                  "&:nth-child(2n)": {
                    backgroundColor: "rgb(239 246 255)",
                  },
                },
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Orders);
