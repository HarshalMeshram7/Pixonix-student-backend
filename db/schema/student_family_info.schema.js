module.exports = (sequelize, Sequelize) => {
  const StudentFamilyInfo = sequelize.define(
    "StudentFamilyInfo",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      StudentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      City: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      Country: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      JobTelNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      HomeTelNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      MobileNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      FamilyMember: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

  return StudentFamilyInfo;
};
