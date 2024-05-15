import { Router, Request, Response } from "express";
import ControllerObject from "../../Objects/ControllerObject";
import RequestHandler from "../../Generics/RequestHandler/RequestHandler";
import RequestHandlerBuilder from "../../Generics/RequestHandler/RequestHandlerBuilder";
import { Users } from "../../../models_type_orm/entities/Users";
import EmailController from "./EmailController";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { getUrlParam } from "../../Utils/generalUtils";

const route = Router();
const controllerObj: ControllerObject = {
    create: "",
    update: "",
    delete: "",
    getAll: "EMAIL_SEND_BY_ALL_USERS",
    getById: "EMAIL_SEND_BY_USER",
    controller: "EmailController"
};

const controller = new EmailController(Users, controllerObj);

route.post("/email/send_email", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setMethod("sendEmail")
                            .isValidateRole()
                            .build();

    controller.sendMail(requestHandler);
});


route.post("/email/send_email_all_users", async (req: Request, res: Response) => {
    const gender : string | null = getUrlParam("gender", req) || null;
    const country : string | null = getUrlParam("country_code", req) || null;
    const role : string | null = getUrlParam("role", req) || null;
    const firstName : string | null = getUrlParam("first_name", req) || null;
    const lastName : string | null = getUrlParam("last_name", req) || null;

    const options: FindManyOptions = {};
    if(gender != ""){
        options.where = { ...options.where, gender: gender};
    }

    if(country != ""){
        options.where = { ...options.where, countryIsoCode: country};
    }

    if(role != ""){
        options.where = { ...options.where, role: role};
    }

    if(firstName != ""){
        options.where = { ...options.where, firstName: firstName};
    }

    if(lastName != ""){
        options.where = { ...options.where, lastName: lastName};
    }

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setMethod("sendEmail")
                            .isValidateRole()
                            .isLogicalRemove()
                            .setFilters(options)
                            .build();

    controller.getByFilters(requestHandler);
});


export default route;