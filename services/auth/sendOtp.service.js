import http from "@/lib/https.utils";

export const SendOtp = async (data)=> {
    const res = await http.post("/auth/sendOtp", data)
    return res?.data;
}
