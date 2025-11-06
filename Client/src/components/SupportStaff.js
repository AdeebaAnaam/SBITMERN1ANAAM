import React, { useState, useEffect } from "react";
import axios from "axios";

const SStaffList = () => {
  const [sstaffs, setSStaffs] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", salary: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const role =localStorage.getItem("role")?.toLowerCase();

  // Fetch support staff on mount
  useEffect(() => {
    fetchSStaffs();
  }, []);

  const fetchSStaffs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/sstaffs`);
      setSStaffs(res.data.data);
    } catch (error) {
      console.error("Error fetching support staff:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
       res =  await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/sstaff/${editingId}`, form);
      } else {
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sstaff`, form);
      }
      setStatus(res.data.message);
      setForm({ name: "", role: "", salary: "" });
      setEditingId(null);
      fetchSStaffs();
    } catch (error) {
      console.error("Error saving support staff:", error);
      setStatus(error.response.data.message ||"Failed to save support staff. Try again.");
    }
    setTimeout(() => { setStatus("") }, 3000);
  };

  // Edit staff
  const editSStaff = (staff) => {
    setForm({ name: staff.name, role: staff.role, salary: staff.salary });
    setEditingId(staff._id);
  };

  // Delete staff
  const deleteSStaff = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
       const res= await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/sstaff/${id}`);
       setStatus(res.data.message);
        fetchSStaffs();
      } catch (error) {
        console.error("Error deleting support staff:", error);
        setStatus(error.response?.data?.message || "Failed to delete support staff.");
      }
    }   setTimeout(() => { setStatus("") }, 3000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ color: "#510f0fdb", textAlign: "center" }}>Support Staff </h2>

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
          name="role"
          placeholder="Enter Role"
          value={form.role}
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
          {editingId ? "Update Staff" : "Add Staff"}
        </button>
      </form>

      {/* Status message */}
      <p style={{ color: "#520505ff", fontWeight: "bold" }}>{status}</p>

      {/* Staff Cards */}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          listStyle: "none",
          justifyContent: "center",
        }}
      >
        {sstaffs.map((ssf) => (
          <li
            key={ssf._id}
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
      src={`${process.env.REACT_APP_BACKEND_URL}/images/${ssf.name}.jpg`}
      alt={ssf.name}
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
            <h3><strong style={{ color: "#520505ff" }}>Name:</strong> {ssf.name}</h3>
            <h3><strong style={{ color: "#520505ff" }}>Role:</strong> {ssf.role}</h3>
            <h3><strong style={{ color: "#520505ff" }}>Salary:</strong> {ssf.salary}</h3>

            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                {(role === "management") ? (
              <>
              <button
                onClick={() => editSStaff(ssf)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#510f0fdb",
                  color: "#f9f4ef",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteSStaff(ssf._id)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#b7802fff",
                  color: "#f9f4ef",
                }}
              >
                Delete
              </button>
              </>
                ): (
                <p style={{ color: "#888", fontSize: "0.9em" }}>
                You don’t have permission to edit or delete.
    </p>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SStaffList;
