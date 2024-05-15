import { Request, Response } from 'express';
import { responseStruct } from "../Objects/BodyResObject"
import { getStatus, getMessage, getRegex } from "../Utils/jsonUtils"
import JWTObject from '../Objects/JWTObject';
const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
    This Validations Class have all the required validation in the app
*/

export default class Validations{
    req: Request;
    res: Response;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    //This function validate the required body json by endpoint code
    //Validate as well if the endpoint require a body or not
    public validateRequiredBodyJson(validateEndPoint: string){
        try{
            let hasRequiredFields = true;
        
            if (!this.req.body) {
                const status = getStatus("VALIDATIONS");
                return this.res.status(status.httpStatus).json(
                    responseStruct(status, null, getMessage("INCOMPLETE_BODY_REQUEST"))
                );
            }else{
    
                //User Login
                if(validateEndPoint == "USER_LOGIN"){
                    if (!this.req.body.email || !this.req.body.password) {
                        hasRequiredFields = false;
                    }
                }else if(validateEndPoint == "USER_REGISTER"){
                    if (!this.req.body.first_name || !this.req.body.last_name || 
                        !this.req.body.email || !this.req.body.password || 
                        !this.req.body.role_code) {
                        hasRequiredFields = false;
                    }
                }else if(validateEndPoint == "UDC_CREATE"){
                    if (!this.req.body.code || !this.req.body.name || 
                        !this.req.body.value1) {
                        hasRequiredFields = false;
                    }
                }else if(validateEndPoint == "DOCUMENT_CREATE"){
                    const body = JSON.parse(this.req.body.fields);

                    if (!body.type || !body.table || 
                        !body.user_id || !body.id_for_table) {
                        hasRequiredFields = false;
                    }
                }else if(validateEndPoint == "SEND_MAIL"){

                    if (!this.req.body.email || !this.req.body.subject || 
                        !this.req.body.body_message) {
                        hasRequiredFields = false;
                    }
                }else if(validateEndPoint == "NOTIFICATION_CREATE"){

                    if (!this.req.body.code || !this.req.body.subject || 
                        !this.req.body.message) {
                        hasRequiredFields = false;
                    }
                }else if(validateEndPoint == "LOG_CREATE"){

                    if (!this.req.body.method || !this.req.body.class || 
                        !this.req.body.message) {
                        hasRequiredFields = false;
                    }
                }
            }
    
            //If missed some required field, return an error
            if(!hasRequiredFields){
                const status = getStatus("VALIDATIONS");
                return this.res.status(status.httpStatus).json(
                    responseStruct(status, null, getMessage("REQUIRED_FIELDS"))
                );
            }
    
            //anyway return null
            //If this function is null, everything is okay
            return null;
    
        }catch(error : any){
            //If the app has an error in the validation return general error
            const status = getStatus("ERROR");
            return this.res.status(status.httpStatus).json(
                responseStruct(status, null, error.message)
            );
        }
    }

    //This function validate multiple Regex
    public validateMultipleRegex (listRegex: [string, string][] | null)
    {
        //Validate just in production
        if(parseInt(process.env.IS_DEBUGGING || '0', 10) == 0){

            if(listRegex != null){
                for (const [listKey, value] of listRegex) {
                
                    const regexObject = getRegex(listKey);
                    let regexResult = null;
    
                    if(value != null){
                        //validate the word, if has an error, validate Regex return a error validation
                        regexResult = this.validateRegex(value, regexObject.regex, regexObject.message);
                    }
                     
                    //return the error validatiokn
                    if(regexResult != null){
                        return regexResult;
                    }
                }
            }
            
        //anyway return null
            return null;
        }else{
            return null;
        }
    };

    //This function validate the format of the current string
    private validateRegex(validationWord: string, regexStr: string, message: string)
    {
        const regex = new RegExp(regexStr);
        if (validationWord && regex.test(validationWord)) {
            // Valid format
            return null;
        } else {

            const status = getStatus("REGEX");
            return this.res.status(status.httpStatus).json(
                responseStruct(status, null, message)
            );
        }
    }
 
  

