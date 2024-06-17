import fs from 'fs';

//Repository
import UserRepository from "./UserRepository"
import GenericRepository from '../../Generics/Repository/GenericRepository';

//ORM
import { Users } from '../../../models_type_orm/entities/Users'
import UserAdapter from "./UserAdapter";
import RoleRepository from "../roles/RoleRepository"

//Structures
import JWTObject from '../../Objects/JWTObject';

//Utils / Validations
import { encryptPassword, decryptPassword } from '../../Utils/encryptionUtils';
import Validations from '../../Helpers/Validations';

//Errors
import HttpAction from '../../Helpers/HttpAction';
import { getMessage } from '../../Utils/jsonUtils';

//JWT
import { generateToken, generateRefreshToken, generateRegisterToken, generateForgotPasswordToken } from '../../Helpers/JWT'
import { RoleFunctionallity } from '../../../models_type_orm/entities/RoleFunctionallity';
import GenericController from '../../Generics/Controller/GenericController';
import RequestHandler from '../../Generics/RequestHandler/RequestHandler';

//Emails
import {sendMail, replaceCompanyInfoEmails} from "../../Utils/sendEmailsUtils";
const htmlRegisterTemplate : string = fs.readFileSync('email_templates/register_email.html', 'utf-8');
const htmlActiveAccountTemplate : string = fs.readFileSync('email_templates/active_account_page.html', 'utf-8');
const htmlforgotPassTemplate: string = fs.readFileSync('email_templates/forgot_password_email.html', 'utf-8');

const jwt = require('jsonwebtoken');
require('dotenv').config();


export default  class UserController extends GenericController{
  
