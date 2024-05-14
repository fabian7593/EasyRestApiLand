import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

//add necessary variables
const app = express();
app.use(cors());
app.use(bodyParser.json());


//Open port and listen API
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log('test');
});

