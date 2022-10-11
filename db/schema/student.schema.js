module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define(
    "Student",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ApplicationNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      MobileNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      FamilyName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      GrandFatherName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      FatherName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      FirstName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      MotherName: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      Gender: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Nationality: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      DateofBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      PlaceofBirth: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      NationalNumber: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      PassportNumber: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Accomodation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      Funding: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      StatusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DateTimeStamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      indexes: [
        // Create a unique index on ID
        {
          unique: true,
          fields: ["ID"],
        },
      ],
    },
    {
      timestamps: false,
    }
  );

  return Student;
};
