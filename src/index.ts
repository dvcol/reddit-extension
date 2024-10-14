// @ts-expect-error chrome issue
import type { chrome } from 'chrome';

import type { DefineComponent, WebComponents } from '~/web/define-component';

export const baseUrl = 'reddit-extension' as const;

type RedditExtension = {
  WebComponents: WebComponents;
  defineComponent: DefineComponent;
  default: DefineComponent;
};

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

export type { RedditExtension, DefineComponent, WebComponents };
