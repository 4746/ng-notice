import {SafeHtml} from '@angular/platform-browser';
import {INoticeToastConfig} from './notice-toast-config.interface';

/**
 * Snotify toast params
 */
export interface INotice {
  /**
   * Toast Title
   * @type {string}
   */
  title?: string;
  /**
   * Toast message
   * @type {string}
   */
  body?: string;
  /**
   * Config object
   */
  config?: INoticeToastConfig;
  /**
   * Html content
   */
  html?: string | SafeHtml;
}
