const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION');
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception');
  console.log(err);
  process.exit(1);
});
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connections successfull!');
  });

const port = process.env.PORT || 3000;
// console.log(process.env);
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
