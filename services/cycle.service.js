import http from "@/lib/https.utils";

export const getAllcycleList = async () => {
  const res = await http.get("/store/cycle/");
  return res?.data;
};

export const createAcycle = async (data) => {
  const res = await http.post("/store/cycle/", data, { timeout: 10000});
  return res?.data;
};

export const updateAcycle = async (id, data) => {
  const res = await http.patch(`store/cycle/${id}`, data);
  return res?.data;
};

export const deleteACycle = async (data) => {
  const res = await http.delete(`/store/cycle/${data}`);
  return res?.data;
};

export const getOnecycle = async (data) => {
  const res = await http.get(`store/cycle/${data}`);
  return res?.data;
};

export const getcycleCount = async () => {
  const res = await http.get(`store/cycle/count/store`);
  return res?.data;
};
