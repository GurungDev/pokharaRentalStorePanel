import http from "@/lib/https.utils";

export const getAllHighlightList = async ({data})=> {
    const res = await http.get("/highlight/", {params: data})
    return res?.data;
}

export const createAHighlight = async (data)=> {
    const res = await http.post("/store/highlight", data)  
    return res?.data;
}

export const updateAHighlight = async (id, data)=> {
    const res = await http.patch(`/highlight/${id}`, data)
    return res?.data;
}

export const deleteAHighlight = async (data)=> {
    const res = await http.delete(`/highlight/${data}`)
    return res?.data;
}
