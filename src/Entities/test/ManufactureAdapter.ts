import { Request } from 'express';
//import { Manufactures } from "../../../models_type_orm/entities/Manufactures"
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';

export default  class ManufactureAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }
    //POST
    entityFromPostBody() /*: Manufactures*/{
       /* const entity = new Manufactures();
        entity.name = this.req.body.name;
        entity.city = this.req.body.city || null;
        entity.address = this.req.body.address || null;
        entity.countryIsoCode = this.req.body.country_iso_code || null;
        entity.email = this.req.body.email || null;
        entity.state = this.req.body.state || null;
        entity.zipCode = this.req.body.zip_code || null;
        entity.phone = this.req.body.phone || null;
        entity.website = this.req.body.website || null;
        entity.udcIndustryType = this.req.body.industry_type;
        entity.notes = this.req.body.notes || null;
        entity.createdDate = new Date();
        return entity;*/
    }

    entityToResponse(entity: any/*Manufactures*/) : any{
        return  {
            id : entity.id,
            name: entity.name,
            address: entity.address,
            city: entity.city ,
            state: entity.state,
            zip_code: entity.zipCode,
            country_iso_code: entity.countryIsoCode,
            phone: entity.phone,
            email: entity.email,
            website: entity.createdDate,
            industry_type: entity.udcIndustryType,
            notes: entity.notes,
            created_date: entity.createdDate,
            updated_date: entity.updatedDate
        };
    }

    entitiesToResponse(entities: /*Manufactures[] | */null): any {
        const response: any[] = [];
    
        /*if(entities != null){
            for (const entity of entities) {
                response.push(this.entityToResponse(entity));
            }
        }*/
        return response;
    }
    
    //PUT
    entityFromPutBody() /*: Manufactures*/{
        /*const entity = new Manufactures();

        entity.name = this.req.body.name || null;
        entity.city = this.req.body.city || null;
        entity.address = this.req.body.address || null;
        entity.countryIsoCode = this.req.body.country_iso_code || null;
        entity.email = this.req.body.email || null;
        entity.state = this.req.body.state || null;
        entity.zipCode = this.req.body.zip_code || null;
        entity.phone = this.req.body.phone || null;
        entity.website = this.req.body.website || null;
        entity.udcIndustryType = this.req.body.industry_type;
        entity.notes = this.req.body.notes || null;
        entity.updatedDate = new Date();

        return entity;*/
    }
}
