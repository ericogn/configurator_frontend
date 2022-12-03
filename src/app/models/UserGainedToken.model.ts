import { UserDataRetrieved } from "./UserDataRetrieved.model";
import { DataToken } from "./UserDataToken.model";

export interface UserGainedToken{
    success:number,
    user:UserDataRetrieved,
    token:DataToken
}