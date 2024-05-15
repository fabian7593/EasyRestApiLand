
import { Request, Response } from 'express';
import IAdapterFromBody from "../Adapter/IAdapterFromBody";
import { FindManyOptions } from 'typeorm';

/*
    This class is an object to send into Controllers to do some necessary functionallities
    as regex validate, is remove logical, if need role validations, and others.
*/
export default class RequestHandler {
    private res: Response;
    private req: Request;
    private method: string = "";
    private adapter: IAdapterFromBody;
    private requireValidateRole: boolean = false;
    private requireLogicalRemove: boolean = false;
    private requireValidWhereByUserId: boolean = false;
    private regexValidatorList: [string, string][] | null = null;
    private filters: FindManyOptions | null = null;

    constructor(res: Response, req: Request, 
                method: string, 
                adapter: IAdapterFromBody, 
                requireValidateRole: boolean,
                requireLogicalRemove: boolean,
                requireValidWhereByUserId: boolean,
                regexValidatorList: [string, string][] | null,
                filters: FindManyOptions) {
        this.res = res;
        this.req = req;
        this.method = method;
        this.adapter = adapter;
        this.requireValidateRole = requireValidateRole;
        this.requireLogicalRemove = requireLogicalRemove;
        this.requireValidWhereByUserId = requireValidWhereByUserId;
        this.regexValidatorList = regexValidatorList;
        this.filters = filters;
    }

     // Getters
     getResponse(): Response {
        return this.res;
    }

    getRequest(): Request {
        return this.req;
    }

    getMethod(): string {
        return this.method;
    }

    getAdapter(): IAdapterFromBody {
        return this.adapter;
    }

    getNeedValidateRole(): boolean {
        return this.requireValidateRole;
    }

    getNeedLogicalRemove(): boolean {
        return this.requireLogicalRemove;
    }

    getRequireValidWhereByUserId(): boolean {
        return this.requireValidWhereByUserId;
    }

    getRegexValidatorList(): [string, string][] | null {
        return this.regexValidatorList;
    }

    getFilters(): FindManyOptions | null {
        return this.filters;
    }
}
        

