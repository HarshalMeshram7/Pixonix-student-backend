module.exports = (sequelize, Sequelize) => {
  const PaymentType = sequelize.define(
    "PaymentType",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      PaymentTypeName: {
        type: Sequelize.STRING(255),
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

  return PaymentType;
};
