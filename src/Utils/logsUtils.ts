require('dotenv').config();
import { Logs } from '../../models_type_orm/entities/Logs'
import GenericRepository from '../Generics/Repository/GenericRepository';

/*
    Logs Utils class is for logs in console for debbuging &
    In Logs for a DB traceabillity for errors, use of information and others
*/
export function debuggingMessage(message : any) {
    if(parseInt(process.env.IS_DEBUGGING || '0', 10) == 1){
        console.log("\n");
        console.log(message);
    }
}

export async function insertLog(method: string, className: string, message: string, 
                                https?: number | null,  type?: string | null, userId?: string | null, 
                                description?: string | null) {
    const log = new Logs();
    log.method = method;
    log.class = className;
    log.message = message;
    log.https = https;
    log.type = type;
    log.userId = userId;
    log.description = description;
    log.createdDate = new Date();
    log.environment = "BACKEND";

    const genericRepository = new GenericRepository();
    await genericRepository.add(log);
}





