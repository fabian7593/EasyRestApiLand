import { Request } from 'express';
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';
import { Notifications } from '../../../models_type_orm/entities/Notifications';

export default  class NotificationAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    entityFromPostBody() : Notifications{
        const entity = new Notifications();
        entity.code = this.req.body.code;
        entity.type = this.req.body.type || null;
        entity.subject = this.req.body.subject;
        entity.message = this.req.body.message;
        entity.requiredSendEmail = this.req.body.required_send_email || null;
        entity.isDeleteAfterRead = this.req.body.is_delete_after_read || null;
        entity.actionUrl = this.req.body.action_url || null;
        entity.createdDate = new Date();
        return entity;
    }

   

    entityToResponse(entity: Notifications) : any{
    
        return  {
            id : entity.id,
            code: entity.code,
            type: entity.type,
            subject: entity.subject,
            message: entity.message,
            required_send_email: entity.requiredSendEmail,
            is_delete_after_read: entity.isDeleteAfterRead,
            action_url: entity.actionUrl,
            created_date: entity.createdDate
        };
    }

    entitiesToResponse(entities: Notifications[] | null): any {
        const response: any[] = [];
    
        if(entities != null){
            for (const entity of entities) {
                response.push(this.entityToResponse(entity));
            }
        }
        
        return response;
    }
    
    //PUT
    entityFromPutBody() : Notifications{
        const entity = new Notifications();
        entity.code = this.req.body.code;
        entity.type = this.req.body.type || null;
        entity.subject = this.req.body.subject;
        entity.message = this.req.body.message;
        entity.requiredSendEmail = this.req.body.required_send_email || null;
        entity.isDeleteAfterRead = this.req.body.is_delete_after_read || null;
        entity.actionUrl = this.req.body.action_url || null;
        return entity;
    }
}
