module.exports = (connection, DataTypes, Product) => {
  const categorieySchema = {
    catname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
  };

  const categoriey = connection.define("Categoriey", categorieySchema,{
    indexes: [{ unique: true, fields: ["id"] }],
    parenoid: true,
  });

  return categoriey;
};









{/* <div>
<label for="">Categoriey Name</label>
<div>
    <select name="cid" id="">
    <%if(categoriey.id){%>
            <option value="<%= categoriey.id%>">
                <%=categoriey.catname%>
            </option>
            <%}%>
        </select>
</div>
</div> */}