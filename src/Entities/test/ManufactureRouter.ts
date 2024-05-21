import { Router, Request, Response } from "express";
//import { Manufactures } from '../../../models_type_orm/entities/Manufactures'
import GenericController from "../../Generics/Controller/GenericController";
import ControllerObject from "../../Objects/ControllerObject";
import ManufactureAdapter from "./ManufactureAdapter";
import RequestHandler from "../../Generics/RequestHandler/RequestHandler";
import RequestHandlerBuilder from "../../Generics/RequestHandler/RequestHandlerBuilder";
import { getUrlParam } from "../../Utils/generalUtils";
import { FindManyOptions  } from "typeorm";

const route = Router();

const controllerObj: ControllerObject = {
    create: "MANUFACTURE_CREATE",
    update: "MANUFACTURE_UPDATE",
    delete: "MANUFACTURE_DELETE",
    getAll: "MANUFACTURE_READ",
    getById: "MANUFACTURE_READ",
    controller: "ManufactureController"
};

/*const controller = new GenericController(Manufactures, controllerObj);

route.get("/manufacture/get", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new ManufactureAdapter(req))
                            .setMethod("getManufactureById")
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getById(requestHandler);
});

route.get("/manufacture/get_by_code", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new ManufactureAdapter(req))
                            .setMethod("getManufactureByCode")
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getByCode(requestHandler);
});

route.get("/manufacture/get_all", async (req: Request, res: Response) => {

    const countryParam : string | null = getUrlParam("country", req) || null;
    const industryParam : string | null = getUrlParam("industry_type", req) || null;

    const filters: FindManyOptions = {};
    if(industryParam != null){
        filters.where = { ...filters.where, udcIndustryType: industryParam};
    }

    if(countryParam != null){
        filters.where = { ...filters.where, countryIsoCode: countryParam};
    }

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new ManufactureAdapter(req))
                            .setMethod("getManufactures")
                            .setFilters(filters)
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getAll(requestHandler);
});

route.post("/manufacture/add", async (req: Request, res: Response) => {

    const regexValidationList: [string, string][] = [
        ['EMAIL_REGEX', req.body.email as string]
    ];

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new ManufactureAdapter(req))
                            .setMethod("insertManufacture")
                            .isValidateRole()
                            .isLogicalRemove()
                            .setRegexValidation(regexValidationList)
                            .build();

    controller.insert(requestHandler);
});

route.put("/manufacture/edit", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new ManufactureAdapter(req))
                            .setMethod("updateManufacture")
                            .isLogicalRemove()
                            .isValidateRole()
                            .build();

    controller.update(requestHandler);
});

route.delete("/manufacture/delete", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new ManufactureAdapter(req))
                            .setMethod("deleteManufacture")
                            .isValidateRole()
                            .isLogicalRemove()
                            .isValidateWhereByUserId()
                            .build();

    controller.delete(requestHandler);
});*/

export default route;