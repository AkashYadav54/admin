import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './pages/user/user.component';
import { authGuard } from './auth.guard';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { UpdateEquipmentComponent } from './pages/update-equipment/update-equipment.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { CouponCodeComponent } from './pages/coupon-code/coupon-code/coupon-code.component';
import { AddCouponComponent } from './pages/coupon-code/add-coupon/add-coupon.component';
import { UpdateCouponComponent } from './pages/coupon-code/update-coupon/update-coupon.component';
import { ExpiredCouponComponent } from './pages/coupon-code/expired-coupon/expired-coupon.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  {path:'category',component:CategoryComponent},
  {path:'add-category',component:AddCategoryComponent},
  {
    path: 'equipments',
    component: EquipmentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-equipment',
    component: AddEquipmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'update-equipment/:id',
    component: UpdateEquipmentComponent,
    canActivate: [authGuard],
  },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },

  { path: 'coupon', component: CouponCodeComponent, canActivate: [authGuard] },
  { path: 'add-coupon', component: AddCouponComponent },
  { path: 'expired-coupon', component: ExpiredCouponComponent },
  { path: 'update-coupon/:couponCode', component: UpdateCouponComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
