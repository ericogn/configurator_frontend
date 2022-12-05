export interface LoginResponse{
    success: number,
    status: number,
    message: string,
    email:string,
    firstname:string,
    lastname:string,
    company:string,
    lastproject:number,
    token:string;
}