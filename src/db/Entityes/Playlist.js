const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Playlist",
  columns: {
    idPlaylist: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar",
      nullable: false
    },
    favourite: {
      type: "boolean",
      default: false
    }
  },
  relations: {
    songs: {
      target: "Song",
      type: "many-to-many",
      joinTable: true,
      cascade: true
    },
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      cascade: true
    },
    typeofplaylist: {
      type: "many-to-one",
      target: "TypeOfPlaylist",
      joinColumn: true
    }
  }
});
