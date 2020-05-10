import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/navegacao/footer/footer.component';
import { CadastrarComponent } from './componentes/clinica/cadastrar/cadastrar.component';
import { MenuComponent } from './componentes/navegacao/menu/menu.component';
import { EditarComponent } from './componentes/clinica/editar/editar.component';
import { ConsultarComponent } from './componentes/clinica/consultar/consultar.component';
import { HomeComponent } from './componentes/navegacao/home/home.component';
import {  HttpClientModule } from "@angular/common/http";
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatToolbarModule } from  '@angular/material/toolbar';
import {  MatIconModule, } from  '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './componentes/shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    CadastrarComponent,
    EditarComponent,
    ConsultarComponent,
    HomeComponent,
    DialogOverviewExampleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

