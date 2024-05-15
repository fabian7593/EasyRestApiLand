import { Request } from 'express';
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';
import { Logs } from '../../../models_type_orm/entities/Logs';

export default  class LogsAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    entityFromPostBody() : Logs{
        const entity = new Logs();
        entity.method = this.req.body.method;
        entity.class = this.req.body.class;
        entity.type = this.req.body.type || null;
        entity.https = this.req.body.https || null;
        entity.message = this.req.body.message;
        entity.description = this.req.body.description || null;
        entity.createdDate = new Date();
        entity.appGuid = this.req.body.app_guid || null;
        entity.environment = this.req.body.environment || null;
        entity.userId = null;
        return entity;
    }


    entityToResponse(entity: Logs) : any{
        return  {
            id : entity.id,
            method: entity.method,
            class: entity.class,
            type: entity.type,
            https: entity.https,
            message: entity.message,
            description: entity.description,
            created_date: entity.createdDate,
            app_guid: entity.appGuid,
            environment: entity.environment,
            user_id: entity.userId
        };
    }

    entitiesToResponse(entities: Logs[] | null): any {
        const response: any[] = [];  
        return response;
    }
    
    //PUT
    entityFromPutBody() : Logs{
        const entity = new Logs();
        return entity;
    }
}
