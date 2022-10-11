const { httpStatus, applicationStatus } = require("../constant/HttpResponse");
const studentModel = require("../models/student.model");
const sendEmail = require("../mail/sendEmail");
const randomstring = require("randomstring");

/* Controller to create student record and send email */
exports.studentRegistration = async (req, res, next) => {
  try {
    if (req.body && req.body.email && req.body.course_id) {
      let email = req.body.email;
      let course_id = req.body.course_id;

      let phone_no = null;
      if (req.body.phone_no) {
        phone_no = req.body.phone_no;
      }
      let application_no = 0;
      let password = randomstring.generate(8);
      let app_result = await studentModel.getLatestApplicationNo(res);
      if (app_result && app_result.ApplicationNo) {
        application_no = app_result.ApplicationNo;
      }
      let status_result = await studentModel.getStatus(
        applicationStatus.IN_PROGRESS,
        res
      );

      let studObj = {
        ApplicationNo: application_no,
        MobileNo: phone_no,
        Email: email,
        Password: password,
        StatusID: status_result.ID,
      };
      let student_record = await studentModel.studentRegistration(studObj, res);
      if (student_record && student_record.ID) {
        /*** Below code used to add course to student under student_course table */
        let stud_course = {
          StudentID: student_record.ID,
          CoursesID: course_id,
        };
        await studentModel.addCourseToStudent(stud_course, res);
        /*** Below code used to send Email */
        await sendEmail({ application_no, password, email });
        res.status(httpStatus.SUCCESS).json({
          status: "SUCCESS",
          message: "Student Registered Successfully",
        });
      } else {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Failed to create student record",
        });
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "FAILED",
        message: "Something went wrong",
        value: "Check the required input fields and data",
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
};

/* Controller to get courses list */
exports.getCourseList = (req, res) => {
  try {
    studentModel
      .getCourseList()
      .then((result) => {
        if (result && result.length > 0) {
          /* Return all data present in DB */
          return res.status(httpStatus.SUCCESS).json({
            status: "SUCCESS",
            result: result,
          });
        } else {
          return res.status(httpStatus.SUCCESS).json({
            status: "SUCCESS",
            result: [],
          });
        }
      })
      .catch((error) => {
        /* Send error */
        return res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          error: error,
        });
      });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
      value: error,
    });
  }
};

