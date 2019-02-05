import {Subject, Subscription} from 'rxjs';
import {INoticeToastConfig} from '../interfaces/notice-toast-config.interface';
import {NoticeType} from '../types/notice.type';
import {NoticeStyle} from '../enums/notice-style.enum';

// @TODO remove method in observable way
/**
 * Toast main model
 */
export class NoticeToast {

  // readonly eventEmitter = new Subject<NoticeType>();
  readonly eventEmitter = new Subject<any>();
  /**
   * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
   * @type {Subscription[]}
   * @private
   */
  private _eventsHolder: Subscription[] = [];
  /**
   * Toast prompt value
   */
  value: string;
  /**
   * Toast validator
   */
  valid: boolean;

  constructor(
    public id: number,
    public title: string,
    public body: string,
    public config: INoticeToastConfig
  ) {
    if (this.config.type === NoticeStyle.prompt) {
      this.value = '';
    }
    this.on('hidden', () => {
      this._eventsHolder.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    });
  }

  /**
   * Subscribe to toast events
   */
  on(event: NoticeType | string, action: (toast: this) => void): this {
    this._eventsHolder.push(
      this.eventEmitter.subscribe((e: NoticeType) => {
        if (e === event) {
          action(this);
        }
      })
    );
    return this;
  }

  /**
   * Tests if a toast equals this toast.
   * @param {SnotifyToast} toast
   * @returns {boolean} true then equals else false.
   */
  equals(toast: NoticeToast): boolean {
    return this.body === toast.body &&
      this.title === toast.title &&
      this.config.type === toast.config.type;
  }

}
