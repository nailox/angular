import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { NewFormComponent } from './book/new-form.component';
import { ListComponent } from './list/list.component';
import { MyBooksComponent } from './list/my-books.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'new', component: NewFormComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'all', component: ListComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard]},
                    { path: 'mybooks', component: MyBooksComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] } 
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }