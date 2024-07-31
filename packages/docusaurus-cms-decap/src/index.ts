import fs from 'node:fs/promises';
import path from 'node:path';
import { Plugin, LoadContext } from '@docusaurus/types';
import rootLogger from './utils/logger';
import { PLUGIN_NAME } from './utils/constants';
import { CmsConfig, PluginOptions } from './options';
import { load as loadYaml } from 'js-yaml';

export type AdminProps = {
  config: CmsConfig;
};

export default async function docusaurusChecks(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<void>> {
  const { adminPath, configYamlPath, config } = options;

  const srcDirectory = path.resolve(__dirname, '..', 'src');
  const themeDirectory = path.resolve(srcDirectory, 'client/theme');
  const fullConfigPath = path.resolve(context.siteDir, configYamlPath);

  let parsedConfig: CmsConfig | undefined = config;

  try {
    const contents = await fs.readFile(fullConfigPath, 'utf-8');
    parsedConfig = config ?? (loadYaml(contents) as CmsConfig);

    if (!parsedConfig) throw new Error('No CMS configuration found');
  } catch (e) {
    if (e instanceof Error && e.message) {
      rootLogger.throw(e.message);
    } else {
      rootLogger.throw('An error occurred while loading the CMS configuration');
    }
    process.exit(1);
  }

  return {
    name: PLUGIN_NAME,

    getPathsToWatch() {
      return [fullConfigPath];
    },

    async contentLoaded({ actions }) {
      const configPath = await actions.createData('config.json', JSON.stringify(parsedConfig));

      actions.addRoute({
        component: path.resolve(themeDirectory, 'Admin/index.tsx'),
        exact: true,
        path: adminPath,
        modules: {
          config: configPath,
        },
      });
    },
  };
}

export { validateOptions, type Options } from './options';
