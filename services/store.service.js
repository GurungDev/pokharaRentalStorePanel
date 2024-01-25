
import http from "@/lib/https.utils";

export const getAllStoreList = async ()=> {
 
    const res = await http.get("/admin/store/")
    
    return res?.data;
}


export const approveStore = async (data)=> {
    console.log(data)
    const res = await http.post(`/admin/store/${data}`)
    
    return res?.data;
}


export const getOneStore = async (data)=> {
 
    const res = await http.get(`/admin/store/${data}`)
    
    return res?.data;
}

export const getStoreCount = async ()=> {
    const res = await http.get(`/admin/store/number`)
    return res?.data;
}