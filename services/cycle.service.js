import http from "@/lib/https.utils";

export const getAllcycleList = async ()=> {
 
    const res = await http.get("/store/cycle/")
    
    return res?.data;
}

export const createAcycle = async (data)=> {
 
    const res = await http.post("/store/cycle/", data)
    
    return res?.data;
}

export const updateAcycle = async (data)=> {
 
    const res = await http.patch(`store/cycle/${data}`)
    
    return res?.data;
}



export const getOnecycle= async (data)=> {
 
    const res = await http.get(`store/cycle/${data}`)
    
    return res?.data;
}

export const getcycleCount = async ()=> {
    const res = await http.get(`store/cycle/count/store`)
    return res?.data;
}