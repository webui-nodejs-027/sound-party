const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "City",
  columns: {
    idCity: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar",
      nullable: false
    }
  }
});
