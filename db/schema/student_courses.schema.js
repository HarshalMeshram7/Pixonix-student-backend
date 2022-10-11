module.exports = (sequelize, Sequelize) => {
  const StudentCourses = sequelize.define(
    "StudentCourses",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      CoursesID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      StudentID: {
        type: Sequelize.INTEGER,
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

  return StudentCourses;
};
