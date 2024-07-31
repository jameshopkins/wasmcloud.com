import { Joi } from '@docusaurus/utils-validation';
import type { OptionValidationContext } from '@docusaurus/types';
import type { DecapCmsApp } from 'decap-cms-app';

type ComponentOptions = Parameters<typeof DecapCmsApp.registerEditorComponent>[0];

export type CmsConfig = Exclude<Parameters<typeof DecapCmsApp.init>[0], undefined>['config'];

type Options = {
  configYamlPath?: string;
  adminPath?: string;
  config?: CmsConfig;
  registerComponents?: ComponentOptions[];
};

type PluginOptions = {
  configYamlPath: string;
  adminPath: string;
  config?: CmsConfig;
  registerComponents?: ComponentOptions[];
};

const schema = Joi.object({
  configYamlPath: Joi.string().default('./config.cms.yaml'),
  adminPath: Joi.string().default('/admin'),
  config: Joi.object().optional(),
  registerComponents: Joi.array().items(Joi.any()).optional(),
});

function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(schema, options);
}

export { type Options, type PluginOptions, validateOptions };
