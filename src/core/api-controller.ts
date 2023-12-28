// @ts-ignore
import {ParamsDictionary, Query, Request, Response} from "express-serve-static-core"
import {APIErrorInterface, APIResponseInterface} from "./server";

export interface GetIdParamInterface {
    id: number | string
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

    abstract execute(): void

    success(data: SuccessResponseData) {
        // @ts-ignore
        this.response
            .json(
                {
                    ok  : true,
                    data: data
                }
            )
    }

    error(message: string, data: ErrorResponseData | undefined = undefined, status: number = 500) {
        // @ts-ignore
        this.response
            .status(status)
            .json(
                {
                    ok: false,
                    message,
                    data
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
