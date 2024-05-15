import { Request } from 'express';
import { Documents } from "../../../models_type_orm/entities/Documents"
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';

export default  class DocumentAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    entityFromPostBody(): any {
        return null;
    }

    //POST
    entityFromPostBodyWithParams(body : any) : Documents{
        const entity = new Documents();
        entity.name = body.name || null;
        entity.type = body.type;
        entity.actionType = body.action_type || "GENERAL";
        entity.description = body.description || null;
        entity.idForTable = body.id_for_table || 0;
        entity.table = body.table;
        entity.userId = body.user_id;
        entity.createdDate = new Date();
        return entity;
    }

    entityToResponse(entity: Documents) : any{
    
        return  {
            id : entity.id,
            name: entity.name,
            file_name: entity.fileName,
            type: entity.type,
            extension: entity.extension,
            description: entity.description,
            url: entity.url,
            id_for_table: entity.idForTable,
            table: entity.table,
            user_id: entity.userId,
            created_date: entity.createdDate
        };
    }

    entitiesToResponse(entities: Documents[] | null): any {
        const response: any[] = [];
    
        if(entities != null){
            for (const entity of entities) {
                response.push(this.entityToResponse(entity));
            }
        }
        
        return response;
    }
    
    //PUT
    entityFromPutBody() : Documents{
        const entity = new Documents();
        return entity;
    }
}
