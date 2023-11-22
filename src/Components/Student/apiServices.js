import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const token=localStorage.getItem("token")
const id_for_student=localStorage.getItem("id")


export const login = async (data) => {
    try {
      const res = await axios.post('http://137.184.230.216:4000/api/student/login', data);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      console.log(res,'ress');
      localStorage.setItem("id", res.data.otherDetails._id);
      return { token: res.data.token };
    } catch (error) {
      console.error("Error in login:", error);
      return { error: "An error occurred during login" };
    }
  }


  export const useTokenVerification = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(token,);
      
      if (!token) {
        // Token doesn't exist, navigate to the login page
        navigate('/login');
      }
    }, [navigate]);
  };


  export const getActivity = async () => {
    try {
      const response = await axios.get(`http://137.184.230.216:4000/api/activity`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token for authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in studentbyid:", error);
      throw new Error("Failed to fetch student: " + error.response.data.message);
    }
  }

  export const forgetPassword = async (requestData) => {
    try {
      const response = await axios.post(`http://137.184.230.216:4000/api/resetpassword`,requestData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token for authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in studentbyid:", error);
      throw new Error("Failed to fetch student: " + error.response.data.message);
    }
  }


  export const resetPassword = async (requestData) => {
    try {
      const response = await axios.post(`http://137.184.230.216:4000/api/resetpassword/reset`,requestData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token for authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in studentbyid:", error);
      throw new Error("Failed to fetch student: " + error.response.data.message);
    }
  }


  export const Answer = async (requestData) => {
    try {
      const response = await axios.post(`http://137.184.230.216:4000/api/activity/answer`,requestData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token for authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in studentbyid:", error);
      throw new Error("Failed to fetch student: " + error.response.data.message);
    }
  }


  export const UpdatedData = async (requestData) => {
    try {
      const response = await axios.put(`http://137.184.230.216:4000/api/student/${id_for_student}`,requestData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token for authorization
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in studentbyid:", error);
      throw new Error("Failed to fetch student: " + error.response.data.message);
    }
  }

  
 
  
 

  export const studentbyid = async () => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/student/${id_for_student}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in studentbyid:", error);
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
}

export const AttendenceByCount = async () => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/attendance/counts`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in studentbyid:", error);
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
}

export const getattendencebyid = async () => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/attendance/student`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in studentbyid:", error);
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
}

export const AttendenceByCountfilter = async (stdate,enddate) => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/attendance/counts?startDate=${stdate}&endDate=${enddate}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in studentbyid:", error);
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
}






export const notificationbyId = async () => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/notification`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in studentbyid:", error);
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
}
  



export const postAttendance = async ({isPresent,assignedTrainersRef,isDate,_id}) => {


  let newData = {
    courseRef:_id,
    trainerRef:assignedTrainersRef,
    studentRef:id_for_student,
    isPresent,
    isDate

  }

  const apiUrl = 'http://137.184.230.216:4000/api/attendance'; // Replace with your actual API endpoint

  try {
    const response = await axios.post(apiUrl, newData, {
      headers: {
        'Content-Type': 'application/json', // Adjust the content type if needed
        'Authorization': `Bearer ${token}` 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
};





export const getAttendance = async (date,course_id) => {




  const apiUrl = `http://137.184.230.216:4000/api/attendance/${course_id}?${date}`; // Replace with your actual API endpoint

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json', // Adjust the content type if needed
        'Authorization': `Bearer ${token}` 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch student: " + error.response.data.message);
  }
};



