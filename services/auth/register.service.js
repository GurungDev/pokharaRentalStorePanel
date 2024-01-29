import http from "@/lib/https.utils";

export const RegisterStore = async (data)=> {
 
    const res = await http.post("/auth/register/store", data)
    
    return res?.data;
}
