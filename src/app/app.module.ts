import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AbuComponent } from './abu/abu.component';
import { AddComponent } from './add/add.component';
import { ModifyComponent } from './modify/modify.component';
import { AddbComponent } from './addb/addb.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AbuComponent,
    AddComponent,
    ModifyComponent,
    AddbComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
     RouterModule.forRoot([
        {
        path: '',
        component: HomeComponent
        },
       {
        path: 'abu',
        component: AbuComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'addb',
        component: AddbComponent
      },
      {
        path: 'modify',
        component: ModifyComponent
      }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
