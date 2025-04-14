module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/jobtrackr.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  }
};
