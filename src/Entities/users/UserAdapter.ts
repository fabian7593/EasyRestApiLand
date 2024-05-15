import { Request } from 'express';
import { Users } from "../../../models_type_orm/entities/Users"
import IAdapterFromBody from '../../Generics/Adapter/IAdapterFromBody';

export default  class UserAdapter implements IAdapterFromBody{
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }


    //POST
    entityFromPostBody() : Users{
        const entity = new Users();
        entity.id = this.req.body.id || null;
        entity.cardId = this.req.body.card_id;
        entity.firstName = this.req.body.first_name;
        entity.lastName = this.req.body.last_name;
        entity.email = this.req.body.email;
        entity.phoneNumber = this.req.body.phone_number;
        entity.latitude = this.req.body.latitude;
        entity.longitude = this.req.body.longitude;
        entity.password = this.req.body.password;
        entity.gender = this.req.body.gender || null;
        entity.birthDate = this.req.body.birth_date || null;
        entity.countryIsoCode = this.req.body.country_iso_code || null;
        entity.roleCode = this.req.body.role_code;
        return entity;
    }

    entityToResponse(user: Users) : any{
    
        return  {
            id : user.id,
            card_id: user.cardId,
            first_name: user.firstName,
            lastName: user.lastName,
            full_name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone_number: user.phoneNumber,
            latitude: user.latitude,
            longitude: user.longitude,
            country_iso_code: user.countryIsoCode,
            gender: user.gender,
            birth_date: user.birthDate,
            role: user.roleCode
        };
    }

    entitiesToResponse(entities: Users[] | null): any {
        const response: any[] = [];
    
        if(entities != null){
            for (const entity of entities) {
                response.push(this.entityToResponse(entity));
            }
        }
        
        return response;
    }
    


    //PUT
    entityFromPutBody() : Users{
        const entity = new Users();
        entity.cardId = this.req.body.card_id;
        entity.firstName = this.req.body.first_name;
        entity.lastName = this.req.body.last_name;
        entity.email = this.req.body.email;
        entity.phoneNumber = this.req.body.phone_number;
        entity.latitude = this.req.body.latitude || null;
        entity.longitude = this.req.body.longitude || null;
        entity.gender = this.req.body.gender || null;
        entity.birthDate = this.req.body.birth_date || null;
        return entity;
    }



    //Login
    tokenToResponse(accessToken: string, refreshToken: string, screens : string[] | null) : any{
        return  {
            access_token : accessToken,
            refresh_token: refreshToken,
            screens_access: screens
        };
    }

    refreshToResponse(accessToken: string) : any{
        return  {
            access_token : accessToken
        };
    }

    userFromBodyLogin(): Users{
        const userLogin = new Users();
        userLogin.email = this.req.body.email;
        userLogin.password = this.req.body.password;
    
        return userLogin;
    }
}
