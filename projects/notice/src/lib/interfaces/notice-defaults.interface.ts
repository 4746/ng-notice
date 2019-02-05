import {INoticeToastConfig} from './notice-toast-config.interface';
import {INoticeGlobalConfig} from './notice-global-config.interface';

/**
 * Global configuration object
 */
export interface INoticeDefaults {
  global?: INoticeGlobalConfig;
  toast?: INoticeToastConfig;
  type?: {
    [key: string]: INoticeToastConfig
  };
}
