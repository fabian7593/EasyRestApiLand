import { Router, Request, Response } from "express";
import { UnitsDynamicCentral } from '../../../models_type_orm/entities/UnitsDynamicCentral'
import GenericController from "../../Generics/Controller/GenericController";
import ControllerObject from "../../Objects/ControllerObject";
import UdcAdapter from "./UdcAdapter";
import RequestHandler from "../../Generics/RequestHandler/RequestHandler";
import RequestHandlerBuilder from "../../Generics/RequestHandler/RequestHandlerBuilder";

const route = Router();

const controllerObj: ControllerObject = {
    create: "UDC_CREATE",
    update: "UDC_UPDATE",
    delete: "UDC_DELETE",
    getAll: "UDC_READ",
    getById: "UDC_GET_BY_ID",
    controller: "UdcController"
};

const controller = new GenericController(UnitsDynamicCentral, controllerObj);

route.get("/udc/get", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new UdcAdapter(req))
                            .setMethod("getUdcById")
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getById(requestHandler);
});

route.get("/udc/get_by_code", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new UdcAdapter(req))
                            .setMethod("getUdcByCode")
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getByCode(requestHandler);
});

route.get("/udc/get_all", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new UdcAdapter(req))
                            .setMethod("getUdcs")
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getAll(requestHandler);
});

route.post("/udc/add", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new UdcAdapter(req))
                            .setMethod("insertUdc")
                            .isValidateRole()
                            .build();

    controller.insert(requestHandler);
});

route.put("/udc/edit", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new UdcAdapter(req))
                            .setMethod("updateUdc")
                            .isValidateRole()
                            .build();

    controller.update(requestHandler);
});

route.delete("/udc/delete", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new UdcAdapter(req))
                            .setMethod("deleteUdc")
                            .isValidateRole()
                            .isLogicalRemove()
                            .isValidateWhereByUserId()
                            .build();

    controller.delete(requestHandler);
});

export default route;