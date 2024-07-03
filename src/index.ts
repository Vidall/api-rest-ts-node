import { server } from './server/Server';
import { knex } from './server/database/knex';

/* eslint-disable no-undef */
const startServer = () => {
  server.listen(process.env.PORT||3000, () => {
    console.log(`App rodando na porta ${process.env.PORT||3000}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  knex.migrate.latest()
    .then(() => {
      knex.seed.run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
};
