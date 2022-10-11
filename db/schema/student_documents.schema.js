module.exports = (sequelize, Sequelize) => {
  const StudentDocuments = sequelize.define(
    "StudentDocuments",
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
      DocumentTypeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      FilePath: {
        type: Sequelize.STRING(255),
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

  return StudentDocuments;
};
