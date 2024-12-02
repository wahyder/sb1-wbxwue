import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

interface TimeFormModel {
  time?: string;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        FormlyModule.forRoot({
          types: [
            { name: 'time-picker', component: TimePickerComponent },
          ],
        }),
        AppComponent,
        TimePickerComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form field configuration', () => {
    expect(component.fields.length).toBe(1);
    expect(component.fields[0].key).toBe('time');
    expect(component.fields[0].type).toBe('time-picker');
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(component.submittedValue).toBeNull();
  });

  it('should submit and update submittedValue if form is valid', () => {
    const testTime = '09:00:00';
    component.model = { time: testTime };
    component.form.patchValue({ time: testTime });
    component.form.markAsTouched();
    
    component.onSubmit();
    expect(component.submittedValue).toEqual({ time: testTime });
  });
});