    //This function validate if exist the jwt and if is required and has authorization to do this action.
    //This fucntion is used on Start Middleware
    public validateRequireJWT(){

        let varReturn = null; 
    
        try{
            if (!this.req.headers) {
              
                const status = getStatus("VALIDATIONS");
                this.res.status(status.httpStatus).json(
                    responseStruct(status, null, getMessage("INCOMPLETE_HEADER_REQUEST"))
                );
    
                varReturn = status.httpStatus;
            }else{
        
                //validation of authorization
                if (!this.req.headers['authorization']) {

                    const status = getStatus("VALIDATIONS");
                    this.res.status(status.httpStatus).json(
                        responseStruct(status, null, getMessage("INCOMPLETE_HEADER_REQUEST"))
                    );
    
                    varReturn = status.httpStatus;
                }else{
        
                    //validate a assigned secret key with the DB
                    const jwtAuth = this.req.headers['authorization'];
                  
                    try {
                        const decoded = jwt.verify(jwtAuth, process.env.JWT_SECRET_KEY); // Verifica el token usando tu clave secreta
                        varReturn = decoded;
                    } catch (error) {

                        const status = getStatus("UNAUTHORIZED");
                        this.res.status(status.httpStatus).json(
                            responseStruct(status, null, getMessage("INVALID_TOKEN"))
                        );
    
                        varReturn = status.httpStatus;
                    }
                }
            }
        }catch(error : any){
           
            const status = getStatus("ERROR");
            this.res.status(status.httpStatus).json(
                responseStruct(status, null, error.message)
            );
            
            varReturn = null;
        }
    
        if (varReturn === 401 || varReturn == 400 ) { varReturn = null; }
    
        return varReturn;
    }



    //Validate the required api key
    public validateRequireSecretApiKey(){

        let varReturn = null; 
    
        try{
            if (!this.req.headers) {
              
                const status = getStatus("VALIDATIONS");
                this.res.status(status.httpStatus).json(
                    responseStruct(status, null, getMessage("INCOMPLETE_HEADER_REQUEST"))
                );
    
                varReturn = status.httpStatus;
            }else{
        
                //validation of authorization
                if (!this.req.headers['x-api-key']) {

                    const status = getStatus("VALIDATIONS");
                    this.res.status(status.httpStatus).json(
                        responseStruct(status, null, getMessage("INCOMPLETE_HEADER_REQUEST"))
                    );
                    varReturn = status.httpStatus;
                }else{
        
                    //validate a assigned secret key with the DB
                    const xApiKey = this.req.headers['x-api-key'];
                  
                    try {
                        if(xApiKey == process.env.COMPANY_SECRET_API_KEY){
                            varReturn = true;
                        }else{
                            const status = getStatus("UNAUTHORIZED");
                            this.res.status(status.httpStatus).json(
                                responseStruct(status, null, getMessage("INVALID_API_KEY"))
                            );
                            varReturn = status.httpStatus;
                        }
                        
                    } catch (error) {

                        const status = getStatus("UNAUTHORIZED");
                        this.res.status(status.httpStatus).json(
                            responseStruct(status, null, getMessage("INVALID_API_KEY"))
                        );
    
                        varReturn = status.httpStatus;
                    }
                }
            }
        }catch(error : any){
           
            const status = getStatus("ERROR");
            this.res.status(status.httpStatus).json(
                responseStruct(status, null, error.message)
            );
            varReturn = null;
        }
    

        if (varReturn === 401 || varReturn == 400 ) { varReturn = null; }
        return varReturn;
    }




    //This fucntion get the ID of the JWT
    public validateIdFromQueryUsers(jwtData : JWTObject) : number{
        try{

            let id : number = 0;
            if(this.req.query['id'] != undefined && jwtData.role == "ADMIN"){
                id = parseInt(this.req.query['id'] as string, 10);
            }else{
                id = jwtData.id;
            }
            return id;

        }catch(error: any){
            return 0;
        } 
    }

    //verify if is, comes from query string ?id=1
    public validateIdFromQuery() : number | null{
        try{

            let id : number | null = null;
            if(this.req.query['id'] != undefined){
                id = parseInt(this.req.query['id'] as string, 10);
            }
            return id;

        }catch(error: any){
            return null;
        } 
    }

    //validate if code comes from query stering ?code=code1
    public validateCodeFromQuery() : string | null{
        try{

            let code : string | null = null;
            if(this.req.query['code'] != undefined){
                code = this.req.query['code'] as string;
            }
            return code;

        }catch(error: any){
            return null;
        } 
    }
}