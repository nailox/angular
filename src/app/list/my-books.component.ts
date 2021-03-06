import { Component, Injector, AfterViewInit, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BookServiceProxy, GetBooksOutput, BookDto, UpdateRatingInput,UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { StarRatingComponent } from './rating.component';

//TODO: add localization and validation
//add setBusy()
@Component({
    selector: 'my-books',
    templateUrl: './my-books.component.html',
        encapsulation:ViewEncapsulation.None ,
    animations: [appModuleAnimation()]
})
export class MyBooksComponent extends AppComponentBase {


    books: BookDto[] = [];
    filter: string = '';
    itemsPerPage: number = 4;
    skipCount: number = 0;
    updateRating: UpdateRatingInput;
    rating = 0;
    
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
        this.getMyBooks();
    }

      getMyBooks(): void {
        this._bookService.getMyBooks(this.itemsPerPage, this.skipCount,this.userId,this.filter).subscribe((result) => {
            this.books = result.books;

            this.totalItems = result.totalCount

            console.log('totalItems: '+this.totalItems)

        });
    }

    delete(id: number): void {
     this.message.confirm(
      this.l('SureDelete'),
        isConfirmed => {
            if (isConfirmed) {
                this._bookService.deleteBook(id).subscribe(() => {
                    this.notify.info(this.l('DeletedSuccessfully'));
                       this.getMyBooks();
                });
            }
        }
    ) 

}

    ratingChanged(book, value){

       let rate  = new UpdateRatingInput();
       rate.id = book.id;
       rate.newRating = value.ratingvalue;

        this._bookService.updateRating(rate)
          .subscribe((data:boolean) => {
          if (data){
        this.notify.info(this.l('ThankYouForYourRating'));
     }
     else{
         this.notify.info(this.l('YouHaveAlreadyRatedForThisBook'));
     }
    
 });
   
 }

  //paging
    public setPage(pageNo: number): void {
        console.log('setPage fired, currentPage: ' + this.currentPage)
        this.currentPage = pageNo;
    }

    public pageChanged(event: any): void {
        this.skipCount = ((event.page - 1) * this.itemsPerPage)
        this.getMyBooks();
    }




}