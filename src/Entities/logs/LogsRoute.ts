import express, { Router, Request, Response } from "express";
import ControllerObject from "../../Objects/ControllerObject";
import RequestHandler from "../../Generics/RequestHandler/RequestHandler";
import RequestHandlerBuilder from "../../Generics/RequestHandler/RequestHandlerBuilder";

import GenericController from "../../Generics/Controller/GenericController";
import { Logs } from "../../../models_type_orm/entities/Logs";
import LogsAdapter from "./LogsAdapter";
import LogsController from "./LogsController";

const route = Router();

const controllerObj: ControllerObject = {
    create: "LOG_CREATE",
    update: "LOG_UPDATE",
    delete: "LOG_DELETE",
    getAll: "LOG_READ",
    getById: "LOG_GET_BY_ID",
    controller: "LogController"
};

const controller = new LogsController(Logs, controllerObj);

route.get("/log/get_by_filters", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new LogsAdapter(req))
                            .setMethod("getLogsByFilter")
                            .isValidateRole()
                            .build();

    controller.getByFilters(requestHandler);
});

route.post("/log/add", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new LogsAdapter(req))
                            .setMethod("insertLog")
                            .isValidateRole()
                            .build();

    controller.insert(requestHandler);
});

export default route;