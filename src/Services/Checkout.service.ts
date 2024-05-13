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
const deleteCheckouts= async(delId: string)=> {
try{
const response= await axios.delete(`${baseURL}/${delId}`);
return response.data;
}
catch(error){
console.log("Can not deleted...", error);
throw error;
}
};
const returnCheckout= async(rId: string)=> {
  try{
const response= await axios.put(`${baseURL}/${rId}/return`);
return response.data;
  }
  catch(error){
console.log("Can not Occured...", error);
throw error;
  }
};

export { createCheckout, getAllCheckouts, deleteCheckouts, returnCheckout };
