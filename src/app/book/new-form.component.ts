import { Component, Injector, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Book } from './book';
import { BookServiceProxy, CreateBookInput, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from '@abp/session/abp-session.service';

//TODO: add localization and validation

@Component({
    selector: 'new-form',
    templateUrl: './new-form.component.html',
    animations: [appModuleAnimation()]
})
export class NewFormComponent extends AppComponentBase  {

    private _user: UserLoginInfoDto;
    nameInput: ElementRef;
 
    shownLoginName = this.appSession.getShownLoginName();

   
    book = new CreateBookInput({

        'authorName': this.shownLoginName
    });

   
    
   constructor(
        injector: Injector,
        private _bookService: BookServiceProxy,
        private _sessionService: AbpSessionService
       
    ) {
        super(injector);
    }



   saveBook(): void {

       this._bookService.createBook(this.book).subscribe(() => {
           this.notify.info(this.l('SavedSuccessfully'));
       });
       console.log('new-form service fired');

   }
    
   }


  
