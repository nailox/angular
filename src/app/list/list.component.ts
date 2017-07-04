import { Component, Injector, AfterViewInit, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BookServiceProxy, GetBooksOutput, BookDto, UpdateBookInput, UpdateRatingInput,UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { StarRatingComponent } from './rating.component';



//TODO: add localization and validation
//add setBusy()
//set rating per book. get rating from this.book.rating. add migration.
@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    encapsulation:ViewEncapsulation.None ,
    animations: [appModuleAnimation()]
})
export class ListComponent extends AppComponentBase {


    books: BookDto[] = [];
    bookUpdate: UpdateBookInput;
    filter: string = '';
    itemsPerPage: number = 4;
    skipCount: number = 0;
 //   updateRating: UpdateRatingInput;
   

    public totalItems: number;
    public currentPage: number = 1;

    userId = this.appSession.userId;

   rating = 0;
  
    constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
        private _userService: UserServiceProxy,
        private _sessionService: AbpSessionService

    ) {
        super(injector);
    }

    ngOnInit(): void {
        console.log('ngOninit list.component');
              
        this.getBooks();
        
    }

    getBooks(): void {
           abp.ui.setBusy();
        this._bookService.getBooks(this.itemsPerPage, this.skipCount,this.userId, this.filter).subscribe((result) => {
             
             
            this.books = result.books;

            this.totalItems = result.totalCount
         abp.ui.clearBusy();
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
                       this.getBooks();
                });
            }
        }
    ) 

}

    ratingChanged(book, value){

       let rate  = new UpdateRatingInput();
       rate.id = book.id;
       rate.newRating = value.ratingvalue;

      //  this.updateRating = book;
        
        this._bookService.updateRating(rate)
          .subscribe((data:boolean) => {
          if (data){
        this.notify.info(this.l('ThankYouForYourRating'));
        
     }
     else{
         this.notify.info(this.l('YouHaveAlreadyRatedForThisBook'));
     }
 });
//  this.bookUpdate = book;
//    this.bookUpdate.rating = value.ratingvalue;

//    console.log('updated rating' + this.bookUpdate.rating)
//           this._bookService.updateBook(this.bookUpdate)
//             .subscribe(() => {
//                this.notify.info(this.l('ThankYouForYourRating'));
             
//             });
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
