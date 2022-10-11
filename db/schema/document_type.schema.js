module.exports = (sequelize, Sequelize) => {
  const DocumentType = sequelize.define(
    "DocumentType",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      DocumentType: {
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

  return DocumentType;
};
