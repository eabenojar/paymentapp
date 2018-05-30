// KEYS JS
if(process.env.NODE_ENV === 'production'){
    //RETURN PROD KEYS
    module.exports = require('./prod');
} else {
    //RETURN DEV KEYS
    module.exports = require('./dev');
}