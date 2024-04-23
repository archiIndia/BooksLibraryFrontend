import axios from "axios";

const baseURl = `${import.meta.env.VITE_BACKEND_URL}/members`;
const createMembers = async (
  firstName: string,
  lastName: string,
  email: string,
  memberType: string,
  gender: string,
  contact: string,
  dob: string,
  join_date: string
) => {
  try {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      member_type: memberType,
      gender: gender,
      contact_number: contact,
      dob: dob,
      join_date: join_date,
    };
    const Response = await axios.post(baseURl, payload);
    return Response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
const getallMembers = async () => {
  try {
    const response = await axios.get(baseURl);
    return response.data;
  } catch (error) {
    console.log("Can not get the Members");
    throw error;
  }
};
const getoneMember = async (fId: string) => {
  try {
    const response = await axios.get(`${baseURl}/${fId}`);
    return response.data;
  } catch (error) {
    console.log("Can not find the Member");
    throw error;
  }
};
const deleteMember = async (delId: string) => {
  try {
    const response = await axios.delete(`${baseURl}/${delId}`);
    return response.data;
  } catch (error) {
    console.log("Can not delete Members");
    throw error;
  }
};
const updateMembers = async (
  firstName: string,
  lastName: string,
  email: string,
  memberType: string,
  gender: string,
  contact: string,
  dob: string,
  join_date: string
) => {
  try {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      member_type: memberType,
      gender: gender,
      contact_number: contact,
      dob: dob,
      join_date: join_date,
    };
    const Response = await axios.put(baseURl, payload);
    return Response.data;
  } catch (error) {
    console.log("Can not Update", error);
    throw error;
  }
};

export { createMembers, getallMembers, getoneMember, deleteMember, updateMembers };
