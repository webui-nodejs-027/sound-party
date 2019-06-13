define({ "api": [
  {
    "type": "post",
    "url": "/playlists/:id/addsong/:songId",
    "title": "Add song to playlist",
    "name": "AddSongToPlaylist",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of playlist.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "songId",
            "description": "<p>Identifier of song.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "songs",
            "description": "<p>Songs in the playlist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    [\n    {\n        \"id\": 22,\n        \"name\": \"Peter's playlist\",\n        \"favourite\": true,\n        \"isMain\": false,\n        \"userId\": 1,\n        \"songs\": [\n            {\n                \"id\": 5,\n                \"name\": \"Song4\",\n                \"source\": \"file://localhost/d:/storage/song4.mp3\",\n                \"year\": 1992,\n                \"authorId\": 3,\n                \"genreId\": 2\n            }\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"id\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n    {\n    \"errors\": \"Song 1 already exists in playlist 4\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists/:id/addsong/:songId"
      }
    ]
  },
  {
    "type": "post",
    "url": "/playlists",
    "title": "Create new playlist",
    "version": "0.0.0",
    "name": "CreateData",
    "group": "Playlist",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nbody:\n{\n  \"name\": \"Peter's playlist\",\n  \"favourite\": true,\n  \"isMain\": false,\n   \"userId\": 1\n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Playlist's Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Favourite playlist or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Main playlist or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n \"name\": \"Peter's playlist\",\n    \"favourite\": true,\n    \"isMain\": false,\n    \"userId\": 1,\n    \"id\": 22\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation Failed\",\n    \"errors\": [\n        {\n            \"location\": \"body\",\n            \"param\": \"userId\",\n            \"value\": true,\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/playlists/:id",
    "title": "Delete playlist by id",
    "version": "0.0.0",
    "name": "DeleteData",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n1",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"id\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/playlists",
    "title": "Request info about all playlists",
    "name": "GetAllData",
    "group": "Playlist",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n     \"id\": 1,\n        \"name\": \"Aleksandr`s playlist\",\n        \"favourite\": true,\n        \"isMain\": false,\n        \"userId\": 1\n    },\n {\n     \"id\": 2,\n        \"name\": \"Aleksandr`s playlist\",\n        \"favourite\": true,\n        \"isMain\": false,\n        \"userId\": 1\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists"
      }
    ]
  },
  {
    "type": "get",
    "url": "/playlists/:id/users/:userId",
    "title": "Request info about one playlist for user",
    "name": "GetDataByPlaylistIdAndUserId",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of playlist.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": 1,\n    \"name\": \"Aleksandr`s playlist\",\n    \"favourite\": true,\n    \"isMain\": false,\n    \"userId\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"id\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists/:id/users/:userId"
      }
    ]
  },
  {
    "type": "get",
    "url": "/playlists/:userId",
    "title": "Get all playlists by user id",
    "version": "0.0.0",
    "name": "GetDataByUserId",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n [\n    {\n        \"id\": 1,\n        \"name\": \"Aleksandr`s playlist\",\n        \"favourite\": true,\n        \"isMain\": false,\n        \"userId\": 1\n    },\n    {\n        \"id\": 2,\n        \"name\": \"Aleksandr`s playlist\",\n        \"favourite\": false,\n        \"isMain\": true,\n        \"userId\": 1\n    },\n    {\n        \"id\": 22,\n        \"name\": \"Peter's playlist\",\n        \"favourite\": true,\n        \"isMain\": false,\n        \"userId\": 1\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"userId\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists/:userId"
      }
    ]
  },
  {
    "type": "post",
    "url": "/playlists/:id/removesong/:songId",
    "title": "Removesong from playlist",
    "name": "RemoveSongFromPlaylist",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of playlist.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "songId",
            "description": "<p>Identifier of song.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "songs",
            "description": "<p>Songs in the playlist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    [\n    {\n        \"id\": 22,\n        \"name\": \"Peter's playlist\",\n        \"favourite\": true,\n        \"isMain\": false,\n        \"userId\": 1,\n        \"songs\": []\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Doesn",
            "description": "<p>'tExist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"id\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n   {\n    \"errors\": \"Song 5 does not exist in playlist 22\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists/:id/removesong/:songId"
      }
    ]
  },
  {
    "type": "put",
    "url": "/playlists/:id",
    "title": "Update playlist by id",
    "version": "0.0.0",
    "name": "UpdateData",
    "group": "Playlist",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nbody:\n{\n  \"name\": \"Peter's playlist\",\n  \"favourite\": true\n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Playlist's Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Favourite playlist or not.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "favourite",
            "description": "<p>Is playlist favourite or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isMain",
            "description": "<p>Is playlist main or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Identifier of user who has this playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n\"id\": 23,\n   \"name\": \"my playlist\",\n   \"favourite\": true,\n   \"isMain\": false,\n   \"userId\": 3",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"body\",\n            \"param\": \"favourite\",\n            \"value\": 7,\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlistRoute.js",
    "groupTitle": "Playlist",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/playlists/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Log in to app",
    "version": "0.0.0",
    "name": "CreateData",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nbody:\n{\n    \"email\": \"aleksandr.snow10@gmail.com\",\n    \"password\":\"H3Phtyroe67FO890\"\n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>is it done or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>result of authentication.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"succes\": true,\n    \"message\": \"Authentication succesful\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGVJZCI6MSwiaWF0IjoxNTU5ODE2MDMzLCJleHAiOjE1NTk5MDI0MzN9.4e9JBRxIlxxTeq68ZanYZ32RYmI8fBbQ9lpMRNdOpc0\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DoesntFound",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation Failed\",\n    \"errors\": [\n        {\n            \"location\": \"body\",\n            \"param\": \"email\",\n            \"value\": true,\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\nUser doesnt found",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/userRoute.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "version": "0.0.0",
    "name": "CreateData",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nbody:\n{\n    \"firstName\": \"Aleksandr\",\n    \"lastName\": \"Snow\",\n    \"email\": \"aleksandr.snow10@gmail.com\",\n    \"password\":\"H3Phtyroe67FO890\",\n    \"birthday\": \"1995-03-26\",\n    \"gender\": \"male\",\n    \"socialLink\": \"https://www.instagram.com/aleksandr_snow\",\n    \"roleId\": 1\n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of  user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "socialLink",
            "description": "<p>Link to social network of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Identifier of role which user has.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of  user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "socialLink",
            "description": "<p>Link to social network of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Identifier of role which user has.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"firstName\": \"Aleksandr\",\n    \"lastName\": \"Snow\",\n    \"email\": \"aleksandr.snow10@gmail.com\",\n    \"birthday\": \"1995-03-26\",\n    \"gender\": \"male\",\n    \"socialLink\": \"https://www.instagram.com/aleksandr_snow\",\n    \"roleId\": 1,\n    \"id\": 11\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation Failed\",\n    \"errors\": [\n        {\n            \"location\": \"body\",\n            \"param\": \"email\",\n            \"value\": true,\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/userRoute.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete user by id",
    "version": "0.0.0",
    "name": "DeleteData",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n1",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"id\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/userRoute.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request info about all users",
    "name": "GetAllData",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of  user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "socialLink",
            "description": "<p>Link to social network of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Identifier of role which user has.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n        \"id\": 1,\n        \"firstName\": \"Aleksandr\",\n        \"lastName\": \"Snow\",\n        \"email\": \"aleksandr.snow0@gmail.com\",\n        \"birthday\": \"1995-03-26\",\n        \"gender\": \"male\",\n        \"socialLink\": \"https://www.instagram.com/aleksandr_snow\",\n        \"roleId\": 1\n    },\n    {\n        \"id\": 2,\n        \"firstName\": \"Anna\",\n        \"lastName\": \"Doe\",\n        \"email\": \"anna.doe1@gmail.com\",\n        \"birthday\": \"1995-03-25\",\n        \"gender\": \"female\",\n        \"socialLink\": \"https://www.instagram.com/anna_doe\",\n        \"roleId\": 2\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/userRoute.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get user by id",
    "version": "0.0.0",
    "name": "GetDataById",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of  user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "socialLink",
            "description": "<p>Link to social network of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Identifier of role which user has.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n       \"id\": 2,\n       \"firstName\": \"Anna\",\n       \"lastName\": \"Doe\",\n       \"email\": \"anna.doe1@gmail.com\",\n       \"birthday\": \"1995-03-25\",\n       \"gender\": \"female\",\n       \"socialLink\": \"https://www.instagram.com/anna_doe\",\n       \"roleId\": 2\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"params\",\n            \"param\": \"id\",\n            \"value\": \"hi\",\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/userRoute.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update playlist by id",
    "version": "0.0.0",
    "name": "UpdateData",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nbody:\n{\n    \"firstName\": \"Aleksandr\",\n    \"lastName\": \"Snow\",\n    \"email\": \"aleksandr.snow10@gmail.com\",\n    \"birthday\": \"1995-03-26\",\n    \"gender\": \"male\",\n    \"socialLink\": \"https://www.instagram.com/aleksandr_snow\",\n    \"roleId\": 1\n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of  user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "socialLink",
            "description": "<p>Link to social network of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Identifier of role which user has.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifier of  user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-main of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "socialLink",
            "description": "<p>Link to social network of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Identifier of role which user has.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"firstName\": \"Aleksandr\",\n    \"lastName\": \"Snow\",\n    \"email\": \"aleksandr.snow10@gmail.com\",\n    \"birthday\": \"1995-03-26\",\n    \"gender\": \"male\",\n    \"socialLink\": \"https://www.instagram.com/aleksandr_snow\",\n    \"roleId\": 1,\n    \"id\": 11\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Bad Request\n    {\n    \"message\": \"Validation failed\",\n    \"errors\": [\n        {\n            \"location\": \"body\",\n            \"param\": \"email\",\n            \"value\": 7,\n            \"msg\": \"Invalid value\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/userRoute.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/:id"
      }
    ]
  }
] });
