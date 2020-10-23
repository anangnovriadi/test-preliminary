"use strict";

module.exports = function(sequelize, DataTypes) {
  const tasks = sequelize.define(
    "tasks",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      task: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "tasks",
      timestamps: false
    }
  );

  tasks.associate = function(models) {
    tasks.belongsTo(models.users, { foreignKey: "user_id", as: "users" });
  };

  return tasks;
};
