import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", branch: "", CGPA: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/students`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      setStudents(res.data.data);

    } catch (error) {
      setStatus(error.response?.data?.message);
    } setTimeout(() => { setStatus("") }, 3000);
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let res;
      if (editingId) {
       res= await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/student/${editingId}`, form,
                             {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/student`, form,
                              {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setStatus(res.data.message);
      setForm({ name: "", branch: "", CGPA: "" });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      setStatus(error.response.data.message || "Error saving student");
    }
    setTimeout(() => { setStatus("") }, 3000);
  };

  // Edit student
  const editStudent = (student) => {
    setForm({ name: student.name, branch: student.branch, CGPA: student.CGPA });
    setEditingId(student._id);
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/student/${id}`);
        setStatus(res.data.message);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      setStatus(error.response?.data?.message || "Failed to delete student.")
      }
      setTimeout(() => { setStatus("") }, 3000);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ color: "#510f0fdb", textAlign: "center" }}>
        Student
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          backgroundColor: "#f9f4ef",
          border: "2px solid #6d0707e0",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: "80%",
            margin: "8px 0",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="branch"
          placeholder="Enter Branch"
          value={form.branch}
          onChange={handleChange}
          required
          style={{
            width: "80%",
            margin: "8px 0",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          name="CGPA"
          placeholder="Enter CGPA"
          value={form.CGPA}
          onChange={handleChange}
          required
          style={{
            width: "80%",
            margin: "8px 0",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        /><br></br>
        <button
          type="submit"
          style={{
            backgroundColor: "#6d0707e0",
            color: "#f9f4ef",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* Status message */}
      <p style={{ color: "#520505ff", fontWeight: "bold" }}>{status}</p>

      {/* Display student cards */}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap", // allows wrapping to next row if screen is small
          gap: "20px", // space between cards
          listStyle: "none",// removes bullet points
          justifyContent: "center",
        
        }}
      >
        {students.map((std) => (
          <li
            key={std._id}
            style={{
              border: "2px solid #6d0707e0",
              borderRadius: "10px",
              padding: "15px",
              color: "#b7802fff",
              width: "280px",
              backgroundColor: "#f9f4ef",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
             <img
      src={`${process.env.REACT_APP_BACKEND_URL}/images/${std.name}.jpg`}
      alt={std.name}
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #6d0707e0",
        marginBottom: "10px",
      }}
      onError={(e) => (e.target.src = "/default-avatar.jpg")} // fallback
    />
            <h3>
              <strong style={{ color: "#520505ff" }}>Name:</strong> {std.name}
            </h3>
            <h3>
              <strong style={{ color: "#520505ff" }}>Branch:</strong> {std.branch}
            </h3>
            <h3>
              <strong style={{ color: "#520505ff" }}>CGPA:</strong> {std.CGPA}
            </h3>

            <div >
              <button
                onClick={() => editStudent(std)}
                style={{
                  backgroundColor: "#b7802fff",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteStudent(std._id)}
                style={{
                  backgroundColor: "#6d0707e0",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
             
               
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;


