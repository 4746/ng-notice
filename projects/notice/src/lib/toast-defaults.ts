import {NoticePosition} from './enums/notice-position.enum';
import {NoticeStyle} from './enums/notice-style.enum';

/**
 * Snotify default configuration object
 */
export const ToastDefaults = {
  global: {
    newOnTop: true,
    maxOnScreen: 8,
    maxAtPosition: 8,
    filterDuplicates: false
  },
  toast: {
    type: NoticeStyle.simple,
    showProgressBar: true,
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    bodyMaxLength: 150,
    titleMaxLength: 16,
    backdrop: -1,
    icon: null,
    iconClass: null,
    html: null,
    position: NoticePosition.rightBottom,
    animation: {enter: 'fadeIn', exit: 'fadeOut', time: 400}
  },
  type: {
    [NoticeStyle.prompt]: {
      timeout: 0,
      closeOnClick: false,
      buttons: [
        {text: 'Ok', action: null, bold: true},
        {text: 'Cancel', action: null, bold: false},
      ],
      placeholder: 'Enter answer here...',
      type: NoticeStyle.prompt,
    },
    [NoticeStyle.confirm]: {
      timeout: 0,
      closeOnClick: false,
      buttons: [
        {text: 'Ok', action: null, bold: true},
        {text: 'Cancel', action: null, bold: false},
      ],
      type: NoticeStyle.confirm,
    },
    [NoticeStyle.simple]: {
      type: NoticeStyle.simple
    },
    [NoticeStyle.success]: {
      type: NoticeStyle.success
    },
    [NoticeStyle.error]: {
      type: NoticeStyle.error
    },
    [NoticeStyle.warning]: {
      type: NoticeStyle.warning
    },
    [NoticeStyle.info]: {
      type: NoticeStyle.info
    },
    [NoticeStyle.async]: {
      pauseOnHover: false,
      closeOnClick: false,
      timeout: 0,
      showProgressBar: false,
      type: NoticeStyle.async
    }
  }
};
