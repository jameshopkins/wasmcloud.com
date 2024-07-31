import docusaurusLogger from '@docusaurus/logger';
import terminalLink from 'terminal-link';
import { PLUGIN_NAME } from './constants';

function logger(name?: string) {
  const ROOT_PREFIX = `[${PLUGIN_NAME}]`;
  const PREFIX = docusaurusLogger.bold(name ? `[${PLUGIN_NAME}:${name}]` : ROOT_PREFIX);

  function format(message: string) {
    const multiline: boolean = message.includes('\n');
    return `${PREFIX}${multiline ? '\n' : ' '}${message}`;
  }

  return {
    log(message: string) {
      docusaurusLogger.report('log')(format(message));
    },

    warn(message: string) {
      docusaurusLogger.report('warn')(format(message));
    },

    throw(message: string) {
      docusaurusLogger.report('throw')(format(message));
    },

    /**
     * Interpolates a template string with the provided values.
     * @param files array of file paths
     * @returns multiline string with each file path prefixed with 'path='
     */
    formatFiles(files: string[]) {
      return docusaurusLogger.interpolate`path=${files}`;
    },

    /**
     * format a string as a link that can be clicked in the terminal
     * @param text
     * @param url
     * @returns a string that can be clicked in the terminal
     */
    formatLink(text: string, url: string) {
      return terminalLink(text, url);
    },
  };
}

const rootLogger = logger();

export default rootLogger;
