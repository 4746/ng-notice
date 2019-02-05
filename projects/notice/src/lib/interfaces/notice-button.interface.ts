import {NoticeToast} from '../toast/notice-toast.model';

/**
 * Buttons config.
 */

/**
 * Buttons config
 */
export interface INoticeButton {
  /**
   * Button text
   * @type {string}
   */
  text: string;
  /**
   * Action which will be called after button click
   * @type {function}
   * @param text? {string}
   *
   * @default this.remove(id)
   */
  action?: (toast: NoticeToast) => void;
  /**
   * Should button text be bold.
   */
  bold?: boolean;
}
