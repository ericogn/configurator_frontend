export interface LoginResponse{
    success: number,
    message: string,
    email:string,
    firstname:string,
    lastname:string,
    company:string,
    token:string;
}