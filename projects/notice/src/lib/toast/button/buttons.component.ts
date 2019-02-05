import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

import {NoticeService} from '../../notice.service';
import {NoticeToast} from '../notice-toast.model';

/**
 * Buttons component
 */
@Component({
  selector: 'notice-button',
  templateUrl: './buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsComponent {
  /**
   * Get buttons Array
   */
  @Input() toast: NoticeToast;

  constructor(
    private service: NoticeService
  ) {}

  /**
   * remove toast
   */
  remove() {
    this.service.remove(this.toast.id);
  }
}
