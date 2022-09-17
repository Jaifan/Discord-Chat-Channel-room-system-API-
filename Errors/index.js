const badRequest = require('./badRequest');
const customAPI = require('./customAPI');
const notAuthenticated = require('./notAuthenticated');
const nullFound = require('./nullFound');

module.exports={
    customAPI,
    badRequest,
    notAuthenticated,
    nullFound
};