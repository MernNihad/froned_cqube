import React, { useState, useEffect } from "react";
import FileBase64 from 'react-filebase64';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { Header } from "../Components";
import StudentDetailsModal from "./StudentDetailsModal";
import { GiBrassEye } from "react-icons/gi";
  import { Link } from "react-router-dom";

import {
  addStudent,
  deleteStudentById,
  getAllBranches,
  getAllTrainers,
  getBranch,
  getCourse,
  getStudent,
  getStudentbyid,
  getSubCourse,
  getcoursebytrainer,
  updateStudentById,
} from "../service/apiService";
import { errorToastify } from "../Components/Student/toastify";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const Students = () => {
  const [gridKey, setGridKey] = useState(0);
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [branches, setBranches] = useState([]);
  const [courseRef, setCourseREf] = useState([]);
  const [joinedDate, setJoinedDate] = useState();
  const [course_data, setCourseData] = useState([]);
  const [image, setimage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const id = localStorage.getItem("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseRefId, setSelectedCourseRefId] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [data, setData] = useState([]);
  const [refresh,setrefresh]=useState(false)
  const [editingStudent, setEditingStudent] = useState(null);
  const [editviewdata,seteditviewdata]=useState({})
  const [updateddata,setupdateddata]=useState()
  const [selectedtrainer, setSelectedtrainer] = useState([]);
  
const [view,setview]=useState(false)
  const getCourseRefId = (student) => {
    const course = student.courses.find((course) => course.assignedCourseRef._id);
    console.log(course.assignedCourseRef._id,'courses ids kjhg');
    return course ? course.assignedCourseRef._id : "";
  };

  const [stddata,setstddata]=useState([])




console.log(stddata,'jhkjj');
  const tableHeaders = [
    "Select",
    "",
    "Name",
    "Course",
    "Trainer",
    "Phone Number",
    "Email",
    "Action",
    "",
    ""
  ];


  
  const handleViewRow = (student) => {
    // Handle viewing a row (if needed)
  };
  const handleSelectStudent = (studentId, courseRefId) => {
    // Check if the studentId is in the selectedStudentIds array
    if (selectedStudentIds.includes(studentId)) { 
      // If it's already selected, remove it
      setSelectedStudentIds(
        selectedStudentIds.filter((id) => id !== studentId)
      );
      // Clear the selectedCourseRefId since no students are selected
      setSelectedCourseRefId("");
    } else {
      // If it's not selected, add it
      setSelectedStudentIds([...selectedStudentIds, studentId]);
      // Set the selectedCourseRefId to the provided courseRefId
      setSelectedCourseRefId([...selectedCourseRefId, courseRefId]);
    }
    console.log(selectedStudentIds, "student ids");
    console.log(selectedCourseRefId, "course ids");
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  
  const currentData = students
  .filter((student) => {
    return (
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.courses?.some((course) =>
        course.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  })
  .slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  
  const handleupdateCourseChange = (e) => {
    console.log(e.target.value,'jhv');
    const selectedCourseData = JSON.parse(e.target.value); // Parse the selected course data
    setupdateddata({
      ...updateddata,
      courses:{assignedCourseRef: selectedCourseData._id}
    });
  };

  const handleCourseChange = (e) => {
    const selectedCourseData = JSON.parse(e.target.value); // Parse the selected course data
    setNewStudent({
      ...newStudent,
      selectedCourse: selectedCourseData,
    });
  };

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    git: "",
    linkedIn: "",
    selectedTrainer: "",
    selectedBranch: "",
    selectedCourse: "",
    status: "",
    joinedDate: "",
  });


  useEffect(async() => {
    const response = await getAllBranches();
    setBranches(response);

      const coursesData = await getSubCourse();
   
      setCourseData(coursesData.result)
    
   let responsetrainer=await getAllTrainers()
      setTrainers(responsetrainer);
   let resstudent=await getStudent()
        setStudents(resstudent)
    
  
       
      
     
    const delay = 500; // 500ms debounce delay

    const debounceSearch = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery);
    }, delay);

    return () => clearTimeout(debounceSearch);
    // let response =
  }, [searchQuery,refresh]);


const [datachange,setdatachange]=useState(false)

useEffect(()=>{
  getcoursebytrainer(selectedtrainer).then((res)=>{
          
    console.log(res,'ciursedatass');
  })
},[datachange])


  const filteredStudents = debouncedSearchTerm
    ? students.filter((student) =>
        student?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : students;

    const handleUpdateInputChange = (e) => {
      
     setupdateddata({...updateddata,[e.target.name]:e.target.value})
     
    };
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
      image:image,
      selectedTrainer:selectedtrainer
    });
    console.log(newStudent,'kjhkjn');
  };

