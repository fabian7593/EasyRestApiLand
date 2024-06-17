import fs from 'fs';

//Repository
import GenericRepository from '../../Generics/Repository/GenericRepository';

//ORM
import RoleRepository from "../roles/RoleRepository"
import { Documents } from "../../../models_type_orm/entities/Documents"

//Structures
import JWTObject from '../../Objects/JWTObject';

//Utils / Validations
import Validations from '../../Helpers/Validations';

//Errors
import HttpAction from '../../Helpers/HttpAction';

import { RoleFunctionallity } from '../../../models_type_orm/entities/RoleFunctionallity';
import GenericController from '../../Generics/Controller/GenericController';
import RequestHandler from '../../Generics/RequestHandler/RequestHandler';
import { UserNotifications } from '../../../models_type_orm/entities/UserNotifications';
import { Notifications } from '../../../models_type_orm/entities/Notifications';
import { replaceCompanyInfoEmails, sendMail } from '../../Utils/sendEmailsUtils';
import { Users } from '../../../models_type_orm/entities/Users';
import UserNotificationAdapter from './UserNotificationAdapter';
import NotificationAdapter from './NotificationAdapter';
import { executeQuery } from '../../Utils/executionDBUtils';
const htmlGenericTemplate : string = fs.readFileSync('email_templates/generic_template_email.html', 'utf-8');

export default  class UserNotificationController extends GenericController{

    async insert(reqHandler: RequestHandler) : Promise<any>{
        const successMessage : string = "INSERT_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());
    
        try{
            const repository = new GenericRepository();
            const validation = new Validations(reqHandler.getRequest(), reqHandler.getResponse(), httpExec);
            const roleRepository = new RoleRepository();
            const jwtData : JWTObject = reqHandler.getRequest().app.locals.jwtData;

            //validate if the role have permission to do this request
            if(reqHandler.getNeedValidateRole()){
                const roleFunc : RoleFunctionallity | null = await roleRepository.getPermissionByFuncAndRole(jwtData.role, this.controllerObj.create);
                if (roleFunc == null) {
                    return httpExec.unauthorizedError("ROLE_AUTH_ERROR");
                }
            }

            //validate body json
            if(validation.validateRequiredBodyJson(this.controllerObj.create) != null){
                return;
            }

             //Get data From some tables
             const userNotifications : UserNotifications = reqHandler.getAdapter().entityFromPostBody();
             const notification : Notifications = await repository.findByCode(Notifications, userNotifications.notificationCode, reqHandler.getNeedLogicalRemove());
             
             if(notification != undefined && notification != null){
                if(notification.requiredSendEmail){
                    const user : Users = await repository.findById(Users, userNotifications.idUserReceive, true);
                    let htmlBody = replaceCompanyInfoEmails(htmlGenericTemplate);
                    htmlBody = htmlBody.replace(/\{\{ userName \}\}/g, user!.firstName + " " +user!.lastName);
                    htmlBody = htmlBody.replace(/\{\{ emailSubject \}\}/g, notification.subject);
                    htmlBody = htmlBody.replace(/\{\{ emailContent \}\}/g, notification.message);
                
                    await sendMail(user.email, notification.subject, htmlBody);
                 }
             }else{
                return httpExec.dynamicError("NOT_FOUND", "DONT_EXISTS");
             }
            

            try{
                //Execute Action DB
                const userNotificationAdded: UserNotifications = await repository.add(userNotifications);
                const responseWithNewAdapter = (reqHandler.getAdapter() as UserNotificationAdapter).entityToResponseCompleteInformation(userNotificationAdded, notification);
                return httpExec.successAction(responseWithNewAdapter, successMessage);
            
            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
    }




    async update(reqHandler: RequestHandler): Promise<any>{
        const successMessage : string = "UPDATE_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
             //This is for use the basic CRUD
             const repository = new GenericRepository();
             //This is for validate role
             const roleRepository = new RoleRepository();
             //This is for do validations
             const validation = new Validations(reqHandler.getRequest(), reqHandler.getResponse(), httpExec);
             //This calls the jwt data into JWTObject
             const jwtData : JWTObject = reqHandler.getRequest().app.locals.jwtData;
             //get the id from URL params
            const id = validation.validateIdFromQuery();
            if(id == null){
                return httpExec.paramsError();
            }

            //If you need to validate the role
            if(reqHandler.getNeedValidateRole()){
                const roleFunc : RoleFunctionallity | null = await roleRepository.getPermissionByFuncAndRole(jwtData.role, this.controllerObj.update);
                if (roleFunc == null) {
                    return httpExec.unauthorizedError("ROLE_AUTH_ERROR");
                }
            }

            //If you need to validate if the user id of the table 
            //should be the user id of the user request (JWT)
            let userId : number | null= null;
            let userNotification : UserNotifications;
            userNotification = await repository.findById(this.entityType, id, reqHandler.getNeedLogicalRemove());

            if(userNotification != undefined && userNotification != null){}
            else{
                return httpExec.dynamicError("NOT_FOUND", "DONT_EXISTS");
            }

            if(reqHandler.getRequireValidWhereByUserId()){
                if(jwtData.role != "ADMIN"){
                    userId = jwtData.id;
                }
             
                if(userNotification != undefined && userNotification != null){
                    if(userId != null && userNotification.idUserReceive != userId){
                        return httpExec.unauthorizedError("ROLE_AUTH_ERROR");
                    }
                }else{
                    return httpExec.dynamicError("NOT_FOUND", "DONT_EXISTS");
                }
            }

            userNotification.isRead = true;

            try{
                //Execute Action DB
                const updateEntity = await repository.update(this.entityType, id, userNotification,  
                                                             reqHandler.getNeedLogicalRemove());
                const notification : Notifications = await repository.findByCode(Notifications, updateEntity.notificationCode, false);

                const responseWithNewAdapter = (reqHandler.getAdapter() as UserNotificationAdapter).entityToResponseCompleteInformation(updateEntity, notification);
                return httpExec.successAction(responseWithNewAdapter, successMessage);

            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
     }


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

            let userReceive : string | null = null;
            if(reqHandler.getRequest().query['user_receive'] != undefined){
                userReceive = reqHandler.getRequest().query['user_receive'] as string;
            }

            let userSend : string | null = null;
            if(reqHandler.getRequest().query['user_send'] != undefined){
                userSend = reqHandler.getRequest().query['user_send'] as string;
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
                const entities = await this.getAllUserNotifications(userReceive, userSend, page, size);

                // Filtrar el OkPacket
                const data = entities.filter((item: any) => !('affectedRows' in item));

                //const entities = await this.getAllUserNotifications();
                return httpExec.successAction(data, successMessage);
            }catch(error : any){
                console.log(error);
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
     }

 
     async getAllUserNotifications(userReceive : string | null, userSend : string | null,
                                   page: number, size : number ): Promise<any>{
            return await executeQuery(async (conn) => {
                const result = await conn.query(
                    "CALL GetUserNotifications(?, ?, ?, ?)",
                    [userSend, userReceive, size, page] // Valores de los parámetros en el mismo orden que en la consulta
                );
               
             return result;
         });
     }

}