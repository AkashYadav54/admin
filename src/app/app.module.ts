import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { MainComponent } from './main/main.component';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UpdateEquipmentComponent } from './pages/update-equipment/update-equipment.component';
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    MainComponent,
    AddEquipmentComponent,
    EquipmentsComponent,
    LoginComponent,
    OrdersComponent,
    UpdateEquipmentComponent,
    UserComponent,
    CategoryComponent,
    AddCategoryComponent,
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
