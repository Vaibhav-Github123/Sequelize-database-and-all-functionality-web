module.exports = (connection, DataTypes, User) => {
  const ProductSchema = {
    c_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    qty: {
      type: DataTypes.DOUBLE,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.BLOB,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  };

  const product = connection.define("Product", ProductSchema, {
    indexes: [{ unique: true, fields: ["id"] }],
    parenoid: true,
  });

  return product;
};
