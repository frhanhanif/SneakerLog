import { ApplicationConfig, provideZoneChangeDetection, isDevMode, forwardRef } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PriceFormatDirective } from './shared/price-format.directive';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceFormatDirective),
      multi: true,
    },
  ]
};
