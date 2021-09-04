import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Layout-App/header/header.component';
import { FooterComponent } from './Components/Layout-App/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './Components/pages/login/login.component';
import { RegisterComponent } from './Components/pages/register/register.component';
import { NotFoundComponent } from './Components/pages/not-found/not-found.component';
import { TodoListComponent } from './Components/Todo/todo-list/todo-list.component';
import { TodoItemComponent } from './Components/Todo/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/Layout-App/navbar/navbar.component';
import { TodoFormComponent } from './Components/Todo/todo-form/todo-form.component';
import { FontAwesomeComponent } from './fortAwesome/font-awesome/font-awesome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    TodoListComponent,
    TodoItemComponent,
    NavbarComponent,
    TodoFormComponent,
    FontAwesomeComponent,
    
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
     FormsModule,
      HttpClientModule,
      FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
