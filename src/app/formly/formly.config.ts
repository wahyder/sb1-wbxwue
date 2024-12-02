import { ConfigOption } from '@ngx-formly/core';
import { TimePickerComponent } from '../components/time-picker/time-picker.component';

export const formlyConfig: ConfigOption = {
  types: [
    {
      name: 'time-picker',
      component: TimePickerComponent,
      wrappers: ['form-field'],
    },
  ],
  validationMessages: [
    { name: 'required', message: 'This field is required' },
  ],
};