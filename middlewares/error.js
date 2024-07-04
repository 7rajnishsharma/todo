class ErrorHandler extends Error{
    constructor(messege, statusCode){
        super(messege);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) =>{
    err.messege = err.messege || "Internal Server Error"
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success: false,
        messege: err.messege,  
})
}

export default ErrorHandler;