// prevent CMS from starting since we want to configure it manually
window.CMS_MANUAL_INIT = true;

import CMS from 'decap-cms-app';
import React from 'react';
import MDXComponents from '@theme/MDXComponents';
import MDXContent from '@theme/MDXContent';

type RawConfig = Exclude<Parameters<typeof CMS.init>[0], undefined>['config'];
export type CmsConfig = RawConfig & {
  collections: RawConfig['collections'];
  media_folder: string;
  media_library: RawConfig['media_library'];
};

type AdminProps = {
  config: CmsConfig;
};

function Admin({ config }: AdminProps) {
  React.useEffect(() => {
    CMS.init({
      config: {
        load_config_file: false,
        ...config,
      },
    });

    CMS.registerCustomFormat('docusaurus', 'mdx', {
      fromFile(content) {
        // TODO(lachieh): Investigate docusaurus frontmatter parsing
        // extract the frontmatter, and parse the body using mdx with remark and
        // rehype plugins from docusaurus config.
      },
      toFile(data, sortedKeys, comments) {
        // TODO(lachieh): Determine how to serialize the frontmatter and body
        return 'beepboophavesomemarkdown';
      },
    });
  }, []);

  return <div id="nc-root" />;
}

export default Admin;
