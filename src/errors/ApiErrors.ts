export class ApiErrors extends Error{
    statusCode:number;
    constructor(message:string, statusCode:number){
        super(message);
        this.statusCode=statusCode;
        Object.setPrototypeOf(this, ApiErrors.prototype);
    }   

    static badRequest(message="Bad Request"){
        return new ApiErrors(message, 400);
    }
     static notFound(message="Not Found"){
        return new ApiErrors(message, 404);
    }
     static unAuthorized(message="Unauthorized"){
        return new ApiErrors(message, 401);
    }
     static internal(message="Internal Server Error"){
        return new ApiErrors(message, 500);
    }
}