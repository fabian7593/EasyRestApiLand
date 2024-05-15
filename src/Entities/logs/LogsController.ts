//ORM
import RoleRepository from "../roles/RoleRepository"

//Structures
import JWTObject from '../../Objects/JWTObject';

//Errors
import HttpAction from '../../Helpers/HttpAction';

import { RoleFunctionallity } from '../../../models_type_orm/entities/RoleFunctionallity';
import GenericController from '../../Generics/Controller/GenericController';
import RequestHandler from '../../Generics/RequestHandler/RequestHandler';
import { executeQuery } from '../../Utils/executionDBUtils';

export default  class LogsController extends GenericController{

     async getByFilters(reqHandler: RequestHandler): Promise<any> {
        const successMessage : string = "GET_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
            const roleRepository = new RoleRepository();
            const jwtData : JWTObject = reqHandler.getRequest().app.locals.jwtData;

            if(reqHandler.getNeedValidateRole()){
                const roleFunc : RoleFunctionallity | null = 
                                    await roleRepository.getPermissionByFuncAndRole(
                                    jwtData.role, this.controllerObj.getAll);

                if (roleFunc == null) {
                    return httpExec.unauthorizedError("ROLE_AUTH_ERROR");
                }
            }

            let appGuid : string | null = null;
            if(reqHandler.getRequest().query['app_guid'] != undefined){
                appGuid = reqHandler.getRequest().query['app_guid'] as string;
            }

            let environment : string | null = null;
            if(reqHandler.getRequest().query['environment'] != undefined){
                environment = reqHandler.getRequest().query['environment'] as string;
            }

            let userId : string | null = null;
            if(reqHandler.getRequest().query['user_id'] != undefined){
                userId = reqHandler.getRequest().query['user_id'] as string;
            }

            let type : string | null = null;
            if(reqHandler.getRequest().query['type'] != undefined){
                type = reqHandler.getRequest().query['type'] as string;
            }

            try{
                //get by url params the page and the size of the response
                const page : number = reqHandler.getRequest().query.page ? 
                            parseInt(reqHandler.getRequest().query.page as string) : 
                            parseInt(process.env.PAGE_OFFSET || "1");

                const size : number = reqHandler.getRequest().query.size ? 
                            parseInt(reqHandler.getRequest().query.size as string) : 
                            parseInt(process.env.PAGE_SIZE || "3000");

                //Execute Action DB
                const entities = await this.getAllLogs(appGuid, environment, userId, type, page, size);

                // Filtrar el OkPacket
                const data = entities.filter((item: any) => !('affectedRows' in item));

                //const entities = await this.getAllUserNotifications();
                return httpExec.successAction(data, successMessage);
            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
     }

 
     async getAllLogs(appGuid : string | null, environment : string | null,
                                   userId: string | null, type : string | null,
                                   page: number, size : number): Promise<any>{
            return await executeQuery(async (conn) => {
                const result = await conn.query(
                    "CALL GetLogsWithFilters(?, ?, ?, ?, ?, ?)",
                    [appGuid, environment, userId, type, size, page] 
                );
               
             return result;
         });
     }
}