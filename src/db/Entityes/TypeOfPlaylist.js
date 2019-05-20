const EntitySchema = require("typeorm").EntitySchema;
const TypeOfListModel = require("../Models/TypeOfPlaylistModel");

module.exports = new EntitySchema({
  name: "TypeOfPlaylist",
  target: TypeOfListModel,
  columns: {
    idType: {
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
