// to make the file a module and avoid the TypeScript error
import jwt from "jsonwebtoken";

export {}

declare module 'jsonwebtoken' {
    export interface JwtPayloadWithUserData extends jwt.JwtPayload {
        uuid: string/*;
        email: string;
        first_name: string;
        last_name: string;
        role: string;*/
    }
}
