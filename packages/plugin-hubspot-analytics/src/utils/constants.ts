import { packageUpSync } from 'package-up';
import fs from 'node:fs';

function getPluginName() {
  const packageStr = packageUpSync({ cwd: __dirname });
  if (!packageStr) throw new Error('Could not find package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageStr, 'utf-8')) as { name: string };
  return packageJson.name;
}

export const PLUGIN_NAME = getPluginName();
