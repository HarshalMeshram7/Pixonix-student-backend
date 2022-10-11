module.exports = (sequelize, Sequelize) => {
  const StudentAddress = sequelize.define(
    "StudentAddress",
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
      City: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      Country: {
        type: Sequelize.STRING(255),
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
      BoxNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING(255),
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

  return StudentAddress;
};
