const extractApi = require('./extractApi');
const extractEnvironment = require('./extractEnvironment');
const extractRstIcons = require('./extractRstIcons');

extractApi.writeApi();
extractEnvironment.writeEnvironment();
extractRstIcons.writeRstIcons();
