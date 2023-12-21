module.exports = (connection, DataTypes) => {
  const userSchema = {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  };

  const user = connection.define("User", userSchema, {
    indexes: [{ unique: true, fields: ["id", "email"] }],
    parenoid: false,
    modelName: "users",
  });

  return user;
};
