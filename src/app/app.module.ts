import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserModalComponent } from '@app/users/create-user-modal.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantModalComponent } from '@app/tenants/create-tenant-modal.component';
import { NewFormComponent } from '@app/book/new-form.component.ts';
import { BookServiceProxy} from '@shared/service-proxies/service-proxies';
import { ListComponent } from '@app/list/list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { EditBookModalComponent } from '@app/list/edit-book-modal.component';
import { MyBooksComponent } from './list/my-books.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        UsersComponent,
        CreateUserModalComponent,
        TenantsComponent,
        CreateTenantModalComponent,
        NewFormComponent,
        ListComponent,
        EditBookModalComponent,
        MyBooksComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        PaginationModule.forRoot()
        
    ],
    providers: [
        BookServiceProxy
   
    ]
})
export class AppModule { }