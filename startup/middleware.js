const express = require('express');
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/', require('./../router/auth'));
    app.use('/api/users/', require('./../router/user'));

    app.use(require('./../controller/errors'));
};
