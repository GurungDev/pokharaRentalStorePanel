import http from "@/lib/https.utils";

export const getDetails = async () => {
  const res = await http.get("/store/getInfo");
  return res?.data;
};

export const updateStore = async (data) => {
  const res = await http.patch("/store/", data);
  return res?.data;
};
