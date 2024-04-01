import http from "@/lib/https.utils";

export const createANotification = async (data)=> {
    const res = await http.post("/store/notification", data)  
    return res?.data;
}