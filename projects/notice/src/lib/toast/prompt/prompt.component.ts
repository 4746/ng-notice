import {
  ChangeDetectionStrategy, Component, Input,
  ViewEncapsulation
} from '@angular/core';
import {NoticeToast} from '../notice-toast.model';

/**
 * Prompt component. Part of PROMPT type
 */
@Component({
  selector: 'notice-prompt',
  templateUrl: './prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PromptComponent {
  /**
   * Get PROMPT placeholder
   */
  @Input() toast: NoticeToast;
  /**
   * Is PROMPT focused
   * @type {boolean}
   */
  isPromptFocused = false;
}
