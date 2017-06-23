import { Component, Injector, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BookServiceProxy, CreateBookInput, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from '@abp/session/abp-session.service';
import {NgForm} from '@angular/forms';

//TODO: add localization and validation

@Component({
    selector: 'new-form',
    templateUrl: './new-form.component.html',
    animations: [appModuleAnimation()]
})
export class NewFormComponent extends AppComponentBase  {


    nameInput: ElementRef;

    name = this.appSession.user.name;

    book = new CreateBookInput({

        'authorName': this.name
    });

   
    
   constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
        private _sessionService: AbpSessionService,
 
    ) {
        super(injector);
    }

   saveBook(bookForm:NgForm): void {

       console.log(this.book.imageLink)

       this._bookService.createBook(this.book).subscribe(() => {
           this.notify.info(this.l('SavedSuccessfully'));
            bookForm.resetForm();
       });
     

   }
    
   }


  
