import PgPromise from 'pg-promise';

async function sleep(delayAmount: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, delayAmount);
  });
}

const initialDelay = 250;
const maxAttempts = 10;

export default async function waitForPostgres<Ext>(db: PgPromise.IDatabase<Ext>): Promise<void> {
  let delay = initialDelay;

  for (let count = 0; count < maxAttempts; count++) {
    process.stdout.write(`Connection attempt: ${count}\n`);

    let connection;
    try {
      connection = await db.connect();

      // Try a dummy query to see if Postgres is accepting connections
      await connection.query('SELECT VERSION();', undefined, PgPromise.queryResult.one);
      process.stdout.write('Connection to Postgres succeeded.\n');

      return;
    } catch (error) {
      process.stderr.write(`Connection failure: ${error}\n`);

      if (connection) {
        connection.done();
        connection = undefined;
      }

      await sleep(delay);
      delay *= 2;
    } finally {
      if (connection) {
        connection.done();
      }
    }
  }

  return Promise.reject(new Error('Could not establish connection to Postgres.'));
}
