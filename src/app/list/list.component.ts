import { Component, Injector, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BookServiceProxy, CreateBookInput, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from '@abp/session/abp-session.service';

//TODO: add localization and validation

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    animations: [appModuleAnimation()]
})
export class ListComponent extends AppComponentBase {





    constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
        private _sessionService: AbpSessionService

    ) {
        super(injector);
    }



}



