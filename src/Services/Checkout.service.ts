import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/checkouts`;

const createCheckout = async (payload) => {
  try {
    const response = await axios.post(baseURL, payload);
    return response.data;
  } catch (error) {
    console.log("Can not Create", error);
    throw error;
  }
};
const getAllCheckouts = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.log("Can not get the Members", error);
    throw error;
  }
};
export { createCheckout, getAllCheckouts };
