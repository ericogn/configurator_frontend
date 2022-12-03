import { UserDetails } from "./UserDetails.model";

export interface DataToken{
    iss:string;
    aud:string;
    iat:Number;
    exp:number;
    data:UserDetails
}