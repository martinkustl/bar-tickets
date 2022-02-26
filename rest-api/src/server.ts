// import { build } from './app';
import 'reflect-metadata';
import App from './app';

(async () => {
  const app = new App({ logger: true }).app;
  try {
    await app.listen(3001, '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    await app.close();
    process.exit(1);
  }
})();
