import http from "@/lib/https.utils";

export const getAllBoatList = async ()=> {
    const res = await http.get("/store/boat/")
    return res?.data;
}

export const createABoat = async (data)=> {
    const res = await http.post("/store/boat/", data, {timeout: 10000}) 
    return res?.data;
}

export const deleteABoat = async (data)=> {
    const res = await http.delete(`/store/boat/${data}` )
    return res?.data;
}


export const updateABoat = async (id, data)=> {
 
    const res = await http.patch(`store/boat/${id}`, data, {timeout: 10000})
    return res?.data;
}



export const getOneBoat= async (data)=> {
    const res = await http.get(`store/boat/${data}`)
    return res?.data;
}

export const getBoatCount = async ()=> {
    const res = await http.get(`store/boat/count/store`)
    return res?.data;
}