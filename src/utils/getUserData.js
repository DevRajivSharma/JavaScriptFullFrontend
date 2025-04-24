import axios from "axios";
export const getUserData = async () => {
  try {
    const response = await axios.get('/api/user/getCurrentUser');
    return response.data; 
  }
  catch (error) {
    console.error(error);
    return null; 
  }
}