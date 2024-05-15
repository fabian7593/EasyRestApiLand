import { Request } from 'express';
import { UnitsDynamicCentral } from "../../../models_type_orm/entities/UnitsDynamicCentral"
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';

export default  class UdcAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    //POST
    entityFromPostBody() : UnitsDynamicCentral{
        const entity = new UnitsDynamicCentral();
        entity.code = this.req.body.code;
        entity.name = this.req.body.name;
        entity.type = this.req.body.type;
        entity.description = this.req.body.description || null;
        entity.value1 = this.req.body.value1;
        entity.value2 = this.req.body.value2 || null;
        entity.value3 = this.req.body.value3 || null;
        entity.value4 = this.req.body.value4 || null;
        entity.value5 = this.req.body.value5 || null;
        entity.countryIsoCode = this.req.body.country_iso_code || null;
        entity.createdDate = new Date();
        entity.userId = null;
        return entity;
    }

    entityToResponse(entity: UnitsDynamicCentral) : any{
    
        return  {
            id : entity.id,
            code: entity.code,
            name: entity.name,
            type: entity.type,
            description: entity.description ,
            value1: entity.value1,
            value2: entity.value2,
            value3: entity.value3,
            value4: entity.value4,
            value5: entity.value5,
            created_date: entity.createdDate,
            updated_date: entity.updatedDate,
            user_id: entity.userId,
            user_updated_id: entity.userUpdated
        };
    }

    entitiesToResponse(entities: UnitsDynamicCentral[] | null): any {
        const response: any[] = [];
    
        if(entities != null){
            for (const entity of entities) {
                response.push(this.entityToResponse(entity));
            }
        }
        
        return response;
    }
    
    //PUT
    entityFromPutBody() : UnitsDynamicCentral{
        const entity = new UnitsDynamicCentral();
        entity.name = this.req.body.name;
        entity.type = this.req.body.type;
        entity.description = this.req.body.description || null;
        entity.value1 = this.req.body.value1;
        entity.value2 = this.req.body.value2 || null;
        entity.value3 = this.req.body.value3 || null;
        entity.value4 = this.req.body.value4 || null;
        entity.value5 = this.req.body.value5 || null;
        entity.countryIsoCode = this.req.body.country_iso_code || null;
        entity.updatedDate = new Date();
        entity.userUpdatedId = this.req.body.user_updated_id || null;
        return entity;
    }
}
