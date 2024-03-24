import http from "@/lib/https.utils";

export const getAllHighlightList = async ({data})=> {
    const res = await http.get("/highlight/", {params: data})
    return res?.data;
}

export const createAHighlight = async (data)=> {
    const res = await http.post("/store/highlight", data)  
    return res?.data;
}

 

export const deleteAHighlight = async (data)=> {
    const res = await http.delete(`/store/highlight/`, {data})
    return res?.data;
}
