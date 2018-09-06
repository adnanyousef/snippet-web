module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "snippets_db",
    "host": "127.0.0.1",
    "port": 8889,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": process.env.JAWSDB_URL
  }
};
