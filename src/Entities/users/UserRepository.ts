//Type ORM
import { FindOneOptions  } from "typeorm";
import { createConnection } from 'typeorm';

//Entities
import GenericRepository from '../../Generics/Repository/GenericRepository';
import { Users } from '../../../models_type_orm/entities/Users'

export default  class UserRepository extends GenericRepository{

    async getUserByEmail(entity: any): Promise<Users | null> {

        const connection = await createConnection();

        try {
            const user : Users = entity;
            const email = user.email;

            //find by user and password
            const repository = connection.getRepository(Users);
            let options: FindOneOptions = { where: { email: email, isDeleted : 0, isActive: 1} }; 
            const getEntity = await repository.findOne(options); 
            return getEntity ; 

        } catch (error : any) {
            throw error;

        } finally {
            if(connection){
                await connection.close();
            }
        }
    }



    async getUserByEmailParam(email: string): Promise<Users | null> {

        const connection = await createConnection();

        try {
            //find by user and password
            const repository = connection.getRepository(Users);
            let options: FindOneOptions = { where: { email: email, isDeleted : 0} }; 
            const getEntity = await repository.findOne(options); 
            return getEntity ; 

        } catch (error : any) {
            throw error;

        } finally {
            if(connection){
                await connection.close();
            }
        }
    }

}