    async update(reqHandler: RequestHandler) : Promise<any>{
        const successMessage : string = "UPDATE_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());
    
        try{
            const repository = new GenericRepository();
            const validation = new Validations(reqHandler.getRequest(), reqHandler.getResponse(), httpExec);
            const roleRepository = new RoleRepository();
            const jwtData : JWTObject = reqHandler.getRequest().app.locals.jwtData;
            const id = validation.validateIdFromQueryUsers(jwtData);

            if(reqHandler.getNeedValidateRole()){
                const roleFunc : RoleFunctionallity | null = await roleRepository.getPermissionByFuncAndRole(jwtData.role, this.controllerObj.update);
                if (roleFunc == null) {
                    return httpExec.unauthorizedError("ROLE_AUTH_ERROR");
                }
            }
    
            //Get data From Body
            const userBody = reqHandler.getAdapter().entityFromPutBody();
    
            if(reqHandler.getRegexValidatorList() != null){
                if(validation.validateMultipleRegex(reqHandler.getRegexValidatorList()) != null){
                    return;
                }
            }
    
            try{

                if(userBody.password != undefined && userBody.password != null){
                    //Password encryption
                    userBody.password = encryptPassword(userBody.password, process.env.SALT!);
                }
                
                //Execute Action DB
                const user: Users = await repository.update(Users, id, userBody, reqHandler.getNeedLogicalRemove());
                return httpExec.successAction(reqHandler.getAdapter().entityToResponse(user), successMessage);
            
            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
    }


    async insert(reqHandler: RequestHandler) : Promise<any>{
        const successMessage : string = "INSERT_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());
    
        try{
            const repository = new GenericRepository();
            const validation = new Validations(reqHandler.getRequest(), reqHandler.getResponse(), httpExec);
            const roleRepository = new RoleRepository();
            const jwtData : JWTObject = reqHandler.getRequest().app.locals.jwtData;

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

            //Get data From Body
            const userBody = reqHandler.getAdapter().entityFromPostBody();
    
            if(reqHandler.getRegexValidatorList() != null){
                if(validation.validateMultipleRegex(reqHandler.getRegexValidatorList()) != null){
                    return;
                }
            }
    
            try{
                //Password encryption
                userBody.password = encryptPassword(userBody.password, process.env.SALT!);
                userBody.isActive = 1;
    
                //Execute Action DB
                const user: Users = await repository.add(userBody);
                return httpExec.successAction(reqHandler.getAdapter().entityToResponse(user), successMessage);
            
            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
    }


    //Logic to register user
    async register(reqHandler: RequestHandler) : Promise<any>{
        const successMessage : string = "INSERT_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());
    
        try{
            const repository = new GenericRepository();
            const validation = new Validations(reqHandler.getRequest(), reqHandler.getResponse(), httpExec);

            //Get data From Body
            const userBody = reqHandler.getAdapter().entityFromPostBody();

            if(reqHandler.getRequiredFieldsList() != null){
                if(!validation.validateRequiredFields(reqHandler.getRequiredFieldsList())){
                    return;
                }
            }
    
            if(reqHandler.getRegexValidatorList() != null){
                if(validation.validateMultipleRegex(reqHandler.getRegexValidatorList()) != null){
                    return;
                }
            }
    
            try{
                //Password encryption
                userBody.password = encryptPassword(userBody.password, process.env.SALT!);

                const jwtObj : JWTObject = {
                    id: 0,
                    email: userBody!.email,
                    role: userBody!.roleCode
                }
                
                const registerToken = generateRegisterToken(jwtObj); 
                userBody.activeRegisterToken = registerToken;
    
                //Execute Action DB
                const user: Users = await repository.add(userBody);

                let htmlBody = replaceCompanyInfoEmails(htmlRegisterTemplate);

                htmlBody = htmlBody
                .replace(/\{\{ userName \}\}/g, userBody!.firstName + " " + userBody!.lastName)
                .replace(/\{\{ confirmationLink \}\}/g, process.env.COMPANY_HOST! + 'confirmation_register/'+ registerToken);
            
                await sendMail(userBody!.email, process.env.COMPANY_REGISTER_SUBJECT!, htmlBody);

                return httpExec.successAction(reqHandler.getAdapter().entityToResponse(user), successMessage);
            
            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){

            console.log(error.message);
            return await httpExec.generalError(error);
        }
    }


    //Logic to login user
    async loginUser(reqHandler: RequestHandler, validateRequiredBodyJsonName : string){
        const successMessage : string = "LOGIN_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());
    
        try{
            const userAdapter = new UserAdapter(reqHandler.getRequest());
            const repository = new UserRepository();
            const validation = new Validations(reqHandler.getRequest(), reqHandler.getResponse(), httpExec);
            
            //validate body json
            if(validation.validateRequiredBodyJson(validateRequiredBodyJsonName) != null){
                return;
            }
    
            //Get data From Body
            const userBody = userAdapter.userFromBodyLogin();
    
            if(reqHandler.getRegexValidatorList() != null){
                if(validation.validateMultipleRegex(reqHandler.getRegexValidatorList()) != null){
                    return;
                }
            }
    
            let user;
            try{
                //Execute Action DB
                user = await repository.getUserByEmail(userBody);
                let isSuccess = false;
    
                if(user != null){
    
                    const decryptedPass = decryptPassword(user.password, process.env.SALT!);
                    
                    //validate the decrypted pass to the pass in the body json
                    if(decryptedPass == userBody.password){
                        user.password = "";
                        isSuccess = true;
                    }else{
                        //incorrect user or password
                        return httpExec.dynamicError("UNAUTHORIZED","USER_PASS_ERROR");
                    }
                }else{
                    //email not exist
                    return httpExec.dynamicError("NOT_FOUND","EMAIL_NOT_EXISTS_ERROR");
                }
    
                if(isSuccess){
    
                    const roleRepositoy = new RoleRepository();
                    const screens = await roleRepositoy.getScreensByRole(user!.roleCode);
    
                    const jwtObj : JWTObject = {
                        id: user!.id,
                        email: user!.email,
                        role: user!.roleCode
                    }
                    
                    const token = generateToken(jwtObj); 
                    const refreshToken = generateRefreshToken(jwtObj); 
                    return httpExec.successAction(userAdapter.tokenToResponse(token, refreshToken, screens), successMessage);
    
                }else{
                    return httpExec.unauthorizedError("ROLE_AUTH_ERROR");
                }
    
            }catch(error : any){
                return await httpExec.databaseError(error);
            }
        }catch(error : any){
            return await httpExec.generalError(error);
        }
    }



    //Logic to refresh token
    async refreshToken(reqHandler: RequestHandler){
        const successMessage : string = "REFRESH_TOKEN_SUCCESS";
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
            const userAdapter = new UserAdapter(reqHandler.getRequest());
            const refreshToken = reqHandler.getRequest().params.refreshToken;

            let verify = null;
            try {
                  verify =  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
            } catch (error) {
                return httpExec.unauthorizedError("INVALID_TOKEN");
            }

            const jwtObj : JWTObject = {
                id: verify!.id,
                email: verify!.email,
                role: verify!.roleCode
            }
        
            const accessToken = generateToken(jwtObj);   
            return httpExec.successAction(userAdapter.refreshToResponse(accessToken), successMessage);
        } catch(error : any){
            return await httpExec.generalError(error);
        }
    }



    //Logic to refresh token
    async activeRegisterUser(reqHandler: RequestHandler){
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
            const repository = new UserRepository();
            const registerToken = reqHandler.getRequest().params.registerToken;
            let verify = null;
            try {
                verify =  jwt.verify(registerToken, process.env.JWT_REGISTER_TOKEN);
            } catch (error) {
                return httpExec.unauthorizedError("INVALID_TOKEN");
            }

            const user = await repository.getUserByEmailParam(verify!.email);

            if(user != undefined && user != null){

                user!.isActive = true;
                await repository.update(Users, user!.id, user!, reqHandler.getNeedLogicalRemove());
                
                let htmlBody = replaceCompanyInfoEmails(htmlActiveAccountTemplate);
                htmlBody = htmlBody.replace(/\{\{ userName \}\}/g, user!.firstName + " " +user!.lastName);
            
                return httpExec.getHtml(htmlBody);
            }else{
                return httpExec.dynamicError("NOT_FOUND", "EMAIL_NOT_EXISTS_ERROR");
            }
            
            
        } catch(error : any){
            return await httpExec.generalError(error);
        }
    }





    //Sen the email for forgot password
    async forgotPassword(reqHandler: RequestHandler){
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
            const repository = new UserRepository();
            const email = reqHandler.getRequest().body.email;
            const user = await repository.getUserByEmailParam(email);

            if(user != undefined && user != null){

                console.log(email);
                const forgotUserPasswordToken = generateForgotPasswordToken(email); 
                user.forgotPasswordToken = forgotUserPasswordToken!;
    
                await repository.update(Users, user.id, user, reqHandler.getNeedLogicalRemove());

                let htmlBody = replaceCompanyInfoEmails(htmlforgotPassTemplate);

                htmlBody = htmlBody
                .replace(/\{\{ userName \}\}/g, user!.firstName + " " + user!.lastName)
                .replace(/\{\{ resetLink \}\}/g, process.env.COMPANY_FRONT_END_HOST! + 'verify_forgot_password/' + forgotUserPasswordToken);
            
                await sendMail(user!.email, process.env.COMPANY_FORGOT_PASS_SUBJECT!, htmlBody);

                return httpExec.successAction(null, "EMAIL_SENT_SUCCESS");
            }else{
                return httpExec.dynamicError("NOT_FOUND", "EMAIL_NOT_EXISTS_ERROR");
            }
            
        } catch(error : any){
            console.log(error);
            return await httpExec.generalError(error);
        }
    }



    //Logic to verify the forgot password token
    async verifyForgotPassToken(reqHandler: RequestHandler){
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
            const forgotPassToken = reqHandler.getRequest().params.forgotPassToken;
            let verify = null;
            try {
                verify =  jwt.verify(forgotPassToken, process.env.JWT_FORGOT_PASSWORD_TOKEN);
            } catch (error) {
                return httpExec.unauthorizedError("INVALID_TOKEN");
            }

            return reqHandler.getResponse().redirect(process.env.COMPANY_RESET_PASS_FRONT_END_URL + forgotPassToken);
        } catch(error : any){
            return await httpExec.generalError(error);
        }
    }



    async resetPassword(reqHandler: RequestHandler){
        const httpExec = new HttpAction(reqHandler.getResponse(), this.controllerObj.controller, reqHandler.getMethod());

        try{
            const repository = new UserRepository();
            const forgotPassToken = reqHandler.getRequest().params.forgotPassToken;
            const password = reqHandler.getRequest().body.password;

            let verify = null;
            try {
                verify =  jwt.verify(forgotPassToken, process.env.JWT_FORGOT_PASSWORD_TOKEN);
            } catch (error) {
                return httpExec.unauthorizedError("INVALID_TOKEN");
            }

            const user = await repository.getUserByEmailParam(verify.email!);

            if(user != undefined && user != null){

                user.password = encryptPassword(password, process.env.SALT!)!;
                await repository.update(Users, user.id, user, reqHandler.getNeedLogicalRemove());
                return httpExec.successAction(user.email, "RESET_PASSWORD");
            }else{
                return httpExec.dynamicError("NOT_FOUND", "EMAIL_NOT_EXISTS_ERROR");
            }
            
        } catch(error : any){
            return await httpExec.generalError(error);
        }
    }
}