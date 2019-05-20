const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "City",
  columns: {
    id: {
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
