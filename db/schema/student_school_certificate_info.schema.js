module.exports = (sequelize, Sequelize) => {
  const StudentSchoolCertificateInfo = sequelize.define(
    "StudentSchoolCertificateInfo",
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
      Year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Branch: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Average: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      Country: {
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

  return StudentSchoolCertificateInfo;
};
