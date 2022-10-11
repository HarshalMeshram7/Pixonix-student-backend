module.exports = (sequelize, Sequelize) => {
  const PaymentDetails = sequelize.define(
    "PaymentDetails",
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
      PaymentTypeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      PaymentNo: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },
      Fees: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      TransactionNo: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      DateTimeStamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      TransationDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
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

  return PaymentDetails;
};
