import express, { Router, Request, Response } from "express";
import { Documents } from '../../../models_type_orm/entities/Documents'
import DocumentController from "../../Entities/documents/DocumentController";
import ControllerObject from "../../Objects/ControllerObject";
import DocumentAdapter from "./DocumentAdapter";
import RequestHandler from "../../Generics/RequestHandler/RequestHandler";
import RequestHandlerBuilder from "../../Generics/RequestHandler/RequestHandlerBuilder";
import { FindManyOptions  } from "typeorm";
import { getUrlParam } from "../../Utils/generalUtils";

import multer, { MulterError } from 'multer';
const storage = multer.memoryStorage(); // Almacenamiento en memoria
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB (en bytes)
      }
});

const route = Router();

const controllerObj: ControllerObject = {
    create: "DOCUMENT_CREATE",
    update: "DOCUMENT_UPDATE",
    delete: "DOCUMENT_DELETE",
    getAll: "DOCUMENT_READ",
    getById: "DOCUMENT_GET_BY_NAME",
    controller: "DocumentController"
};

const controller = new DocumentController(Documents, controllerObj);

route.get("/document/get_by_some_params", async (req: Request, res: Response) => {
    const nameParam : string | null = getUrlParam("name", req) || null;
    const extensionParam : string | null = getUrlParam("ext", req) || null;
    const actionTypeParam : string | null = getUrlParam("action_type", req) || null;
    const typeParam : string | null = getUrlParam("type", req) || null;
    const tableParam : string | null = getUrlParam("table", req) || null;
    const userId : string | null = getUrlParam("user_id", req) || null;

    const options: FindManyOptions = {};
    if(nameParam != null){
        options.where = { ...options.where, name: nameParam};
    }

    if(extensionParam != null){
        options.where = { ...options.where, extension: extensionParam};
    }

    if(actionTypeParam != null){
        options.where = { ...options.where, action_type: actionTypeParam};
    }

    if(typeParam != null){
        options.where = { ...options.where, type: typeParam};
    }

    if(tableParam != null){
        options.where = { ...options.where, table: tableParam};
    }

    if(userId != null){
        options.where = { ...options.where, userId: userId};
    }

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new DocumentAdapter(req))
                            .setMethod("getDocumentBySomeParams")
                            .setFilters(options)
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getByFilters(requestHandler);
});

route.get("/document/get_by_name", async (req: Request, res: Response) => {
    const nameParam : string = getUrlParam("name", req);

    let options : FindManyOptions;
    options = { where: { name : nameParam}  }; 

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new DocumentAdapter(req))
                            .setMethod("getDocumentByName")
                            .setFilters(options)
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getByFilters(requestHandler);
});

route.get("/document/get_all", async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new DocumentAdapter(req))
                            .setMethod("getDocuments")
                            .isValidateRole()
                            .isLogicalRemove()
                            .build();

    controller.getAll(requestHandler);
});

route.post("/document/add",  upload.single('file'), async (req: Request, res: Response) => {

    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new DocumentAdapter(req))
                            .setMethod("insertDocument")
                            .isValidateRole()
                            .build();

    controller.insert(requestHandler);
});

route.put("/document/edit",  upload.single('file'), async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new DocumentAdapter(req))
                            .setMethod("updateDocument")
                            .isValidateRole()
                            .isValidateWhereByUserId()
                            .build();

    controller.update(requestHandler);
});


route.delete("/document/delete", async (req: Request, res: Response) => {
    const requestHandler : RequestHandler = 
                            new RequestHandlerBuilder(res,req)
                            .setAdapter(new DocumentAdapter(req))
                            .setMethod("deleteDocument")
                            .isValidateRole()
                            .isLogicalRemove()
                            .isValidateWhereByUserId()
                            .build();

    controller.delete(requestHandler);
});
export default route;