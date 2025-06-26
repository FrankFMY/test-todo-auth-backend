// Централизованный обработчик ошибок Express
module.exports = (err, req, res, _next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
};
