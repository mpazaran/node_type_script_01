// @ts-ignore
import {ParamsDictionary, Query, Request, Response} from "express-serve-static-core"
import {APIErrorInterface, APIResponseInterface} from "./server";

//import {MongoServerError} from "mongodb";

export interface GetIdParamInterface {
    id: number | string
}

export interface SearchFilterInterface {
    f: string
    v: any
    c: "eq" |
        "gt" |
        "lt" |
        "gte" |
        "lte" |
        "ne" |
        "in" |
        "nin"
}

export interface SearchSortInterface {
    f: string
    d: "a" | "d"
}

export interface SearchQueryInterface {
    p?: number
    ps?: number
    //f?: SearchFilterInterface[]
    f?: string | { [key: string]: any }
    s?: SearchSortInterface[]
}

abstract class ApiController<RequestParamsType = ParamsDictionary,
    RequestQueryType = Query,
    RequestBodyType = any,
    SuccessResponseData = any,
    ErrorResponseData = any> {

    private readonly _request: Request<RequestParamsType, any, RequestBodyType, RequestQueryType>;
    private readonly _response: Response<APIResponseInterface | APIErrorInterface>;

    constructor(
        request: Request<RequestParamsType, any, RequestBodyType, RequestQueryType>,
        response: Response) {
        this._request  = request
        this._response = response
    }

    abstract execute(): void | any

    success(data: SuccessResponseData) {
        this.response
            .json(
                {
                    ok  : true,
                    data: data
                }
            )
    }

    error(message: string, data: ErrorResponseData | undefined = undefined, status: number = 500) {
        this.response
            .status(status)
            .json(
                {
                    ok     : false,
                    message: message,
                    data
                }
            )
    }

    exception(error: any | Error) {
        /*if(typeof error === MongoServerError && en){

        }*/
        this.response
            .status(500)
            .json(
                {
                    ok       : false,
                    message  : error.message,
                    errorInfo: error
                }
            )
    }

    get request(): Request<RequestParamsType, any, RequestBodyType, RequestQueryType> {
        return this._request;
    }

    get response(): Response<APIResponseInterface | APIErrorInterface> {
        return this._response;
    }

}

export default ApiController
