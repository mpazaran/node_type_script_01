// @ts-ignore
import {ParamsDictionary, Query, Request, Response} from "express-serve-static-core"
import {APIErrorInterface, APIResponseInterface} from "../server";

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
        request: Request<RequestParamsType, any, RequestBodyType, RequestQueryType> | any,
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
                    message  : error?.message,
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

    getQuery(addFilterDeleted: boolean = false, field: string = "status", value: string = "d"): RequestBodyType | any {
        let query: RequestBodyType | any = this.request.body

        if (!addFilterDeleted) {
            return query
        }
        if (query.hasOwnProperty("status")) {
            let statusDeleted = [
                {
                    [field]: query[field]
                },
                {
                    [field]: {"$ne": value}
                }
            ]
            delete query.status

            if (query.hasOwnProperty("$and")) {
                query["$and"] = [
                    ...query["$and"],
                    ...statusDeleted
                ]
            } else {
                query["$and"] = [
                    query,
                    ...statusDeleted
                ]
            }

            return query

        } else {
            return {
                "$and": [
                    query,
                    {
                        [field]: {"$ne": value}
                    }
                ]
            }
        }
    }

}

export default ApiController
