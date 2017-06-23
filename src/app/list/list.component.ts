﻿import { Component, Injector, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BookServiceProxy, GetBooksOutput, BookDto } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from '@abp/session/abp-session.service';

//TODO: add localization and validation
//add setBusy()
@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    animations: [appModuleAnimation()]
})
export class ListComponent extends AppComponentBase {


    books: BookDto[] = [];
    filter: string = '';
    itemsPerPage: number = 4;
    skipCount: number = 0;

    public totalItems: number;
    public currentPage: number = 1;

    userId = this.appSession.userId;

    constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
        private _sessionService: AbpSessionService

    ) {
        super(injector);
    }

    ngOnInit(): void {
        console.log('ngOninit list.component');
        this.getBooks();
    }

    getBooks(): void {
         
        this._bookService.getBooks(this.itemsPerPage, this.skipCount,this.userId, this.filter).subscribe((result) => {
               abp.ui.setBusy();
             
            this.books = result.books;

            this.totalItems = result.totalCount
         abp.ui.clearBusy();
            console.log('totalItems: '+this.totalItems)
               
        });
    }

    delete(id: number): void {
     this.message.confirm(
        'Are you sure you want to delete this book',
        isConfirmed => {
            if (isConfirmed) {
                this._bookService.deleteBook(id).subscribe(() => {
                    this.notify.info(this.l('SuccessfullyDeleted'));
                       this.getBooks();
                });
            }
        }
    ) 

    }
    

    //paging
    public setPage(pageNo: number): void {
        console.log('setPage fired, currentPage: ' + this.currentPage)
        this.currentPage = pageNo;
    }

    public pageChanged(event: any): void {
        this.skipCount = ((event.page - 1) * this.itemsPerPage)
        this.getBooks();
    }


}
