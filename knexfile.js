// Update with your config settings.

module.exports = {

  development: {
    debug: true,
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
  },

  test: {
    debug: true,
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
};
