const errorHandler = (error, req, res, next) => {
    console.log('Error: ', error);

    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(
            err => err.message
        );

        return res.status(400).json({
            error: "Validation failed",
            details: errors
        });
    }

    if(error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(409).json({
            error: `${field} already exists` 
        });
    }

    if(error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    if(error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token expired'
        });
    }
    
    res.status(error.status || 500).json({
        error: error.message || 'Internal server error'
    });

};

export default { errorHandler };
