import http from "@/lib/https.utils";

export const getAllSubscriber = async ()=> {
    const res = await http.get("/store/subscriber/" )
    return res?.data;
}
