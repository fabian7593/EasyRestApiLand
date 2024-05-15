import { Request } from 'express';
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';
import { Notifications } from '../../../models_type_orm/entities/Notifications';
import { UserNotifications } from '../../../models_type_orm/entities/UserNotifications';

export default  class UserNotificationAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    entityFromPostBody() : UserNotifications{
        const entity = new UserNotifications();
        entity.idUserSend = this.req.body.id_user_send || null;
        entity.idUserReceive = this.req.body.id_user_receive;
        entity.notificationCode = this.req.body.notification_code;
        entity.createdDate = new Date();
        return entity;
    }

   

    entityToResponse(entity: UserNotifications) : any{
    
        return  {
            id : entity.id,
            id_user_send: entity.idUserSend,
            id_user_receive: entity.idUserReceive,
            notification_code: entity.notificationCode,
            is_read: entity.isRead,
            created_date: entity.createdDate
        };
    }

    entityToResponseCompleteInformation(entity: UserNotifications, notification: Notifications) : any{
       
        return  {
            id : entity.id,
            id_user_send: entity.idUserSend,
            id_user_receive: entity.idUserReceive,
            code: entity.notificationCode,
            is_read: entity.isRead,
            type: notification.type,
            message: notification.message,
            subject: notification.subject,
            action_url: notification.actionUrl,
            created_date: entity.createdDate,
        };
    }

    entitiesToResponse(entities: UserNotifications[] | null): any {
        const response: any[] = [];
    
        if(entities != null){
            for (const entity of entities) {
                response.push(this.entityToResponse(entity));
            }
        }
        
        return response;
    }

    entitiesToResponseCompleteInformation(entities: UserNotifications[] | null, notifications: Notifications[] | null): any {
        const response: any[] = [];
    
        if(entities != null && notifications != null){
            for (const entity of entities) {
                for (const notif of notifications) {
                    if(entity.notificationCode == notif.code){
                        response.push(this.entityToResponseCompleteInformation(entity, notif));
                    }
                }
            }
        }
        
        return response;
    }
    
    //PUT
    entityFromPutBody() : Notifications{
        const entity = new Notifications();
        return entity;
    }
}
