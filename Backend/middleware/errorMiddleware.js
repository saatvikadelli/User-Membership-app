const notFound = (req, res,next)=>{
    const error = new Error(`NotFound - ${req.originalURL}`);
    res.status(404);
    next(error);
}

const errorHandler =(err, req, res, next)=>{
    let statusCode = res.statusCode === 200? 500: res.statusCode;
    let message = err.message;

    if(err.name === 'CatError' && err.kind=== 'ObjectId'){
        statusCode = 404;
        message ='Resource not found';

    }
    res.status(statusCode).json({
        message,
        stack :process.env.NODE_ENV === 'production'? null: err.stack
    });
}

export {notFound, errorHandler};