"use client";
import { DialogBox } from "@/components/admin/announcement";
 import withAuth from "@/components/authMiddleware";
import { toast } from "@/components/ui/use-toast";
import { getAllSubscriber } from "@/services/subscriber.service";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function Subscriber() {
  const [rows, setRows] = useState([]);
 
   async function getRows() {
    try {
      let row = await getAllSubscriber();
    
      const updatedRow = row?.data.map((e, index) => {
        return {
          id: e?.user?.id,
          name:  e?.user?.name,
          email:  e?.user?.email,
          phoneNumber:  e?.user?.phoneNumber,
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
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, maxWidth: 90 },
 
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },

    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
    },
  ];

  return (
    <div className="">
      <div className="layout">
      <div className="m-0 m-auto border-b-2 flex justify-between items-center">
          <div>
            <h1 className="text-[1.5rem] text-neutral-800">Subscriber Details</h1>
            <h2 className="text-[.8rem] pb-6 text-neutral-600">
              List of all the Subscribers
            </h2>
          </div>
          <div>
            <DialogBox >
            </DialogBox>
          </div>
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
            
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Subscriber);
