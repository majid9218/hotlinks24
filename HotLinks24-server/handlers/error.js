function errorHandler(error, req, res, next){
    return res.status(error.status || 500).json({
        error: {
            message: error.message || 'Internal Server Error 500!'
        }
    });
}

module.exports = errorHandler;