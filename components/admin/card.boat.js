import { deleteABoat } from "@/services/boat.service";
import { toast } from "../ui/use-toast";
import Link from "next/link";

 

const Admin_Card = (props) => {
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
                    console.log(props.id)
                    const deleteBoat = await deleteABoat(props.id);
                    toast({
                      title: "Sucessfully deleted",
                      description: "The boat has been deleted !!"
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

 
              <Link
                href={`/store/boat/${props.id}`}
                className="px-6 py-1 bg-blue-600 text-center rounded text-white ease-in-out duration-[.5s] hover:bg-red-600  shadow mt-2"
              >
                Edit
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Card;
