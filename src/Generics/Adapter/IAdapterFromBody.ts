
/*
    Every Entity need to create your own Adapter
    This is not about the desing pattern adapter, it is like the adapter of body json to entity
    This adapters implements this interface, to have the generic methods for adapt.
*/
interface IAdapterFromBody {
    entityFromPostBodyWithParams?(body: any): any;
    entityFromPostBody(): any;
    entityFromPutBody(): any;
    entityToResponse(entity: any): any;
    entitiesToResponse(entities: any[] | null): any 
   
}

export default IAdapterFromBody;