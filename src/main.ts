import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { provideNgxMask } from 'ngx-mask';
import { formlyConfig } from './app/formly/formly.config';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideNgxMask(),
    importProvidersFrom(
      FormlyModule.forRoot(formlyConfig)
    ),
  ],
});