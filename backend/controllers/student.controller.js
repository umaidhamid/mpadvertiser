import Student from "../models/student.model.js";

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      email,
      // phone,
      class: studentClass,
      // section,
      // address,
      // dateOfBirth,
      // guardianName,
      // guardianPhone,
      // status,
    } = req.body;

    // 🔥 get image from cloudinary (via multer)
const photoUrl = req.uploadedImage?.url;
    // Validation
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!rollNumber) missingFields.push("rollNumber");
    // if (!email) missingFields.push("email");
    if (!studentClass) missingFields.push("class");
    if (!photoUrl) missingFields.push("photo");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing: ${missingFields.join(", ")}`,
      });
    }

    // Check duplicate
    const existingStudent = await Student.findOne({
      $or: [{ rollNumber }, { email: email.toLowerCase() }],
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student already exists",
      });
    }

    // Save ONLY URL
    const student = await Student.create({
      name,
      rollNumber,
      // email,
      // phone,
      class: studentClass,
      // section,
      photo: photoUrl, // ✅ URL not base64
      // address,
      // dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      // guardianName,
      // guardianPhone,
      // status: status || "active",
    });

    res.status(201).json({
      success: true,
      data: student,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed" });
  }
};
/**
 * @desc    Get all students
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, class: cls, status, search } = req.query;

    const filter = {};
    if (cls) filter.class = cls;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [students, total] = await Promise.all([
      Student.find(filter)
        // Exclude photo for list view performance
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Student.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: students,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("getAllStudents error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};


const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    console.error("getStudentById error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch student" });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
export { createStudent, getAllStudents, getStudentById, deleteStudent };