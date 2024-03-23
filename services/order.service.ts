import http from "@/lib/https.utils";

export const getAllOrders = async ({data})=> {
    const res = await http.get("/store/order/", {params: data})
    return res?.data;
}
