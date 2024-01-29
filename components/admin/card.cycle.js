 
import { toast } from "../ui/use-toast";
import { deleteACycle } from "@/services/cycle.service";
import { CyclePatchDialogBox } from "./diaglog.cycle.edit";

 

const Admin_Card_Cycle = (props) => {
  const img = props.image;
  return (
    <div className="relative  m-0 mx-auto w-full h-[35vh] overflow-hidden rounded-md">
      <div
        className="card relative w-full h-full hover:scale-110 duration-300"
        style={{
          backgroundImage: ` linear-gradient(rgba(  0,0,0, 0.5), rgba( 0,0,0, 0.3)), url(${img})`,
          backgroundRepeat: " no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="  m-0 mx-auto title w-[90%] text-[1.2rem] text-center pt-40 text-[1.5rem] text-white">
          <h1>{props.name}</h1>
        </div>
        <div className="details absolute bottom-[-110%] duration-300 ease left-0 leading-2   bg-black bg-opacity-70 w-full text-neutral-300">
          <div className="w-[90%] py-6 px-3 text-[.8rem]  m-0 mx-auto">
            <h1 className="text-neutral-100">More Info</h1>
            <p className="leading-[1.1rem] font-light text-neutral-200 ">
              {props.details}
            </p>
            <div className="grid grid-cols-2 gap-10">
              {" "}
              <button
                onClick={async ()=>{
                  try {
               
                    const deleteBoat = await deleteACycle(props.id);
                    toast({
                      title: "Sucessfully deleted",
                      description: "The cycle has been deleted !!"
                    });
                    window.location.reload()
                  } catch (error) {
                    toast({
                      variant: "destructive",
                      title: "Something went wrong",
                      description: error.response?.data?.message || "Couldn't connect to the server",
                    });
                  }
                }}
                className="px-6 py-1 bg-blue-600 rounded text-white ease-in-out duration-[.5s] hover:bg-red-600  shadow mt-2"
              >
                Delete
              </button>
            
                <CyclePatchDialogBox title={props.name} id={props.id}  description={props.details} priceInRs={props.price}/>
            

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Card_Cycle;
