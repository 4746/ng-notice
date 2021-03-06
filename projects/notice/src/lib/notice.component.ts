import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {NoticeService} from './notice.service';
import {NoticeToast} from './toast/notice-toast.model';
import {Subscription} from 'rxjs';
import {INoticeNotifications} from './interfaces/notice-notifications.interface';
import {NoticePosition} from './enums/notice-position.enum';
import {NoticeEventType} from './types/notice-event.type';

@Component({
  selector: 'notice-section',
  templateUrl: './notice.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NoticeComponent implements OnInit, OnDestroy {
  /**
   * Toasts array
   */
  notifications: INoticeNotifications;
  /**
   * Toasts emitter
   */
  emitter: Subscription;
  /**
   * Helper for slice pipe (maxOnScreen)
   */
  dockSize_a: number;
  /**
   * Helper for slice pipe (maxOnScreen)
   */
  dockSize_b: number | undefined;
  /**
   * Helper for slice pipe (maxAtPosition)
   */
  blockSize_a: number;
  /**
   * Helper for slice pipe (maxAtPosition)
   */
  blockSize_b: number | undefined;
  /**
   * Backdrop Opacity
   */
  backdrop = -1;
  /**
   * How many toasts with backdrop in current queue
   */
  withBackdrop: NoticeToast[];

  constructor(
    private service: NoticeService
  ) {}

  /**
   * Init base options. Subscribe to options, lifecycle change
   */
  ngOnInit() {
    this.emitter = this.service.emitter.subscribe(
      (toasts: NoticeToast[]) => {

        if (this.service.config.global.newOnTop) {
          this.dockSize_a = -this.service.config.global.maxOnScreen;
          this.dockSize_b = undefined;
          this.blockSize_a = -this.service.config.global.maxAtPosition;
          this.blockSize_b = undefined;
          this.withBackdrop = toasts.filter(toast => toast.config.backdrop >= 0);
        } else {
          this.dockSize_a = 0;
          this.dockSize_b = this.service.config.global.maxOnScreen;
          this.blockSize_a = 0;
          this.blockSize_b = this.service.config.global.maxAtPosition;
          this.withBackdrop = toasts.filter(toast => toast.config.backdrop >= 0).reverse();
        }
        this.notifications = this.splitToasts(toasts.slice(this.dockSize_a, this.dockSize_b));
        this.stateChanged('mounted');
      }
    );

  }

  // TODO: fix backdrop if more than one toast called in a row
  /**
   * Changes the backdrop opacity
   */
  stateChanged(event: NoticeEventType) {
    if (!this.withBackdrop.length) {
      if (this.backdrop >= 0) {
        this.backdrop = -1;
      }
      return;
    }
    switch (event) {
      case 'mounted':
        if (this.backdrop < 0) {
          this.backdrop = 0;
        }
        break;
      case 'beforeShow':
        this.backdrop = this.withBackdrop[this.withBackdrop.length - 1].config.backdrop;
        break;
      case 'beforeHide':
        if (this.withBackdrop.length === 1) {
          this.backdrop = 0;
        }
        break;
      case 'hidden':
        if (this.withBackdrop.length === 1) {
          this.backdrop = -1;
        }
        break;
    }

  }

  /**
   * Split toasts toasts into different objects
   */
  splitToasts(toasts: NoticeToast[]): INoticeNotifications {
    const result: INoticeNotifications = {};

    for (const property in NoticePosition) {
      if (NoticePosition.hasOwnProperty(property)) {
        result[NoticePosition[property]] = [];
      }
    }

    toasts.forEach((toast: NoticeToast) => {
      result[toast.config.position as string].push(toast);
    });

    return result;
  }

  /**
   * Unsubscribe subscriptions
   */
  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
