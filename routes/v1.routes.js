const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

/* Route to create student record and send email */
router.post("/studentRegistration", studentController.studentRegistration);

/* Route to get courses list */
router.get("/getCourseList", studentController.getCourseList);

/* Route to student login */
router.post("/studentLogin", studentController.studentLogin);

/* Route to save student form */
router.post("/saveStudentForm", studentController.saveStudentForm);

/* Route to get existing student data by student id */
router.get("/getStudentRecord/:id", studentController.getStudentRecord);

/* Route to get Document type list */
router.get("/getDocumentTypeList", studentController.getDocumentTypeList);

/* Route to get payment type list */
router.get("/getPaymentTypeList", studentController.getPaymentTypeList);

/* Route to get all existing student list */
router.post("/getAllStudentList", studentController.getAllStudentList);

module.exports = router;
