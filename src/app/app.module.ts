import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/loader/loader.component';
import { ChatsComponent } from './views/chats/chats.component';
import { DateFormatPipe } from './shared/date-format.pipe';
import { ChatComponent } from './views/chat/chat.component';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    LoaderComponent,
    ChatsComponent,
    HomeComponent,
    DateFormatPipe,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    GraphQLModule,
    HttpClientModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
