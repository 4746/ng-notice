import {NoticeType} from '../types/notice.type';
import {INotice} from '../interfaces/notice.interface';

/**
 * Defines toast style depending on method name
 */
export function SetToastType (target: any, propertyKey: NoticeType, descriptor: PropertyDescriptor) {
  return {
    value: function (...args: any[]) {
      (args[0] as INotice).config = {
        ...(args[0] as INotice).config,
        type: propertyKey
      };
      return descriptor.value.apply(this, args);
    }
  };
}
