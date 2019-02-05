import {INotice} from '../interfaces/notice.interface';
import {NoticeStyle} from '../enums/notice-style.enum';
import {NoticeType} from '../types/notice.type';

/**
 * Transform arguments to Snotify object
 */
export function TransformArgument(target: any, propertyKey: NoticeType, descriptor: PropertyDescriptor) {
  if (propertyKey === NoticeStyle.async) {
    return {
      value: function (...args: any[]) {
        let result;
        if (args.length === 2) {
          result = {
            title: null,
            body: args[0],
            config: null,
            action: args[1]
          };
        } else if (args.length === 3) {
          if (typeof args[1] === 'string') {
            result = {
              title: args[1],
              body: args[0],
              config: null,
              action: args[2]
            };
          } else {
            result = {
              title: null,
              body: args[0],
              config: args[2],
              action: args[1]
            };
          }
        } else {
          result = {
            title: args[1],
            body: args[0],
            config: args[3],
            action: args[2]
          };
        }
        return descriptor.value.apply(this, [result as INotice]);
      }
    };
  } else {
    return {
      value: function (...args: any[]) {
        let result;
        if (args.length === 1) {
          result = {
            title: null,
            body: args[0],
            config: null
          };
        } else if (args.length === 3) {
          result = {
            title: args[1],
            body: args[0],
            config: args[2]
          };
        } else {
          result = {
            title: null,
            config: null,
            body: args[0],
            [typeof args[1] === 'string' ? 'title' : 'config']: args[1]
          };
        }
        return descriptor.value.apply(this, [result as INotice]);
      }
    };
  }
}
