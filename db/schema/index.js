/*
 * This file is used for configure the tables
 */

const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
var fs = require("fs");

const sequelize = new Sequelize(
  dbConfig.DBNAME,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    ssl: true,
    dialectOptions: {
      ssl: { ca: fs.readFileSync("db/schema/DigiCertGlobalRootCA.crt.pem") },
      // options: {
      //   requestTimeout: 3000000,
      //   connectTimeout: 6000000,
      //   multipleStatements: true,
      // },
    },
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully...!!!");
  } catch (error) {
    console.error("Unable to connect database:", error);
  }
})();

const db = {};

db.Sequelize = sequelize;

/**************************  importing Schema **********************************/
db.student = require("./student.schema")(sequelize, Sequelize);
db.student_documents = require("./student_documents.schema")(
  sequelize,
  Sequelize
);
db.document_type = require("./document_type.schema")(sequelize, Sequelize);
db.status = require("./status.schema")(sequelize, Sequelize);
db.courses = require("./courses.schema")(sequelize, Sequelize);
db.student_address = require("./student_address")(sequelize, Sequelize);
db.student_courses = require("./student_courses.schema")(sequelize, Sequelize);
db.student_emergency_person_contact =
  require("./student_emergency_person_contact.schema")(sequelize, Sequelize);
db.student_family_info = require("./student_family_info.schema")(
  sequelize,
  Sequelize
);
db.student_funding_info = require("./student_funding_info.schema")(
  sequelize,
  Sequelize
);
db.student_school_certificate_info =
  require("./student_school_certificate_info.schema")(sequelize, Sequelize);
db.payment_details = require("./payment_details.schema")(sequelize, Sequelize);
db.payment_type = require("./payment_type.schema")(sequelize, Sequelize);

/******************* Assigning relationship to existing schema   ******************/
db.student_documents.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});
db.student_documents.belongsTo(db.document_type, {
  foreignKey: "DocumentTypeID",
  targetKey: "ID",
});

db.student.belongsTo(db.status, {
  foreignKey: "StatusID",
  targetKey: "ID",
});

db.student_family_info.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});

db.student_address.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});

db.student_funding_info.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});

db.student_emergency_person_contact.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});

db.student_courses.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});

db.student_courses.belongsTo(db.courses, {
  foreignKey: "CoursesID",
  targetKey: "ID",
});

db.student_school_certificate_info.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});

db.payment_details.belongsTo(db.student, {
  foreignKey: "StudentID",
  targetKey: "ID",
});
db.payment_details.belongsTo(db.payment_type, {
  foreignKey: "PaymentTypeID",
  targetKey: "ID",
});
console.log("*** Table relationship added...");

module.exports = db;
