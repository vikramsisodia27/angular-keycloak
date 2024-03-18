		import { APP_INITIALIZER, NgModule } from '@angular/core';
		import { BrowserModule } from '@angular/platform-browser';
		import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
		import { AppRoutingModule } from './app-routing.module';
		import { AppComponent } from './app.component';

		function initializeKeycloak(keycloak: KeycloakService) {
		  return () =>
		    keycloak.init({
		      config: {
		        url: 'http://localhost:8080',
		        realm: 'java-bug',
		        clientId: 'angular-client'
		      },
		      initOptions: {
		        onLoad: 'check-sso',
		        silentCheckSsoRedirectUri: window.location.origin + '/assets/verificar-sso.html',
				pkceMethod: 'S256',
				checkLoginIframe: true
		      }
		    });
		}

		@NgModule({
		  declarations: [AppComponent],
		  imports: [AppRoutingModule, BrowserModule, KeycloakAngularModule],
		  providers: [
		    {
		      provide: APP_INITIALIZER,
		      useFactory: initializeKeycloak,
		      multi: true,
		      deps: [KeycloakService]
		    }
		  ],
		  bootstrap: [AppComponent]
		})
		export class AppModule {}
