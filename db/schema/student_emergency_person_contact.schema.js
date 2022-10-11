module.exports = (sequelize, Sequelize) => {
  const StudentEmergencyPersonContact = sequelize.define(
    "StudentEmergencyPersonContact",
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
      Relative: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      MobileNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Address: {
        type: Sequelize.STRING(255),
        allowNull: true,
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

  return StudentEmergencyPersonContact;
};
