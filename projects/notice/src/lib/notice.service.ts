import {Inject, Injectable} from '@angular/core';
import {Observable, Subject, Subscription, from} from 'rxjs';
import {SafeHtml} from '@angular/platform-browser';

import {NoticeToast} from './toast/notice-toast.model';
import {INoticeToastConfig} from './interfaces/notice-toast-config.interface';
import {INotice} from './interfaces/notice.interface';
import {NoticeStyle} from './enums/notice-style.enum';
import {NoticeType} from './types/notice.type';
import {TransformArgument} from './decorators/transform-argument.decorator';
import {mergeDeep, uuid} from './utils';
import {SetToastType} from './decorators/set-toast-type.decorator';
import {INoticeDefaults} from './interfaces/notice-defaults.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  readonly emitter = new Subject<NoticeToast[]>();
  readonly toastChanged = new Subject<NoticeToast>();
  readonly toastDeleted = new Subject<number>();
  private notifications: NoticeToast[] = [];

  constructor(
    @Inject('NoticeToastConfig') public config: INoticeDefaults
  ) {
  }

  /**
   * emit changes in notifications array
   */
  private emit(): void {
    this.emitter.next(this.notifications.slice());
  }

  /**
   * returns SnotifyToast object
   * @param id {Number}
   * @return {SnotifyToast|undefined}
   */
  get(id: number): NoticeToast {
    return this.notifications.find(toast => toast.id === id);
  }

  /**
   * add SnotifyToast to notifications array
   * @param toast {SnotifyToast}
   */
  private add(toast: NoticeToast): void {
    if (this.config.global.filterDuplicates && this.containsToast(toast)) {
      return;
    }
    if (this.config.global.newOnTop) {
      this.notifications.unshift(toast);
    } else {
      this.notifications.push(toast);
    }
    this.emit();
  }

  /**
   * checks if the toast is in the collection.
   * @param {SnotifyToast} inToast
   * @returns {boolean}
   */
  private containsToast(inToast: NoticeToast): boolean {
    return this.notifications.some(toast => toast.equals(inToast));
  }

  /**
   * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
   * @param id {number}
   * @param remove {boolean}
   */
  remove(id?: number, remove?: boolean): void {
    if (!id) {
      return this.clear();
    } else if (remove) {
      this.notifications = this.notifications.filter(toast => toast.id !== id);
      return this.emit();
    }
    this.toastDeleted.next(id);
  }

  /**
   * Clear notifications array
   */
  clear(): void {
    this.notifications = [];
    this.emit();
  }

  /**
   * Creates toast and add it to array, returns toast id
   * @param snotify {INotice}
   * @return {number}
   */
  create(snotify: INotice): NoticeToast {
    const config =
      mergeDeep(this.config.toast, this.config.type[snotify.config.type], snotify.config);
    const toast = new NoticeToast(
      uuid(),
      snotify.title,
      snotify.body,
      config
    );
    this.add(toast);
    return toast;
  }

  setDefaults(defaults: INoticeDefaults): INoticeDefaults {
    return this.config = mergeDeep(this.config, defaults) as INoticeDefaults;
  }

  /**
   * Create toast with simple style returns toast id;
   * @param body {String}
   * @returns {number}
   */
  simple(body: string): NoticeToast
  /**
   * Create toast with simple style returns toast id;
   */
  simple(body: string, title: string): NoticeToast;
  /**
   * Create toast with simple style returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  simple(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with simple style  returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  simple(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  simple(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Create toast with success style returns toast id;
   * @param body {String}
   * @returns {number}
   */
  success(body: string): NoticeToast;
  /**
   * Create toast with success style returns toast id;
   * @param body {String}
   * @param title {String}
   * @returns {number}
   */
  success(body: string, title: string): NoticeToast;
  /**
   * Create toast with success style returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  success(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with success style  returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  success(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  success(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Create toast with error style returns toast id;
   * @param body {String}
   * @returns {number}
   */
  error(body: string): NoticeToast;
  /**
   * Create toast with error style returns toast id;
   * @param body {String}
   * @param title {String}
   * @returns {number}
   */
  error(body: string, title: string): NoticeToast;
  /**
   * Create toast with error style returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  error(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with error style  returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  error(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  error(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Create toast with info style returns toast id;
   * @param body {String}
   * @returns {number}
   */
  info(body: string): NoticeToast;
  /**
   * Create toast with info style returns toast id;
   * @param body {String}
   * @param title {String}
   * @returns {number}
   */
  info(body: string, title: string): NoticeToast;
  /**
   * Create toast with info style returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  info(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with info style  returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  info(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  info(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Create toast with warning style returns toast id;
   * @param body {String}
   * @returns {number}
   */
  warning(body: string): NoticeToast;
  /**
   * Create toast with warning style returns toast id;
   * @param body {String}
   * @param title {String}
   * @returns {number}
   */
  warning(body: string, title: string): NoticeToast;
  /**
   * Create toast with warning style returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  warning(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with warning style  returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  warning(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  warning(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Create toast with confirm style returns toast id;
   * @param body {String}
   * @returns {number}
   */
  confirm(body: string): NoticeToast;
  /**
   * Create toast with confirm style returns toast id;
   * @param body {String}
   * @param title {String}
   * @returns {number}
   */
  confirm(body: string, title: string): NoticeToast;
  /**
   * Create toast with confirm style returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  confirm(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with confirm style  returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  confirm(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  confirm(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Create toast with Prompt style {with two buttons}, returns toast id;
   * @param body {String}
   * @returns {number}
   */
  prompt(body: string): NoticeToast;
  /**
   * Create toast with Prompt style {with two buttons}, returns toast id;
   * @param body {String}
   * @param title {String}
   * @returns {number}
   */
  prompt(body: string, title: string): NoticeToast;
  /**
   * Create toast with Prompt style {with two buttons}, returns toast id;
   * @param body {String}
   * @param config {INoticeToastConfig}
   * @returns {number}
   */
  prompt(body: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Create toast with Prompt style {with two buttons}, returns toast id;
   * @param [body] {String}
   * @param [title] {String}
   * @param [config] {INoticeToastConfig}
   * @returns {number}
   */
  prompt(body: string, title: string, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  prompt(args: any): NoticeToast {
    return this.create(args);
  }

  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   */
  async(body: string, action: Promise<INotice> | Observable<INotice>): NoticeToast;
  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   */
  async(body: string, title: string, action: Promise<INotice> | Observable<INotice>): NoticeToast;
  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   */
  async(body: string, action: Promise<INotice> | Observable<INotice>, config: INoticeToastConfig): NoticeToast;
  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   */
  async(body: string, title: string, action: Promise<INotice> | Observable<INotice>, config: INoticeToastConfig): NoticeToast;
  /**
   * Transform toast arguments into {INotice} object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  async(args: any): NoticeToast {
    let async: Observable<any>;
    if (args.action instanceof Promise) {
      async = from(args.action);
    } else {
      async = args.action;
    }

    const toast = this.create(args);

    toast.on('mounted',
      () => {
        const subscription: Subscription = async.subscribe(
          (next?: INotice) => {
            this.mergeToast(toast, next);
          },
          (error?: INotice) => {
            this.mergeToast(toast, error, NoticeStyle.error);
            subscription.unsubscribe();
          },
          () => {
            this.mergeToast(toast, {}, NoticeStyle.success);
            subscription.unsubscribe();
          }
        );
      }
    );

    return toast;
  }

  private mergeToast(toast, next, type?: NoticeType) {
    if (next.body) {
      toast.body = next.body;
    }
    if (next.title) {
      toast.title = next.title;
    }
    if (type) {
      toast.config = mergeDeep(toast.config, this.config.global, this.config.toast[type], {type}, next.config);
    } else {
      toast.config = mergeDeep(toast.config, next.config);
    }
    if (next.html) {
      toast.config.html = next.html;
    }
    this.emit();
    this.toastChanged.next(toast);
  }

  /**
   * Creates empty toast with html string inside
   * @param {string | SafeHtml} html
   * @param {INoticeToastConfig} config
   * @returns {number}
   */
  html(html: string | SafeHtml, config?: INoticeToastConfig): NoticeToast {
    return this.create({
      title: null,
      body: null,
      config: {
        ...config,
        ...{html}
      }
    });
  }
}
