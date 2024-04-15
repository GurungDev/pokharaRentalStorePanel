import http from "@/lib/https.utils";

export const getAllOrders = async ({data})=> {
    const res = await http.get("/store/order/", {params: data})
    return res?.data;
}

export const getSalesPerDay = async (data)=> {
    const res = await http.get("/store/order/analysis/sales", {params: data})
    return res?.data;
}

export const getOrdersPerDay = async ({data})=> {
    const res = await http.get("/store/order/analysis", {params: data})
    return res?.data;
}
export const getRevenue = async (data)=> {
    const res = await http.get(`/store/revenue`, {params: data})
    return res?.data;
}