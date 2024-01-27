import { store } from "@/redux/store";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const state = store.getState();
      if(state.account.loginStatus == false || state.account.token == null){
        Router.push("/");
        toast({
            variant: "destructive",
            title: "Unauthorized",
            description: "You are not authorized to access this page. Please login!!"})
        }
      }
      return React.createElement(WrappedComponent, props);
    }
 
  };
 
withAuth.displayName = "withAuth";
export default withAuth;
