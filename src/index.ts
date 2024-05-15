import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './Entities/users/UserRouter';
import udcRouter from './Entities/udcs/UdcRouter';
import emailRouter from './Entities/emails/EmailRouter';
import notificationRouter from './Entities/notifications/NotificationRoute'
import userNotificationRouter from './Entities/notifications/UserNotificationRoute'
import DocumentRoute from './Entities/documents/DocumentRoute'
import LogRoute from './Entities/logs/LogsRoute'

import {debuggingMessage} from './Utils/logsUtils';
import "reflect-metadata";
import StartMiddleware from './Middleware/StartMiddleware';

//add necessary variables
const app = express();
app.use(cors());
app.use(bodyParser.json());

//MiddleWare
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use(StartMiddleware);

//Add Routers
app.use(userRouter);
app.use(udcRouter);
app.use(DocumentRoute);
app.use(emailRouter);
app.use(notificationRouter);
app.use(userNotificationRouter);
app.use(LogRoute);

//Open port and listen API
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  debuggingMessage(`EASY REST API LAND Express TypeScript Service Start in Port ${PORT}`);
});

