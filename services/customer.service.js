
import http from "@/lib/https.utils";

export const getAllCustomerList = async ()=> {
 
    const res = await http.get("/admin/customer/")
    
    return res?.data;
}

export const getOneCustomer = async (data)=> {
 
    const res = await http.get(`/admin/customer/${data}`)
    
    return res?.data;
}

export const getCustomerCount = async ()=> {
    const res = await http.get(`/admin/customer/number`)
    return res?.data;
}