console.log(newStudent,'student datas');

const handleUpdate = (id) => {
  // Update the fields with the new values if they are not empty
  let updatedStudentData = { ...updateddata };

  // Set the assignedTrainersRef based on selected trainers
  if (selectedtrainer.length > 0) {
    updatedStudentData.assignedTrainersRef = selectedtrainer;
  } else {
    // If no trainers are selected, you may want to handle this case accordingly.
    // For example, you can set it to an empty array or remove the field.
    // updatedStudentData.assignedTrainersRef = [];
  }
if(image){
  updatedStudentData.profilePic = image;
}
  // Update the student with the modified data
  console.log(updatedStudentData,'updates');
  updateStudentById(id, updatedStudentData).then((res) => {
    console.log(res, 'update response');
    setrefresh(!refresh);
    setview(!view);
  });
};


console.log(editviewdata,'editview');



const handleedit=(id)=>{
  getStudentbyid(id).then((res)=>{
    console.log(res,'editing response');
    seteditviewdata(res)
    setview(!view)
  })


}

  const handleAddStudent = () => {
    
    const {
      name,
      email,
      phone,
      password,
      git,
      joinedDate,
      linkedIn,
      selectedTrainer,
      selectedBranch,
      selectedCourse,
      image,
    } = newStudent;
  
    if (name && email && phone && selectedBranch && selectedCourse) {
      const newStudentData = {
        name: name,
        email: email,
        phoneNumber: phone,
        password: password,
        branchRef: selectedBranch,
        courses: [
          {
            assignedCourseRef: selectedCourse,
            assignedTrainersRef: selectedTrainer,
          },
        ],
        github: git,
        linkedin: linkedIn,
        joinedDate: joinedDate,
        profilePic:image
      };
  
      addStudent(newStudentData)
        .then(() => {
          const updatedStudents = [...students, newStudentData];
          setStudents(updatedStudents);
          setGridKey((prevKey) => prevKey + 1);
          setNewStudent({
            name: "",
            phone: "",
            email: "",
            password: "",
            git: "",
            linkedIn: "",
            selectedTrainer: "",
            selectedBranch: "",
            selectedCourse: "",
            joinedDate: "",
          });
          setEditingIndex(null);
          setrefresh(!refresh)
        })
        .catch((error) => {
          console.error("Error adding student:", error);
          errorToastify("Failed to add student. Please try again.");
        });
    } else {
      errorToastify("Please fill all the required fields.");
    }
  };
  

  
  // useEffect(() => {
  //   // getCourse().then((res) => {
  //   //   setCourseData(res);
  //   // });

  //   getAllTrainers();
  // }, []);

  const handleUpdateStudent = () => {
    const updatedStudents = students?.map((student, index) => {
      if (index === editingIndex) {
        return { ...student, ...newStudent };
      }
      return student;
    });

    setStudents(updatedStudents);
    setGridKey((prevKey) => prevKey + 1);
    setNewStudent({
      name: "",
      phone: "",
      email: "",
      git: "",
      linkedIn: "",
      selectedTrainer: "",
      selectedBranch: "",
      selectedCourse: "",
      status: "",
      joinedDate: ""
    });
    setEditingIndex(null);
  };

  const handleEditRow = (student) => {
    setNewStudent({ ...student });
    setEditingIndex(students.indexOf(student));
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

const handledelete=(id)=>{
try{

  deleteStudentById(id)
  toast('deleted succesffully')
  setrefresh(!refresh)
}catch (error){
  errorToastify(error?.message)

}

}

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const gridColumns = [
    { field: "name", headerText: "Name", width: 100 },
    { field: "email", headerText: "Email", width: 100 },
    { field: "phone", headerText: "Phone", width: 100 },
    { field: "password", headerText: "Password", width: 100 },
    { field: "git", headerText: "Git", width: 100 },
    { field: "linkedIn", headerText: "LinkedIn", width: 100 },
    { field: "selectedTrainer", headerText: "Trainer", width: 100 },
    { field: "selectedBranch", headerText: "Branch", width: 100 },
    { field: "selectedCourse", headerText: "Course", width: 100 },
    { field: "status", headerText: "Status", width: 100 },
    { field: "joinedDate", headerText: "Joined Date", width: 100 },
    {
      headerText: "Actions",
      width: 120,
      template: (rowdata) => {
        return (
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 ml-2"
              onClick={() => handleEditRow(rowdata)}
            >
              Edit
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 ml-2"
              onClick={() => handleViewRow(rowdata)}
            >
              View
            </button>
          </div>
        );
      },
    },
  ];
  

  const gridData = students?.map((student, index) => ({
    ...student,
    id: index + 1,
  }));

  const handleSelectTrainer = (e, trainerId) => {
    console.log(trainerId,'sdih');
    if (e.target.checked) {
      // If the checkbox is checked, add the trainer to selected trainers
      setSelectedtrainer((prevSelectedTrainers) => [
        ...prevSelectedTrainers,
        trainerId
      ]);
      setdatachange(!datachange)
      console.log('');
    } else {
      // If the checkbox is unchecked, remove the trainer from selected trainers
      setSelectedtrainer((prevSelectedTrainers) =>
        prevSelectedTrainers.filter((id) => id !== trainerId)
      );
    }
  
    // Update the updateddata state with selected trainers
    if(selectedtrainer){

      setupdateddata({
        ...updateddata,
        assignedTrainersRef: selectedtrainer
      });
    }
  };
  
  console.log(selectedtrainer,'def');

  return (
    <>
   
    <div className="container mx-auto p-10 bg-white rounded-3xl">




      <Header category="Page" title="Students" />

      <div className="mb-8">
        <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold mb-4">Student Profile Management</h1>
        {image &&
       <img src={image} width={300}/>
      }
      </div>
        <div className="mb-4">

{ view ==false &&
<>
          <h2 className="text-xl font-bold mb-2">Add Student</h2>
          <div className="flex flex-wrap bg-gray-100 p-5 mb-4">
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Name"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Phone"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
            />
             <FileBase64
       
       onDone={((res)=>{
         console.log(res.btrase64,'responsesd');
         setimage(res.base64)
       })} />
    
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
            />

            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="password"
              name="password"
              value={newStudent.password}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="Git"
              name="git"
              value={newStudent.git}
              onChange={handleInputChange}
              />
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="date"
              placeholder="date"
              value={newStudent.joinedDate} // Use newStudent.joinedDate instead of joinedDate
              onChange={handleInputChange} // Update state using handleInputChange
              name="joinedDate" // Set the correct name
            />

            <input
              className="border h-11 rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder="LinkedIn"
              name="linkedIn"
              value={newStudent.linkedIn}
              onChange={handleInputChange}
            />
            
            <div className="flex-col">
  <label htmlFor="" className="me-2">Trainers Assigned:</label>
  <div className="overflow-y-scroll h-24 ">

  {trainers?.map((trainer) => (
    
    <div key={trainer._id}>
      
      <label>
        <input
          type="checkbox"
          value={trainer._id}
          checked={selectedtrainer.includes(trainer._id)}
          onChange={(e) => handleSelectTrainer(e, trainer._id)}
          />
         {trainer.name}
      </label>
    </div>
  ))}
  </div>
</div>

            <select
              className="border h-11 rounded p-2 mr-2 mb-2 sm:mb-0"
              name="selectedBranch"
              value={newStudent.selectedBranch}
              onChange={handleInputChange}
            >
              <option value="">Select Branch</option>
              {branches?.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>

            <select
  className="border rounded h-11 px-2 py-1 mr-2 mb-2 sm:mb-0"
  value={newStudent.selectedCourse}
  onChange={handleCourseChange} // Add this line for the new event handler
  name="selectedCourse"
>
  <option value="" disabled>
    Select Course
  </option>
  {course_data?.map((item) => {
    return (
      <option key={item._id} value={JSON.stringify(item)}>
        {item.name}
      </option>
    );
  })}
</select>
          </div>

         <div>
        
        
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:shadow-orange"
              onClick={handleAddStudent}
            >
              Add Student
            </button>
        
        </div>

        <div className="mb-2 gap-6 flex items-center">
          <TextField
            label="Search by Name or Course"
            variant="outlined"
            height="30px"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
            </>
}

{/* edit student form */}
{ view &&

<>
<div className="flex flex-wrap mb-4">

            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder={`Name : ${editviewdata.name}`}
              name="name"
              value={updateddata?.name}
              onChange={handleUpdateInputChange}
              />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder={`number : ${editviewdata.phoneNumber}`}
              name="phoneNumber"
              value={updateddata?.phone}
              onChange={handleUpdateInputChange}
            />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder={`Email : ${editviewdata.email}`}
              name="email"
              value={updateddata?.email}
              onChange={handleUpdateInputChange}
              />
            
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder={`password : ${editviewdata.password}`}
              name="password"
              value={updateddata?.password}
              onChange={handleUpdateInputChange}
              />
            <br />
            <br />
            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder={`Github : ${editviewdata.github}`}
              name="github"
              value={updateddata?.git}
              onChange={handleUpdateInputChange}
            />
            <label htmlFor="">{`date joined : ${editviewdata.createdAt}`}</label>
            <input
              className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
              type="date"
              placeholder={`date joined : ${editviewdata.createdAt}`}
              value={updateddata?.joinedDate} // Use updateddata.joinedDate instead of joinedDate
              onChange={handleUpdateInputChange} // Update state using handleUpdateInputChange
              name="joinedDate" // Set the correct name
              />

            <input
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              type="text"
              placeholder={`LinkedIn : ${editviewdata.linkedIn}`}
              name="linkedIn"
              value={updateddata?.linkedIn}
              onChange={handleUpdateInputChange}
            />
            <div className="flex-col">

           
            
{/* 
          {
            editviewdata?.courses[0]?.assignedTrainersRef.map((item, index) => (
              <li className="list-none" key={index}>{item.name}</li>
              ))
              
} */}
              </div>
              <div className="flex-col">
  {/* <label htmlFor="">Trainers Assigned:</label> */}
  <div className="overflow-y-scroll h-24 ">t
  {trainers?.map((trainer) => (
    <div key={trainer._id}>
      <label>
        <input
          type="checkbox"
          value={trainer._id}
          checked={selectedtrainer.includes(trainer._id)}
          onChange={(e) => handleSelectTrainer(e, trainer._id)}
        />
        {trainer.name}
      </label>
    </div>
    
  ))}
  </div>
</div>
<div>
<FileBase64
       
       onDone={((res)=>{
         console.log(res.base64,'responsesd');
         setimage(res.base64)
       })} />
</div>
            <select
              className="border rounded p-2 mr-2 mb-2 sm:mb-0"
              name="branchRef"
              value={updateddata?.selectedBranch}
              onChange={handleUpdateInputChange}
              >
              <option disabled value="">{editviewdata.branchName}</option>
              {branches?.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>

            <select
  className="border rounded px-2 py-1 mr-2 mb-2 sm:mb-0"
  
  onChange={handleupdateCourseChange} // Add this line for the new event handler
  name="assignedCourseRef"
>
  <option value="" disabled>
    {editviewdata.courses[0].name}
  </option>
  {course_data?.map((item) => {
    return (
      <option key={item._id} value={JSON.stringify(item)}>
        {item.name}
      </option>
    );
  })}
</select>
          </div>

         <div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 hover:shadow-orange"
              onClick={() => handleUpdate(editviewdata._id)}
            >
              Update Student
            </button>
        
        </div>

        <div className="mb-2 gap-6 flex items-center">
          <TextField
            label="Search by Name or Course"
            variant="outlined"
            height="30px"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

</>
}
{/* edit student form end */}



        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="h-fit">
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: "#475569",
                      fontSize: "17px",
                      color: "white",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="text-lg">
              {currentData.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(student._id)}
                      onChange={() =>
                        handleSelectStudent(
                          student._id,
                          getCourseRefId(student)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell><img src={student.profilePic} className="max-w-none profile" alt="" /></TableCell>
                  <TableCell>{student.name}</TableCell>
                    {student?.courses?.map((course, index) => (
                      <>
                  <TableCell>
                      <span key={index}>{course.name}</span>
                  </TableCell>
                  {course.trainerName &&

                    <TableCell>

                      <span key={index}>{course.trainerName}</span>
                  </TableCell>
                    
                  }
                { course.trainerName ==null &&

                  <TableCell>
                    
                    <span key={index}>Admin</span>
                    </TableCell>
                  }
                    
                  
                      </>
                    ))} 
                  {/* <TableCell>{student?.courses?.map((course, index) => (
                      // <span key={index}>{assigned.name}</span>
                    ))}
                     </TableCell> */}
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Link to={`/admin/StudentReport/${student._id}`}>
                      <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handleViewRow(student)}
                      >
                        <GiBrassEye size={25} />
                      </IconButton>
                    </Link>
              
                  </TableCell>

                  <TableCell>
                    
                      <IconButton
                        size="small"
                        title="View more"
                        onClick={() => handledelete(student._id)}
                      >
                        <AiFillDelete size={25} />
                      </IconButton>
                  
              
                  </TableCell>
                  <TableCell>
                   
                      <IconButton
                      size="small"
                      title="View more"
                      onClick={() => handleedit(student._id)}
                      >
                        <AiFillEdit size={25} />
                      </IconButton>
                      
                     
                  
              
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="pagination-container text-black">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="page-number">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      </div>
      </div>
      </>
    

  );
};

export default Students;
