const db = require("../db/schema/index");
const { httpStatus, applicationStatus } = require("../constant/HttpResponse");

/* This function is used to create new student record */
exports.studentRegistration = (studObj, res) => {
  return new Promise(function (resolve, reject) {
    db.student
      .create(studObj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Error while creating student record",
        });
      });
  });
};

/** GET Latest Application Number from Student Table */
exports.getLatestApplicationNo = (res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      select COALESCE(MAX(ApplicationNo), 0) + 1 'ApplicationNo' from Student
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET Status from Status Table */
exports.getStatus = (status_value, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      select * from Status where Status = '${status_value}'
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** Model to get courses list */
exports.getCourseList = (status_value, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `SELECT ID as "id", Concat(Courses , ' - ' , IFNULL(Category,'')) as "course",Fees as "fees" from Courses`,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** Model to get document type list */
exports.getDocumentTypeList = (res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      select ID as "id", DocumentType as "document_type" from DocumentType 
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** Model to get payment type list */
exports.getPaymentTypeList = (res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      select ID as "id", PaymentTypeName as "payment_type" from PaymentType 
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/* This function is used to create new course record for student */
exports.addCourseToStudent = (studObj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_courses
      .create(studObj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Error while creating course student record",
        });
      });
  });
};

/** Student login check up */
exports.studentLogin = (application_no, password, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      select 
      ID as "student_id",
      ApplicationNo as "application_no",
      Password as "password",
      Email as "email",
      MobileNo as "mobile_phone",
      FamilyName as "family_name",
      GrandFatherName as "grand_father_name",
      FatherName as "father_name",
      MotherName as "mother_name",
      Gender as "gender",
      Nationality as "nationality",
      DateofBirth as "date_of_birth",
      PlaceofBirth as "place_of_birth",
      NationalNumber as "national_number",
      PassportNumber as "passport_number",
      Accomodation as "accomodation",
      Funding as "funding",
      FirstName as "first_name" 
      from student where ApplicationNo = ${application_no} and Password like '${password}'
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/* This function is used to delete PaymentDetails table */
exports.deletePaymentDetail = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from PaymentDetails where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 4",
        });
      });
  });
};

/* This function is used to delete StudentFundingInfo table */
exports.deleteStudentFundingInfo = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentFundingInfo where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 1",
        });
      });
  });
};

/* This function is used to delete StudentFamilyInfo table */
exports.deleteStudentFamilyInfo = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentFamilyInfo where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 2",
        });
      });
  });
};

/* This function is used to delete StudentEmergencyPersonContact table */
exports.deleteStudentEmergencyPersonContact = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentEmergencyPersonContact where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 3",
        });
      });
  });
};

/* This function is used to delete StudentAddress table */
exports.deleteLocalStudentAddress = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentAddress where StudentID = ${id} and OriginCountry = 0
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 5",
        });
      });
  });
};

/* This function is used to delete StudentAddress table */
exports.deleteOriginStudentAddress = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentAddress where StudentID = ${id} and OriginCountry = 1
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 6",
        });
      });
  });
};

/* This function is used to delete StudentDocuments table */
exports.deleteStudentDocuments = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentDocuments where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 7",
        });
      });
  });
};

