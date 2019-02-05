import {NoticeToast} from '../toast/notice-toast.model';

/**
 * Notifications object
 */
export interface INoticeNotifications {
  left_top?: NoticeToast[];
  left_center?: NoticeToast[];
  left_bottom?: NoticeToast[];

  right_top?: NoticeToast[];
  right_center?: NoticeToast[];
  right_bottom?: NoticeToast[];

  center_top?: NoticeToast[];
  center_center?: NoticeToast[];
  center_bottom?: NoticeToast[];
}
