import {SafeHtml} from '@angular/platform-browser';
import {INoticeButton} from './notice-button.interface';
import {INoticeAnimate} from './notice-animate.interface';
import {NoticeType} from '../types/notice.type';
import {NoticePosition} from '../enums/notice-position.enum';

/**
 * Toast configuration object
 */
export interface INoticeToastConfig {

  /**
   * Toast timeout in milliseconds.
   * Disable timeout = 0
   *
   * @default: 2000
   */
  timeout?: number;
  /**
   * Enable/Disable progress bar.
   * Disabled if timeout is 0.
   *
   * @default true
   */
  showProgressBar?: boolean;
  /**
   * Type of toast, affects toast style.
   * It's not recommended to change it.
   * Depends on toast type.
   *
   * @default SnotifyStyle.SIMPLE | SnotifyStyle.SUCCESS | SnotifyStyle. ERROR | SnotifyStyle.WARNING etc..
   */
  type?: NoticeType;
  /**
   * Should toast close on click?
   *
   * @default true
   */
  closeOnClick?: boolean;
  /**
   * Should timeout pause on hover?
   *
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Buttons config.
   *
   * @default Look snotify button description
   */
  buttons?: INoticeButton[];
  /**
   * Placeholder for Prompt toast
   *
   * @default 'Enter answer here...'
   */
  placeholder?: string;
  /**
   * Toast title maximum length
   *
   * @default 16
   */
  titleMaxLength?: number;
  /**
   * Toast body maximum length
   *
   * @default 150
   */
  bodyMaxLength?: number;
  /**
   * Activate custom icon.
   * You should provide full tag, e.g.
   * ```html
   * <img src="assets/custom-icon.png"/>
   * ```
   * ```html
   * <svg x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 48 48;" xml:space="preserve" width="48px" height="48px">
   *     <g><path....../></g>
   * </svg>
   * ```
   *
   * @default Depends on toast type. Look more in icon.component.html
   */
  icon?: string;

  /**
   * Custom icon class.
   *
   * @default null
   */
  iconClass?: string;
  /**
   * Backdrop opacity.
   * * **Range:** `0.0 - 1.0`.
   * * **Disabled:** `-1`
   *
   * @default -1
   */
  backdrop?: number;
  /**
   * Animation config
   *
   * @default -1
   */
  animation?: INoticeAnimate;
  /**
   * Html string witch overrides toast content
   *
   * @default null
   */
  html?: string | SafeHtml;
  /**
   * Toasts position on screen
   *
   * @default NoticePosition.rightBottom
   */
  position?: NoticePosition;
}
