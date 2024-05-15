import express, { Router, Request, Response } from "express";
import ControllerObject from "../../Objects/ControllerObject";
import RequestHandler from "../../Generics/RequestHandler/RequestHandler";
import RequestHandlerBuilder from "../../Generics/RequestHandler/RequestHandlerBuilder";
import NotificationAdapter from "./NotificationAdapter";
import GenericController from "../../Generics/Controller/GenericController";
import { Notifications } from "../../../models_type_orm/entities/Notifications";



const route = Router();

const controllerObj: ControllerObject = {
    create: "NOTIFICATION_CREATE",
    update: "NOTIFICATION_UPDATE",
    delete: "NOTIFICATION_DELETE",
    getAll: "NOTIFICATION_READ",
    getById: "NOTIFICATION_GET_BY_ID",
    controller: "NotificationController"
};

const controller = new GenericController(Notifications, controllerObj);


route.get("/notification/get", async (req: Request, res: Response) => {
  
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new NotificationAdapter(req))
                            .setMethod("getNotificationById")
                            .isValidateRole()
                            .build();

    controller.getById(requestHandler);
});

route.get("/notification/get_by_code", async (req: Request, res: Response) => {
  
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new NotificationAdapter(req))
                            .setMethod("getNotificationByCode")
                            .isValidateRole()
                            .build();

    controller.getByCode(requestHandler);
});

route.get("/notification/get_all", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new NotificationAdapter(req))
                            .setMethod("getNotifications")
                            .isValidateRole()
                            .build();

    controller.getAll(requestHandler);
});

route.post("/notification/add", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new NotificationAdapter(req))
                            .setMethod("insertNotification")
                            .isValidateRole()
                            .build();

    controller.insert(requestHandler);
});

route.put("/notification/edit",  async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new NotificationAdapter(req))
                            .setMethod("updateNotification")
                            .isValidateRole()
                            .isValidateWhereByUserId()
                            .build();

    controller.update(requestHandler);
});


route.delete("/notification/delete", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new NotificationAdapter(req))
                            .setMethod("deleteNotification")
                            .isValidateRole()
                            .build();

    controller.delete(requestHandler);
});
export default route;