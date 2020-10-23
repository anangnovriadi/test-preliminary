"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
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
      tableName: "users",
      timestamps: false
    }
  );
};
