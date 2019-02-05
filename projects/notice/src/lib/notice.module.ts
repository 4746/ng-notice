import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoticeComponent} from './notice.component';
import {ToastComponent} from './toast/toast.component';
import {ButtonsComponent} from './toast/button/buttons.component';
import {PromptComponent} from './toast/prompt/prompt.component';
import {KeysPipe} from './pipes/keys.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';
import {INoticeDefaults} from './interfaces/notice-defaults.interface';
import {ToastDefaults} from './toast-defaults';
import {mergeDeep} from './utils';

@NgModule({
  declarations: [
    NoticeComponent,
    ToastComponent,
    ButtonsComponent,
    PromptComponent,
    KeysPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoticeComponent,
    KeysPipe,
    TruncatePipe
  ]
})
export class NoticeModule {
  static withConfig(userConfig: INoticeDefaults = {}): ModuleWithProviders {
    return {
      ngModule: NoticeModule,
      providers: [
        {provide: 'NoticeToastConfig', useValue: mergeDeep(ToastDefaults, userConfig)}
      ]
    };
  }
}
