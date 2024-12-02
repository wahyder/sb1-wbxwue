import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerComponent } from './time-picker.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        InputTextModule,
        DropdownModule,
        FormlyModule.forRoot(),
        NgxMaskDirective,
        NgxMaskPipe,
        TimePickerComponent
      ],
      providers: [
        provideNgxMask()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl('');
    component.field = {
      key: 'time',
      props: {
        label: 'Test Time',
        required: true
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with AM as default period', () => {
    expect(component.selectedAmPm).toBe('AM');
  });

  it('should show error message when required field is empty', () => {
    component.formControl.markAsTouched();
    fixture.detectChanges();
    
    expect(component.getErrorMessage()).toBe('This field is required');
  });

  it('should update time when AM/PM changes', () => {
    component.formControl.setValue('09:00:00');
    component.selectedAmPm = 'PM';
    component.onAmPmChange();
    
    expect(component.formControl.value).toBe('21:00:00');
  });

  it('should set PM when initializing with hours >= 12', () => {
    component.formControl.setValue('13:00:00');
    component.ngOnInit();
    
    expect(component.selectedAmPm).toBe('PM');
  });
});