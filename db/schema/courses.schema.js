module.exports = (sequelize, Sequelize) => {
  const Courses = sequelize.define(
    "Courses",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Courses: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },
      Fees: {
        type: Sequelize.DECIMAL,
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

  return Courses;
};
