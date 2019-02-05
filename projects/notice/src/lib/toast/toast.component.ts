import {AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';

import {NoticeService} from '../notice.service';
import {NoticeToast} from './notice-toast.model';
import {NoticeStyle} from '../enums/notice-style.enum';
import {NoticeEventType} from '../types/notice-event.type';

@Component({
  selector: 'notice-toast',
  templateUrl: './toast.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent implements OnInit, OnDestroy, AfterContentInit {
  /**
   * Get toast from notifications array
   */
  @Input() toast: NoticeToast;
  @Output() stateChanged = new EventEmitter<NoticeEventType>();

  toastDeletedSubscription: Subscription;
  toastChangedSubscription: Subscription;

  /**
   * requestAnimationFrame id
   */
  animationFrame: number;

  /**
   * Toast state
   */
  state = {
    paused: false,
    progress: 0,
    animation: '',
    isDestroying: false,
    promptType: NoticeStyle.prompt
  };

  constructor(
    private service: NoticeService
  ) {
  }

  // Lifecycles

  /**
   * Init base options. Subscribe to toast changed, toast deleted
   */
  ngOnInit() {
    this.toastChangedSubscription = this.service.toastChanged.subscribe(
      (toast: NoticeToast) => {
        if (this.toast.id === toast.id) {
          this.initToast();
        }
      }
    );
    this.toastDeletedSubscription = this.service.toastDeleted.subscribe(
      (id) => {
        if (this.toast.id === id) {
          this.onRemove();
        }
      }
    );
    if (!this.toast.config.timeout) {
      this.toast.config.showProgressBar = false;
    }
    this.toast.eventEmitter.next('mounted');
    this.state.animation = 'NoticeToast--in';
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.stateChanged.emit('beforeShow');
      this.toast.eventEmitter.next('beforeShow');
      this.state.animation = this.toast.config.animation.enter;
    }, this.service.config.toast.animation.time / 5); // time to show toast push animation (snotifyToast--in)
  }

  /**
   * Unsubscribe subscriptions
   */
  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.toast.eventEmitter.next('destroyed');
    this.toastChangedSubscription.unsubscribe();
    this.toastDeletedSubscription.unsubscribe();
  }

  /*
  Event hooks
   */

  /**
   * Trigger OnClick lifecycle
   */
  onClick() {
    this.toast.eventEmitter.next('click');
    if (this.toast.config.closeOnClick) {
      this.service.remove(this.toast.id);
    }
  }

  /**
   * Trigger beforeDestroy lifecycle. Removes toast
   */
  onRemove() {
    this.state.isDestroying = true;
    this.toast.eventEmitter.next('beforeHide');
    this.stateChanged.emit('beforeHide');
    this.state.animation = this.toast.config.animation.exit;
    setTimeout(() => {
      this.stateChanged.emit('hidden');
      this.state.animation = 'snotifyToast--out';
      this.toast.eventEmitter.next('hidden');
      setTimeout(() => this.service.remove(this.toast.id, true), this.toast.config.animation.time / 2);
    }, this.toast.config.animation.time / 2);
  }

  /**
   * Trigger onHoverEnter lifecycle
   */
  onMouseEnter() {
    this.toast.eventEmitter.next('mouseenter');
    if (this.toast.config.pauseOnHover) {
      this.state.paused = true;
    }
  }

  /**
   * Trigger onHoverLeave lifecycle
   */
  onMouseLeave() {
    if (this.toast.config.pauseOnHover && this.toast.config.timeout) {
      this.state.paused = false;
      this.startTimeout(this.toast.config.timeout * this.state.progress);
    }
    this.toast.eventEmitter.next('mouseleave');
  }

  /**
   * Remove toast completely after animation
   */
  onExitTransitionEnd() {
    if (this.state.isDestroying) {
      return;
    }
    this.initToast();
    this.toast.eventEmitter.next('shown');
  }

  /*
   Common
   */

  /**
   * Initialize base toast config
   *
   */
  initToast(): void {
    if (this.toast.config.timeout > 0) {
      this.startTimeout(0);
    }
  }

  /**
   * Start progress bar
   * @param startTime {number}
   * @default 0
   */
  startTimeout(startTime: number = 0) {
    const start = performance.now();
    const calculate = () => {
      this.animationFrame = requestAnimationFrame((timestamp) => {
        const runtime = timestamp + startTime - start;
        const progress = Math.min(runtime / this.toast.config.timeout, 1);
        if (this.state.paused) {
          cancelAnimationFrame(this.animationFrame);
        } else if (runtime < this.toast.config.timeout) {
          this.state.progress = progress;
          calculate();
        } else {
          this.state.progress = 1;
          cancelAnimationFrame(this.animationFrame);
          this.service.remove(this.toast.id);
        }
      });
    };
    calculate();
  }
}
