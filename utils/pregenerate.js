const extractApi = require('./extractApi');
const extractEnvironment = require('./extractEnvironment');
const extractRstIcons = require('./extractRstIcons');
const extractThemeDefaults = require('./extractThemeDefaults');

extractApi.writeApi();
extractEnvironment.writeEnvironment();
extractRstIcons.writeRstIcons();
extractThemeDefaults.writeThemeDefaults();
