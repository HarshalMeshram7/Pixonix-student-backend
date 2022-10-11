module.exports = (sequelize, Sequelize) => {
  const StudentFundingInfo = sequelize.define(
    "StudentFundingInfo",
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
      JobName: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      WorkTelNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      BoxNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      FaxNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      OriginCountry: {
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

  return StudentFundingInfo;
};
