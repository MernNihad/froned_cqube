import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://137.184.230.216:4000/api/";





  const token = localStorage.getItem("token")

//verification
export const useTokenVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Token doesn't exist, navigate to the login page
      navigate('/adminlogin');
    }
  }, [navigate]);
};




// login section
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`http://137.184.230.216:4000/api/auth/login`, email,  password );
    localStorage.setItem("token", response?.data?.token);
    localStorage.setItem("id", response?.data?.otherDetails?._id);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};






//  create branch
export const createBranch = async (name) => {
  try {
    const response = await axios.post(
      "http://137.184.230.216:4000/api/branch",
      {name},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// view all branchs
export const getAllBranches = async () => {
  try {
    const response = await axios.get("http://137.184.230.216:4000/api/branch");
    return response.data.result;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// delete branch
export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`http://137.184.230.216:4000/api/branch/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//branch api end





export const viewbranch = async () => {
  try {
    const response = await axios.get("http://137.184.230.216:4000/api/branch", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};



// ------------------------


//studennt

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(
      "http://137.184.230.216:4000/api/student/register",
      studentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.authorization);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};

//student get
export const getStudent = async () => {
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/student?status=true",
      
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStudentbyid = async (id) => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/student/${id}`,
      
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//update student

export const updateStudentById = async (studentId, updatedStudentData) => {
  try {
    const response = await axios.put(
      `http://137.184.230.216:4000/api/student/${studentId}`,
      updatedStudentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const Addnotification = async (data) => {
  try {
    console.log(data,'kjiuhgy');
    const response = await axios.post(
      `http://137.184.230.216:4000/api/notification`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const getnotification = async () => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/notification`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const deletenotification = async (id) => {
  try {
    const response = await axios.delete(
      `http://137.184.230.216:4000/api/notification/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};



export const deleteStudentById = async (studentId) => {
  try {
    const response = await axios.delete(
      `http://137.184.230.216:4000/api/student/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete student: " + error.message);
  }
};



//----------------------counts
export const getCountOfSubCourse = async () => {
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/counts/subcoursecount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};

//----------------------counts
export const getCountOfstudent = async () => {
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/counts/studentcount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};


//----------------------counts
export const getCountOftrainer = async () => {
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/counts/trainercount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};

//student count by course
export const studentCountbyCourse = async () => {
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/counts/piecoursecount",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};







// ```````````````````````````````````````````````````````````````````````````````

//Course
// ```````````````````````````````````````````````````````````````````````````````
export const  getCourse = async () => { 
  // getAllCourses
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/course?ismaincourse=true",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || error.response.data.message);
    }
};
export const getSubcourse = async () => { // getAllCourses
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/course?ismaincourse=false",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};



//add course
export const addcourse = async (newCourse) => {
  try {
    const response = await axios.post(
      "http://137.184.230.216:4000/api/course",
      newCourse,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
//add course
export const addSubcourse = async ({name},id) => {
  console.log(name,id,'inside api');
  try {
    const response = await axios.post(
      `http://137.184.230.216:4000/api/subcourse/${id}`,
      {name:name},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.response.data.message);
  }
};
export const deleteSubcourse = async (id) => {
  try {
    const response = await axios.delete(
      `http://137.184.230.216:4000/api/subcourse/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to delete course: " + error.response.data.message);
  }
};



// Function to update a course by ID
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}course/${courseId}`,
      courseData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update course: " + error.message);
  }
};

// Function to delete a course by ID
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || error.response.data.message);
  }
};

//subcourse get

export const getSubCourse = async () => {
  try {
    const response = await axios.get(
      "http://137.184.230.216:4000/api/course?ismaincourse=false",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};

//course by trainer

export const getcoursebytrainer = async (trid) => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/course/coursebytrainer/${trid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};

//
export const getgraphdata = async (year) => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/reports/yearwise?year=${year}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
    }
};


//Trainer

export const addTrainer = async (trainerData) => {
  try {
    const response = await axios.post(
      `http://137.184.230.216:4000/api/trainer/register/`,
      trainerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // return response.data;
    console.log(response.data);
  } catch (error) {
    throw new Error("Failed to get branch: " + error.message);
  }
};

export const trainerdetailupdate=async (id,data)=>{
  console.log(token,'ghjks');
  try {
    const response = await axios.put(`http://137.184.230.216:4000/api/trainer/${id}`,data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}


//trainer delete


export const trainerdetaildelete=async (id)=>{
  try {
    const response = await axios.delete(`http://137.184.230.216:4000/api/trainer/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}




export const getAllTrainers = async () => {
  try {
    const response = await axios.get("http://137.184.230.216:4000/api/trainer", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
};

export const updateTrainer = async () => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/trainer`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};

//Branch

export const addbranch = async (branch) => {
  try {
    const response = await axios.post(
      "http://137.184.230.216:4000/api/branch",
      branch,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }
};



//view all branches
export const getBranch = async (pageNo) => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/branch?page=${pageNo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get branch: " + error.message);
  }
};

//activity get
export const getActivitybyadmin = async (id) => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/activity?stid=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get branch: " + error.message);
  }
};

//evaluate

export const evaluateanswer = async (data) => {
  try {
    const response = await axios.post(`http://137.184.230.216:4000/api/activity/evaluate`,data,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get branch: " + error.message);
  }
};



//attendence count

export const AttendenceByCountid = async (id) => {
console.log(id,'oie');
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/attendance/admincounts/${id}`,{
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


export const AttendenceByCountfilterAdmin = async (stdate,enddate,id) => {
  try {
    const response = await axios.get(`http://137.184.230.216:4000/api/attendance/admincounts/${id}?startDate=${stdate}&endDate=${enddate}`,{
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

//reports
export const getreports = async () => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/reports`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const getStudentFilterReports = async (stdate,enddate) => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/reports?startDate=${stdate}&endDate=${enddate}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const getcoursereports = async () => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/reports/course`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const addrequest = async (data) => {
  try {
    const response = await axios.post(
      `http://137.184.230.216:4000/api/request`,data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

export const viewrequestadmin = async () => {
  try {
    const response = await axios.get(
      `http://137.184.230.216:4000/api/request`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};