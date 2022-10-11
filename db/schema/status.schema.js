module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define(
    "Status",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Status: {
        type: Sequelize.STRING(55),
        allowNull: false,
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

  return Status;
};
