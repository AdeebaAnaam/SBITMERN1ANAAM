import React, { useState, useEffect } from "react";
import axios from "axios";
//import { set } from "mongoose";

const ManagementList = () => {
  const [managements, setManagements] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    qualification: "",
    salary: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

   

  // Fetch managements on mount
  useEffect(() => {
    fetchManagements();
  }, []);

  const fetchManagements = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/managements`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  
      setManagements(res.data.data);
    } catch (error) {
      setStatus(error.response?.data?.message);
    } setTimeout(() => { setStatus("") }, 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let res;
      if (editingId) {
       res= await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/management/${editingId}`, form
                             {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/management`, form
                                {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setStatus(res.data.message);
      setForm({ name: "", designation: "", qualification: "", salary: "" });
      setEditingId(null);
      fetchManagements();
    } catch (error) {
      console.error("Error saving management:", error);
      setStatus( error.response.data.message ||"Failed to save management. Try again.");
    } setTimeout(() => { setStatus("") }, 3000);
  };

  const editManagement = (mag) => {
    setForm({
      name: mag.name,
      designation: mag.designation,
      qualification: mag.qualification,
      salary: mag.salary,
    });
    setEditingId(mag._id);
  };

  const deleteManagement = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
      const res =  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/management/${id}`);
      setStatus(res.data.message);
        fetchManagements();
      } catch (error) {
        console.error("Error deleting management:", error);
      setStatus(error.response?.data?.message || "Failed to delete management." );
      }
    } setTimeout(() => { setStatus("") }, 3000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ color: "#510f0fdb", textAlign: "center" }}> Management</h2>

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
          style={{ width: "80%", margin: "8px 0", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="designation"
          placeholder="Enter Designation"
          value={form.designation}
          onChange={handleChange}
          required
          style={{ width: "80%", margin: "8px 0", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="qualification"
          placeholder="Enter Qualification"
          value={form.qualification}
          onChange={handleChange}
          required
          style={{ width: "80%", margin: "8px 0", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          name="salary"
          placeholder="Enter Salary"
          value={form.salary}
          onChange={handleChange}
          required
          style={{ width: "80%", margin: "8px 0", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        /><br />
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
          {editingId ? "Update Management" : "Add Management"}
        </button>
      </form>

      {/* Status Message */}
      <p style={{ color: "#520505ff", fontWeight: "bold" }}>{status}</p>

      {/* Faculty Cards */}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          listStyle: "none",
          padding: "10px",
          margin: 0,
          justifyContent: "center",
        }}
      >
        {managements.map((mag) => (
          <li
            key={mag._id}
            style={{
              minWidth: "300px",
              border: "2px solid #6d0707e0",
              borderRadius: "10px",
              padding: "15px",
              color: "#b7802fff",
              backgroundColor: "#f9f4ef",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
             <img
      src={`${process.env.REACT_APP_BACKEND_URL}/images/${mag.name}.jpg`}
      alt={mag.name}
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
            <h3><strong style={{ color: "#520505ff" }}>Name:</strong> {mag.name}</h3>
            <h3><strong style={{ color: "#520505ff" }}>Designation:</strong> {mag.designation}</h3>
            <h3><strong style={{ color: "#520505ff" }}>Qualification:</strong> {mag.qualification}</h3>
            <h3><strong style={{ color: "#520505ff" }}>Salary:</strong> {mag.salary}</h3>
            < div>
              <button
                onClick={() => editManagement(mag)}
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
                onClick={() => deleteManagement(mag._id)}
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

export default ManagementList;
