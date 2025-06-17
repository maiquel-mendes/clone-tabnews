const database = require("infra/database.js");

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersionResult = await database.query(`SHOW server_version;`);
  const dbVersion = dbVersionResult.rows[0].server_version;

  const dbMaxConnResult = await database.query(`SHOW max_connections;`);
  const dbMaxConn = dbMaxConnResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const dbOpenedConnsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const dbOpenedConns = dbOpenedConnsResult.rows[0].count;

  console.log(dbVersion, dbMaxConn, dbOpenedConns);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: parseInt(dbMaxConn),
        opened_connections: dbOpenedConns,
      },
    },
  });
}

export default status;
