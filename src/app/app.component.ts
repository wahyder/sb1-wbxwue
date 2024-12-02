import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

interface TimeFormModel {
  time?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyPrimeNGModule,
    TimePickerComponent,
    ButtonModule,
    CardModule,
  ],
  template: `
    <div class="m-4">
      <p-card>
        <h1 class="text-3xl font-bold mb-4">Time Picker Form Demo</h1>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <formly-form
            [form]="form"
            [fields]="fields"
            [model]="model">
          </formly-form>
          <button 
            pButton 
            type="submit" 
            label="Submit" 
            class="mt-3"
            [disabled]="!form.valid">
          </button>
        </form>
        
        <div class="mt-4" *ngIf="submittedValue">
          <h3 class="text-xl font-semibold mb-2">Submitted Value:</h3>
          <pre class="p-3 bg-gray-100 rounded">{{ submittedValue | json }}</pre>
        </div>
      </p-card>
    </div>
  `,
})
export class AppComponent {
  form = new FormGroup({});
  model: TimeFormModel = {};
  submittedValue: TimeFormModel | null = null;

  fields: FormlyFieldConfig[] = [
    {
      key: 'time',
      type: 'time-picker',
      props: {
        label: 'Select Time',
        required: true,
        description: 'Please enter time in HH:MM:SS format',
      },
    },
  ];

  onSubmit() {
    if (this.form.valid) {
      this.submittedValue = this.model;
      console.log(this.model);
    }
  }
}