/* Controller to check student login */
exports.studentLogin = async (req, res, next) => {
  try {
    if (req.body && req.body.application_id && req.body.password) {
      let application_id = req.body.application_id;
      let password = req.body.password;
      let result = await studentModel.studentLogin(
        application_id,
        password,
        res
      );

      if (result && result.student_id) {
        res.status(httpStatus.SUCCESS).json({
          status: "SUCCESS",
          message: "Login Successfully",
          value: result,
        });
      } else {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Login Failed",
        });
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "FAILED",
        message: "Something went wrong",
        value: "Check the required input fields and data",
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
};

/* Controller to save student form */
exports.saveStudentForm = async (req, res, next) => {
  try {
    if (req.body && req.body.student_id) {
      let student_id = req.body.student_id;
      let student_info = {};
      if (
        req.body.student_info &&
        Object.keys(req.body.student_info).length > 0
      ) {
        student_info = req.body.student_info;
      }
      let funding = req.body.funding ? req.body.funding : false;
      let funding_info = {};
      if (
        req.body.funding_info &&
        Object.keys(req.body.funding_info).length > 0 &&
        req.body.funding
      ) {
        funding_info = req.body.funding_info;
      }
      let family_info = [];
      if (req.body.family_info && req.body.family_info.length > 0) {
        family_info = req.body.family_info;
      }

      let emergency_contact = [];
      if (req.body.emergency_contact && req.body.emergency_contact.length > 0) {
        emergency_contact = req.body.emergency_contact;
      }

      let payment_detail = {};
      if (
        req.body.payment_detail &&
        Object.keys(req.body.payment_detail).length > 0
      ) {
        payment_detail = req.body.payment_detail;
      }

      let local_address = {};
      if (
        req.body.local_address &&
        Object.keys(req.body.local_address).length > 0
      ) {
        local_address = req.body.local_address;
      }

      let origin_country_address = {};
      if (
        req.body.origin_country_address &&
        Object.keys(req.body.origin_country_address).length > 0
      ) {
        origin_country_address = req.body.origin_country_address;
      }

      let student_document = [];
      if (req.body.student_document && req.body.student_document.length > 0) {
        student_document = req.body.student_document;
      }

      let certificate_info = [];
      if (req.body.certificate_info && req.body.certificate_info.length > 0) {
        certificate_info = req.body.certificate_info;
      }

      /** Below code used to update student table data */
      if (student_info && Object.keys(student_info).length > 0) {
        let student_obj = {};
        if (student_info.hasOwnProperty("first_name")) {
          student_obj["FirstName"] = student_info["first_name"];
        }
        if (student_info.hasOwnProperty("last_name")) {
          student_obj["FamilyName"] = student_info["last_name"];
        }
        if (student_info.hasOwnProperty("father_name")) {
          student_obj["FatherName"] = student_info["father_name"];
        }
        if (student_info.hasOwnProperty("mother_name")) {
          student_obj["MotherName"] = student_info["mother_name"];
        }
        if (student_info.hasOwnProperty("grand_father_name")) {
          student_obj["GrandFatherName"] = student_info["grand_father_name"];
        }
        if (student_info.hasOwnProperty("gender")) {
          student_obj["Gender"] = student_info["gender"];
        }
        if (student_info.hasOwnProperty("nationality")) {
          student_obj["Nationality"] = student_info["nationality"];
        }
        if (student_info.hasOwnProperty("birth_date")) {
          student_obj["DateofBirth"] = student_info["birth_date"];
        }
        if (student_info.hasOwnProperty("birth_place")) {
          student_obj["PlaceofBirth"] = student_info["birth_place"];
        }
        if (student_info.hasOwnProperty("national_number")) {
          student_obj["NationalNumber"] = student_info["national_number"];
        }
        if (student_info.hasOwnProperty("passport_number")) {
          student_obj["PassportNumber"] = student_info["passport_number"];
        }
        if (student_info.hasOwnProperty("accomodation")) {
          student_obj["Accomodation"] = student_info["accomodation"];
        }
        student_obj["Funding"] = funding;
        student_obj["DateTimeStamp"] = new Date().toISOString();

        await studentModel.updateStudentInfo(student_id, student_obj, res);
      }

      // Delete subsequent table previous information
      await Promise.all([
        studentModel.deleteStudentFundingInfo(student_id, res),
        studentModel.deleteStudentFamilyInfo(student_id, res),
        studentModel.deleteStudentEmergencyPersonContact(student_id, res),
        studentModel.deletePaymentDetail(student_id, res),
        studentModel.deleteLocalStudentAddress(student_id, res),
        studentModel.deleteOriginStudentAddress(student_id, res),
        studentModel.deleteStudentDocuments(student_id, res),
        studentModel.deleteStudentSchoolCertificateInfo(student_id, res),
      ]);

      /** Below code used to insert data into studentFundingInfo Table */
      if (funding_info && Object.keys(funding_info).length > 0 && funding) {
        let funding_info_obj = {};
        funding_info_obj["StudentID"] = student_id;
        funding_info_obj["Name"] = funding_info.name ? funding_info.name : null;
        funding_info_obj["JobName"] = funding_info.job_name
          ? funding_info.job_name
          : null;
        funding_info_obj["WorkTelNo"] = funding_info.work_tel_no
          ? funding_info.work_tel_no
          : null;
        funding_info_obj["Email"] = funding_info.email
          ? funding_info.email
          : null;
        funding_info_obj["BoxNo"] = funding_info.box_no
          ? funding_info.box_no
          : null;
        funding_info_obj["FaxNo"] = funding_info.fax_no
          ? funding_info.fax_no
          : null;
        funding_info_obj["OriginCountry"] = funding_info.origin_country
          ? funding_info.origin_country
          : false;
        await studentModel.insertIntoFundingInfo(funding_info_obj, res);
      }

      /** Below code used to insert data into studentFamilyInfo Table */
      if (family_info && family_info.length > 0) {
        for (let i = 0; i < family_info.length; i++) {
          if (family_info[i] && Object.keys(family_info[i]).length > 0) {
            let family_info_obj = {};
            family_info_obj["StudentID"] = student_id;
            family_info_obj["Name"] = family_info[i].name
              ? family_info[i].name
              : null;
            family_info_obj["City"] = family_info[i].city
              ? family_info[i].city
              : null;
            family_info_obj["Country"] = family_info[i].country
              ? family_info[i].country
              : null;
            family_info_obj["JobTelNo"] = family_info[i].job_tel_no
              ? family_info[i].job_tel_no
              : null;
            family_info_obj["HomeTelNo"] = family_info[i].home_tel_no
              ? family_info[i].home_tel_no
              : null;
            family_info_obj["MobileNo"] = family_info[i].mobile_no
              ? family_info[i].mobile_no
              : null;
            family_info_obj["Email"] = family_info[i].email
              ? family_info[i].email
              : null;
            family_info_obj["FamilyMember"] = family_info[i].family_member
              ? family_info[i].family_member
              : false;
            await studentModel.insertIntoStudentFamilyInfo(
              family_info_obj,
              res
            );
          }
        }
      }

      /** Below code used to insert data into StudentEmergencyPersonContact Table */
      if (emergency_contact && emergency_contact.length > 0) {
        for (let i = 0; i < emergency_contact.length; i++) {
          if (
            emergency_contact[i] &&
            Object.keys(emergency_contact[i]).length > 0
          ) {
            let emergency_contact_obj = {};
            emergency_contact_obj["StudentID"] = student_id;
            emergency_contact_obj["Name"] = emergency_contact[i].name
              ? emergency_contact[i].name
              : null;
            emergency_contact_obj["Relative"] = emergency_contact[i].relative
              ? emergency_contact[i].relative
              : null;
            emergency_contact_obj["MobileNo"] = emergency_contact[i].mobileNo
              ? emergency_contact[i].mobileNo
              : null;
            emergency_contact_obj["Address"] = emergency_contact[i].address
              ? emergency_contact[i].address
              : null;
            await studentModel.insertIntoEmergencyPersonContact(
              emergency_contact_obj,
              res
            );
          }
        }
      }

      /** Below code used to insert data into PaymentDetails Table */
      if (payment_detail && Object.keys(payment_detail).length > 0) {
        let payment_detail_obj = {};
        payment_detail_obj["StudentID"] = student_id;
        payment_detail_obj["Name"] = payment_detail.name;
        payment_detail_obj["PaymentTypeID"] = payment_detail.payment_type_id;
        payment_detail_obj["PaymentNo"] = payment_detail.payment_no;
        payment_detail_obj["TransactionNo"] = payment_detail.transaction_no;
        payment_detail_obj["Fees"] = payment_detail.fees;
        payment_detail_obj["TransationDateTime"] =
          payment_detail.transaction_datetime;
        await studentModel.insertIntoPaymentDetails(payment_detail_obj, res);
      }

      /** Below code used to insert data into StudentAddress Table */
      if (local_address && Object.keys(local_address).length > 0) {
        let local_address_obj = {};
        local_address_obj["StudentID"] = student_id;
        local_address_obj["City"] = local_address.city
          ? local_address.city
          : null;
        local_address_obj["Country"] = local_address.country
          ? local_address.country
          : null;
        local_address_obj["HomeTelNo"] = local_address.home_tel_no
          ? local_address.home_tel_no
          : null;
        local_address_obj["MobileNo"] = local_address.mobile_no
          ? local_address.mobile_no
          : null;
        local_address_obj["BoxNo"] = local_address.box_no
          ? local_address.box_no
          : null;
        local_address_obj["Email"] = local_address.email
          ? local_address.email
          : null;
        local_address_obj["OriginCountry"] = local_address.origin_country;
        await studentModel.insertIntoStudentAddress(local_address_obj, res);
      }

      /** Below code used to insert data into StudentAddress Table */
      if (
        origin_country_address &&
        Object.keys(origin_country_address).length > 0
      ) {
        let origin_country_address_obj = {};
        origin_country_address_obj["StudentID"] = student_id;
        origin_country_address_obj["City"] = origin_country_address.city
          ? origin_country_address.city
          : null;
        origin_country_address_obj["Country"] = origin_country_address.country
          ? origin_country_address.country
          : null;
        origin_country_address_obj["HomeTelNo"] =
          origin_country_address.home_tel_no
            ? origin_country_address.home_tel_no
            : null;
        origin_country_address_obj["MobileNo"] =
          origin_country_address.mobile_no
            ? origin_country_address.mobile_no
            : null;
        origin_country_address_obj["BoxNo"] = origin_country_address.box_no
          ? origin_country_address.box_no
          : null;
        origin_country_address_obj["Email"] = origin_country_address.email
          ? origin_country_address.email
          : null;
        origin_country_address_obj["OriginCountry"] =
          origin_country_address.origin_country;
        await studentModel.insertIntoStudentAddress(
          origin_country_address_obj,
          res
        );
      }

      /** Below code used to insert data into StudentDocuments Table */
      if (student_document && student_document.length > 0) {
        for (let i = 0; i < student_document.length; i++) {
          if (
            student_document[i] &&
            Object.keys(student_document[i]).length > 0 &&
            student_document[i].file_path != ""
          ) {
            let student_document_obj = {};
            student_document_obj["StudentID"] = student_id;
            student_document_obj["DocumentTypeID"] =
              student_document[i].document_type_id;
            student_document_obj["FilePath"] = student_document[i].file_path;
            await studentModel.insertIntoStudentDocuments(
              student_document_obj,
              res
            );
          }
        }
      }

      /** Below code used to insert data into StudentSchoolCertificateInfo Table */
      if (certificate_info && certificate_info.length > 0) {
        for (let i = 0; i < certificate_info.length; i++) {
          if (
            certificate_info[i] &&
            Object.keys(certificate_info[i]).length > 0
          ) {
            let certificate_info_obj = {};
            certificate_info_obj["StudentID"] = student_id;
            certificate_info_obj["Year"] = certificate_info[i].year;
            certificate_info_obj["Branch"] = certificate_info[i].branch
              ? certificate_info[i].branch
              : null;
            certificate_info_obj["Average"] = certificate_info[i].average;
            certificate_info_obj["Country"] = certificate_info[i].country
              ? certificate_info[i].country
              : null;
            await studentModel.insertIntoStudentSchoolCertificateInfo(
              certificate_info_obj,
              res
            );
          }
        }
      }

      if (student_id) {
        res.status(httpStatus.SUCCESS).json({
          status: "SUCCESS",
          message: "Form Saved Successfully",
        });
      } else {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Failed to save form",
        });
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "FAILED",
        message: "Something went wrong",
        value: "Check the required input fields and data",
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
};

/* controller to GET existing student data by student id  */
exports.getStudentRecord = async (req, res, next) => {
  try {
    if (req.body && req.params.id) {
      let student_id = req.params.id;
      let student_data = await studentModel.getStudentDataById(student_id, res);
      let student_info = {};
      if (student_data && student_data.student_id) {
        student_info = {
          first_name: student_data.first_name,
          last_name: student_data.last_name,
          father_name: student_data.father_name,
          mother_name: student_data.mother_name,
          grand_father_name: student_data.grand_father_name,
          gender: student_data.gender,
          nationality: student_data.nationality,
          birth_date: student_data.birth_date,
          birth_place: student_data.birth_place,
          national_number: student_data.national_number,
          passport_number: student_data.passport_number,
          accomodation: student_data.accomodation,
          email: student_data.email,
          mobile_phone: student_data.mobile_phone,
        };
      }
      let funding_info = {};
      if (student_data.funding && student_data.student_id) {
        funding_info = await studentModel.getStudentFundingDataById(
          student_id,
          res
        );
      }

      let family_info = [];
      let emergency_contact = [];
      let payment_detail = {};
      let local_address = {};
      let origin_country_address = {};
      let student_document = [];
      let certificate_info = [];
      if (student_id) {
        [
          family_info,
          emergency_contact,
          payment_detail,
          local_address,
          origin_country_address,
          student_document,
          certificate_info,
        ] = await Promise.all([
          studentModel.getStudentFamilyDataById(student_id, res),
          studentModel.getEmergencyContactDataById(student_id, res),
          studentModel.getPaymentDetailDataById(student_id, res),
          studentModel.getLocalAddressDataById(student_id, res),
          studentModel.getOriginCountryAddressDataById(student_id, res),
          studentModel.getStudentDocumentsDataById(student_id, res),
          studentModel.getStudCertificateDataById(student_id, res),
        ]);
      }

      let response = {
        student_id: student_id,
        student_info: {
          ...student_info,
        },
        funding: student_data.funding, //if set to false funding_info should be send as {}
        funding_info: {
          ...funding_info,
        },
        family_info: family_info,
        emergency_contact: emergency_contact,
        payment_detail: payment_detail,
        local_address: local_address,
        origin_country_address: origin_country_address,
        student_document: student_document,
        certificate_info: certificate_info,
      };

      res.status(httpStatus.SUCCESS).json({
        status: "SUCCESS",
        data: response,
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "FAILED",
        message: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
};

/* Controller to get Document type list */
exports.getDocumentTypeList = (req, res) => {
  try {
    studentModel
      .getDocumentTypeList(res)
      .then((result) => {
        if (result && result.length > 0) {
          /* Return all data present in DB */
          return res.status(httpStatus.SUCCESS).json({
            status: "SUCCESS",
            result: result,
          });
        } else {
          return res.status(httpStatus.SUCCESS).json({
            status: "SUCCESS",
            result: [],
          });
        }
      })
      .catch((error) => {
        /* Send error */
        return res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          error: error,
        });
      });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
      value: error,
    });
  }
};

/* Controller to get Payment type list */
exports.getPaymentTypeList = (req, res) => {
  try {
    studentModel
      .getPaymentTypeList(res)
      .then((result) => {
        if (result && result.length > 0) {
          /* Return all data present in DB */
          return res.status(httpStatus.SUCCESS).json({
            status: "SUCCESS",
            result: result,
          });
        } else {
          return res.status(httpStatus.SUCCESS).json({
            status: "SUCCESS",
            result: [],
          });
        }
      })
      .catch((error) => {
        /* Send error */
        return res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          error: error,
        });
      });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
      value: error,
    });
  }
};

/* controller to get all existing student list  */
exports.getAllStudentList = async (req, res, next) => {
  try {
    if (req.body && req.body.page_no >= 0 && req.body.page_size) {
      let page_no = req.body.page_no;
      let page_size = req.body.page_size;
      studentModel
        .getAllStudentList(page_no, page_size, res)
        .then((result) => {
          if (result && result.student_list && result.student_list.length > 0) {
            res.status(httpStatus.SUCCESS).json({
              status: "SUCCESS",
              data: result,
            });
          } else {
            res.status(httpStatus.SUCCESS).json({
              status: "SUCCESS",
              data: [],
            });
          }
        })
        .catch((error) => {
          /* Send error */
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "FAILED",
            message: "Something went wrong",
            error: error,
          });
        });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "FAILED",
        message: "Please check the input",
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
};