/* This function is used to delete StudentSchoolCertificateInfo table */
exports.deleteStudentSchoolCertificateInfo = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      `
      delete from StudentSchoolCertificateInfo where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.RAW,
      }
    )
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong 8",
        });
      });
  });
};

/* This function is used to update student table record */
exports.updateStudentInfo = (id, stud_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student
      .update(
        { ...stud_obj },
        {
          where: {
            ID: id,
          },
        }
      )
      .then((result) => {
        if (result && result[0] == 0) {
          resolve(false);
        }
        if (result && result[0] == 1) {
          resolve(true);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong update",
        });
      });
  });
};

/* This function is used to insert data in StudentFundingInfo table */
exports.insertIntoFundingInfo = (funding_info_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_funding_info
      .create(funding_info_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong in insertIntoFundingInfo",
        });
      });
  });
};

/* This function is used to insert data in StudentFamilyInfo table */
exports.insertIntoStudentFamilyInfo = (student_family_info_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_family_info
      .create(student_family_info_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong insertIntoStudentFamilyInfo",
        });
      });
  });
};

/* This function is used to insert data in StudentEmergencyPersonContact table */
exports.insertIntoEmergencyPersonContact = (emergency_contact_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_emergency_person_contact
      .create(emergency_contact_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong in insertIntoEmergencyPersonContact",
        });
      });
  });
};

/* This function is used to insert data in PaymentDetails table */
exports.insertIntoPaymentDetails = (payment_detail_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.payment_details
      .create(payment_detail_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong in insertIntoPaymentDetails",
        });
      });
  });
};

/* This function is used to insert data in StudentAddress table */
exports.insertIntoStudentAddress = (student_Address_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_address
      .create(student_Address_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong",
        });
      });
  });
};

/* This function is used to insert data in StudentDocuments table */
exports.insertIntoStudentDocuments = (student_document_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_documents
      .create(student_document_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong",
        });
      });
  });
};

/* This function is used to insert data in StudentSchoolCertificateInfo table */
exports.insertIntoStudentSchoolCertificateInfo = (certificate_obj, res) => {
  return new Promise(function (resolve, reject) {
    db.student_school_certificate_info
      .create(certificate_obj)
      .then((result) => {
        if (result && result.dataValues) {
          resolve(result.dataValues);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          message: "Something went wrong",
        });
      });
  });
};

/** GET data from student Table by id */
exports.getStudentDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      ID as "student_id",
      FirstName as "first_name",
      FamilyName as "last_name", 
      FatherName as "father_name",
      MotherName as "mother_name",
      GrandFatherName as "grand_father_name",
      Gender as "gender",
      Nationality as "nationality",
      date_format(DateofBirth , "%Y-%m-%d") as "birth_date",
      PlaceofBirth as "birth_place",
      NationalNumber as "national_number",
      PassportNumber as "passport_number",
      Accomodation as "accomodation",
      Email as "email",
      MobileNo as "mobile_phone",
      Funding as "funding"
      from student where id = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data from studentfunding Table by student id */
exports.getStudentFundingDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      Name as "name",
      JobName as "job_name",
      WorkTelNo as "work_tel_no",
      Email as "email",
      BoxNo as "box_no",
      FaxNo as "fax_no",
      OriginCountry as "origin_country"
      from StudentFundingInfo where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data from StudentFamilyInfo Table by student id */
exports.getStudentFamilyDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      Name as "name",
      City as "city",
      Country as "country",
      JobTelNo as "job_tel_no",
      HomeTelNo as "home_tel_no",
      MobileNo as "mobile_no",
      Email as "email",
      FamilyMember as "family_member"
      from StudentFamilyInfo where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data from StudentEmergencyPersonContact Table by student id */
exports.getEmergencyContactDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      Name as "name",
      Relative as "relative",
      MobileNo as "mobile_no",
      Address as "address"
      from StudentEmergencyPersonContact where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data from PaymentDetails Table by student id */
exports.getPaymentDetailDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      PD.PaymentTypeID as "payment_type_id",
      PD.Name as "name",
      PD.PaymentNo as "payment_no",
      PD.Fees as "fees",
      PD.TransactionNo as "transaction_no",
      PT.PaymentTypeName as "payment_type_name",
      date_format(PD.TransationDateTime , "%Y-%m-%d") as "transation_datetime"
      from PaymentDetails PD
      LEFT JOIN PaymentType PT ON PD.PaymentTypeID = PT.ID 
      where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET local_address from StudentAddress Table by student id */
exports.getLocalAddressDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      City as "city",
      Country as "country",
      HomeTelNo as "home_tel_no",
      MobileNo as "mobile_no",
      BoxNo as "box_no", 
      Email as "email",
      OriginCountry as "origin_country"
      from StudentAddress 
      where StudentID = ${id} and  OriginCountry = 0
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET origin_country_address from StudentAddress Table by student id */
exports.getOriginCountryAddressDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
      select 
      City as "city",
      Country as "country",
      HomeTelNo as "home_tel_no",
      MobileNo as "mobile_no",
      BoxNo as "box_no", 
      Email as "email",
      OriginCountry as "origin_country"
      from StudentAddress 
      where StudentID = ${id} and  OriginCountry = 1
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data from StudentDocuments Table by student id */
exports.getStudentDocumentsDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
       select 
       SD.DocumentTypeID as "document_type_id",
       SD.FilePath as "file_path",
       DT.DocumentType as "document_type_name"
       from StudentDocuments SD
       INNER JOIN DocumentType DT ON DT.ID = SD.DocumentTypeID
       where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data from StudentSchoolCertificateInfo Table by student id */
exports.getStudCertificateDataById = (id, res) => {
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
       select 
       Year as "year",
       Branch as "branch",
       Average as "average",
       Country as "country"
       from StudentSchoolCertificateInfo
       where StudentID = ${id}
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};

/** GET data of all existing student list */
exports.getAllStudentList = (page_no, page_size, res) => {
  let offset = "";
  if (page_size && page_no != undefined && page_no >= 0) {
    offset = page_no * page_size;
  }
  return new Promise(function (resolve, reject) {
    db.Sequelize.query(
      ` 
          select 
          DISTINCT
          COUNT(*) OVER () as "totalcount",
          S.ID as "student_id", 
          S.FirstName as "first_name",
          S.FamilyName as "last_name", 
          S.Email as "email", S.MobileNo as "mobile_phone",
          convert(varchar(10),S.DateofBirth , 101) as "birth_date",
          S.Nationality as "nationality",
          S.NationalNumber as "national_number", S.PassportNumber as "passport_number",
          C.Id as "course_id", C.Courses as "course_name",
          isnull (C.Fees,null) as "course_fee",
          isnull (PD.Name,'-') as "payment_name",
          isnull (PD.PaymentNo,'-') as "payment_no",
          isnull (PD.TransactionNo,'-') as "transaction_no",
          isnull (PD.Fees,null) as "fees",
          isnull (PT.PaymentTypeName,'-') as "payment_type_name",
          convert(varchar(10),PD.DateTimeStamp , 101) as "payment_date"
          from Student S
          INNER JOIN StudentCourses SC ON SC.StudentID = S.ID
          INNER JOIN Courses C ON C.ID = SC.CoursesID
          LEFT JOIN PaymentDetails PD ON PD.StudentID = S.ID
          LEFT JOIN PaymentType PT ON PT.ID = PD.PaymentTypeID
          order by S.ID desc
          OFFSET ${offset} ROW FETCH NEXT ${page_size} ROWS ONLY
        `,
      {
        replacements: [],
        type: db.Sequelize.QueryTypes.SELECT,
      }
    )
      .then((data) => {
        if (data && data.length > 0) {
          let response = {
            student_list: data,
            totalcount: data[0].totalcount,
          };
          resolve(response);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "FAILED",
          message: "Something went wrong",
          value: error,
        });
      });
  });
};
