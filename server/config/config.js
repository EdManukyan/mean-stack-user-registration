// Checking env.
var env = process.env.NODE_ENV || 'development';

// Fetching env. configuration
var config = require('./config.json');
var envConfig = config[env];

// Add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
