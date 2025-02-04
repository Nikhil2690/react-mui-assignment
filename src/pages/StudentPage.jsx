import Sidebar from "../components/Sidebar"
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import {Button, Modal, TextField, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";


const StudentPage = () => {
  const [students, setStudents] = useState([]);  
  const [modalOpen, setModalOpen] = useState(false); 
  const [viewStudent, setViewStudent] = useState(null); 
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({  
  name: "",
  class: "",
  section: "",
  rollNumber: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  guardianName: "",
  guardianPhone: "",
  remarks: "",
});


  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, "students"); 
      const studentSnapshot = await getDocs(studentsCollection); 
      const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
      setStudents(studentList); 
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });  
  };

  const handleAddStudent = async () => {
    if (newStudent.id) {
      
      const studentRef = doc(db, "students", newStudent.id);  
      await updateDoc(studentRef, newStudent);  
    } else {
      
      await addDoc(collection(db, "students"), newStudent);
    }
  
    setModalOpen(false);
    setStudents((prev) => [...prev, newStudent]);  
  };

  const handleEdit = (student) => {
    setNewStudent(student);  
    setModalOpen(true);    
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));  
    setStudents(students.filter((student) => student.id !== id));  
  };

  const handleView = (student) => {
    setViewStudent(student); 
    setViewModalOpen(true); 
  };
  

  return (

  <Box sx={{ display: "flex" }}>
    <Sidebar />

   <Container>
      <Typography variant="h4" gutterBottom>
        Students List
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setModalOpen(true)} 
        sx={{ marginBottom: "20px" }}
      >
        Add Student
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Class</strong></TableCell>
              <TableCell><strong>Section</strong></TableCell>
              <TableCell><strong>Roll Number</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>

                <Button 
          onClick={() => handleView(student)} 
          color="primary" 
          variant="outlined" 
          sx={{ marginRight: 1 }}
        >
          View
        </Button>
        
        <Button 
          onClick={() => handleEdit(student)} 
          color="primary" 
          variant="outlined" 
          sx={{ marginRight: 1 }}
        >
          Edit
        </Button>
       
        <Button 
          onClick={() => handleDelete(student.id)} 
          color="secondary" 
          variant="outlined"
        >
          Delete
        </Button>
      </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
  <Box sx={{ backgroundColor: "white", padding: "20px", margin: "auto", marginTop: "100px", width: "400px" }}>
    <Typography variant="h6" gutterBottom>Student Details</Typography>


    {viewStudent && (
      <>
        <Typography><strong>Name:</strong> {viewStudent.name}</Typography>
        <Typography><strong>Class:</strong> {viewStudent.class}</Typography>
        <Typography><strong>Section:</strong> {viewStudent.section}</Typography>
        <Typography><strong>Roll Number:</strong> {viewStudent.rollNumber}</Typography>
        <Typography><strong>Phone:</strong> {viewStudent.phone}</Typography>
        <Typography><strong>Email:</strong> {viewStudent.email}</Typography>
        <Typography><strong>Address:</strong> {viewStudent.address}</Typography>
        <Typography><strong>Guardian Name:</strong> {viewStudent.guardianName}</Typography>
        <Typography><strong>Guardian Phone:</strong> {viewStudent.guardianPhone}</Typography>
        <Typography><strong>Remarks:</strong> {viewStudent.remarks}</Typography>
      </>
    )}

    <Button variant="contained" color="secondary" onClick={() => setViewModalOpen(false)} sx={{ marginTop: "20px" }}>
      Close
    </Button>
  </Box>
</Modal>


      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  <Box sx={{ backgroundColor: "white", padding: "20px", margin: "auto", marginTop: "100px", width: "400px", maxHeight: "80vh",           
      overflowY: "auto",  }}>
    <Typography variant="h6" gutterBottom>Add New Student</Typography>

    <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Class" name="class" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Section" name="section" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Roll Number" name="rollNumber" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Date of Birth" name="dob" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Gender" name="gender" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Phone" name="phone" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Address" name="address" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Guardian Name" name="guardianName" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Guardian Phone" name="guardianPhone" fullWidth margin="normal" onChange={handleInputChange} />
    <TextField label="Remarks" name="remarks" fullWidth margin="normal" onChange={handleInputChange} />

              <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddStudent} 
              sx={{ marginTop: "20px" }}
            >
              Submit
              </Button>
    </Box>
      </Modal>

    </Container>
  </Box>
  );
}

export default StudentPage


