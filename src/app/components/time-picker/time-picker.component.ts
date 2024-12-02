import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TimeOption } from './time-picker.types';
import { convertTo24Hour, formatTimeValue } from './time-picker.utils';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    InputTextModule,
    DropdownModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
  template: `
    <div class="field">
      <label *ngIf="props.label" [for]="id" class="block mb-2">
        {{ props.label }}
        <span *ngIf="props.required" class="text-red-500">*</span>
      </label>
      <div class="flex gap-2 align-items-center">
        <input
          [id]="id"
          pInputText
          [formControl]="$any(formControl)"
          [formlyAttributes]="field"
          [mask]="'00:00:00'"
          placeholder="HH:MM:SS"
          class="w-8rem"
        />
        <p-dropdown
          [options]="amPmOptions"
          [(ngModel)]="selectedAmPm"
          (onChange)="onAmPmChange()"
          [style]="{ width: '5rem' }"
        ></p-dropdown>
      </div>
      <small class="p-error" *ngIf="showError">
        {{ getErrorMessage() }}
      </small>
    </div>
  `,
})
export class TimePickerComponent extends FieldType<FieldTypeConfig> implements OnInit {
  amPmOptions: TimeOption[] = [
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];
  selectedAmPm: 'AM' | 'PM' = 'AM';

  ngOnInit() {
    if (this.formControl.value) {
      const hours = parseInt(this.formControl.value.split(':')[0]);
      this.selectedAmPm = hours >= 12 ? 'PM' : 'AM';
    }
  }

  onAmPmChange() {
    if (!this.formControl.value) return;

    const [hours, minutes, seconds] = this.formControl.value.split(':');
    const hoursNum = parseInt(hours);
    const newHours = convertTo24Hour(hoursNum, this.selectedAmPm);
    
    this.formControl.setValue(formatTimeValue(newHours, minutes, seconds));
  }

  getErrorMessage(): string {
    if (this.props.required && !this.formControl.value) {
      return 'This field is required';
    }
    return '';
  }
}