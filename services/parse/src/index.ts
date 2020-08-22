import express from 'express';
import { ParseServer } from 'parse-server';
import PgPromise from 'pg-promise';
import { config } from 'dotenv-safe';

import waitForPostgres from './waitForPostgres';

config();

const pgp = PgPromise();
const db = pgp(process.env.PARSE_DATABASE_URL!);

waitForPostgres(db)
  .then(() => {
    const api = new ParseServer({
      appId: process.env.PARSE_APP_ID,
      masterKey: process.env.PARSE_MASTER_KEY,
      serverURL: process.env.PARSE_SERVER_URL,
      publicServerURL: process.env.PARSE_SERVER_URL,
      fileKey: 'myFileKey',
      databaseURI: process.env.PARSE_DATABASE_URL,
      webhookKey: process.env.PARSE_WEBHOOK_KEY,
      logsFolder: null,
      logLevel: process.env.PARSE_LOG_LEVEL || 'warn',
    });

    // Serve the Parse API at /parse URL prefix
    const app = express();
    app.use('/parse', api);

    const port = 3001;
    app.listen(port, () => {
      console.log(`parse-server-example running on port ${port}`);
    });
  })
  .catch((error) => {
    process.stderr.write(String(error) + '\n');
    if (error instanceof Error) {
      process.stderr.write(error.stack + '\n');
    }
    process.exit(1);
  });
