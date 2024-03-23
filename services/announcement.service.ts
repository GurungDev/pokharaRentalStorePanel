import http from "@/lib/https.utils";

export const createAHighlight = async (data)=> {
    const res = await http.post("/store/highlight", data)  
    return res?.data;
}