const packageJson = require('../../package.json') as { name: string };

export const PLUGIN_NAME = packageJson.name;
