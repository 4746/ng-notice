import {NoticeType} from '../types/notice.type';

/**
 * Toast styles
 */
export interface INoticeStyles {
  simple: NoticeType;
  success: NoticeType;
  error: NoticeType;
  warning: NoticeType;
  info: NoticeType;
  async: NoticeType;
  confirm: NoticeType;
  prompt: NoticeType;
}
