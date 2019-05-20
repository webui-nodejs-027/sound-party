const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Genre",
  columns: {
    idGenre: {
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
