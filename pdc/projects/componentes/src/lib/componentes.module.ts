import { NgModule } from '@angular/core';
import { ComponentesComponent } from './componentes.component';
import { FrameComponent } from './frame/frame.component';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ComponentesService } from './componentes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ComponentesComponent,
    FrameComponent,
    LoginComponent,


  ],
  imports: [
    MaterialModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ComponentesComponent,
    FrameComponent,
    LoginComponent
  ],
  providers: [
    ComponentesService,

  ]
})
export class ComponentesModule { }
