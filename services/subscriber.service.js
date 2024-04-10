import http from "@/lib/https.utils";

export const getAllSubscriber = async ()=> {
    const res = await http.get("/store/subscriber/" )
    return res?.data;
}

export const getSubscriberCount = async ()=> {
    const res = await http.get("/store/subscriber/count" )
    return res?.data;
}

