const jwt = require("jsonwebtoken");

/*ROLE–RESOURCE–ACTION PERMISSIONS */
const permissions = {
  student: {
    create: ["student", "management"],
    read: ["student", "faculty", "staff", "management"],
    update: ["faculty", "management"],
    delete: ["faculty", "management"],
  },

  faculty: {
    create: ["faculty", "management"],
    read: ["student", "faculty", "staff", "management"],
    update: ["management"],
    delete: ["management"],
  },

  staff: {
    create: ["staff", "management"],
    read: ["student", "faculty", "staff", "management"],
    update: ["management"],
    delete: ["management"],
  },

  management: {
    create: ["management"],
    read: ["student", "faculty", "staff", "management"],
    update: ["management"],
    delete: ["management"],
  },
};

/*  JWT VERIFICATION */
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // must contain role
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access denied" });
  }
};

/* ROLE CHECK MIDDLEWARE */
exports.roleCheck = (resource, action) => (req, res, next) => {
  const role = req.user?.role?.toLowerCase();
  const resrc = resource?.toLowerCase();
  const act = action?.toLowerCase();

  if (!role) {
    return res.status(403).json({ message: "Role not found" });
  }

  if (!permissions[resrc] || !permissions[resrc][act]) {
    return res.status(400).json({ message: "Invalid permission check" });
  }

  if (!permissions[resrc][act].includes(role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
