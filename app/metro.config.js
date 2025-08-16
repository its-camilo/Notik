const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure the HTML template is processed correctly
config.resolver.platforms = ['web', 'native', 'ios', 'android'];

module.exports = config;
