import { Component, ViewChild, Injector, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BookServiceProxy, UpdateBookInput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'editBookModal',
    templateUrl: './edit-book-modal.component.html'
})
export class EditBookModalComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  
    @ViewChild('modal') modal: ModalDirective;
    @ViewChild('nameInput') nameInput: ElementRef;

    bookUpdate: UpdateBookInput;
   

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _bookService: BookServiceProxy
    ) {
        super(injector);
    }

    show(book): void {
        console.log('show(book)')
        this.active = true;
         this.bookUpdate = book;
        
        this.modal.show();

        console.log('selected book id: '+ this.bookUpdate.id);
    }

    onShown(): void {
        $(this.nameInput.nativeElement).focus();
    }

    save(): void {
        this.saving = true;
        console.log('bookId in save(): '+ this.bookUpdate.id);
        this._bookService.updateBook(this.bookUpdate)
            .subscribe(() => {
               this.notify.info(this.l('UpdatedSuccessfully'));
               this.close();
               this.modalSave.emit(this.bookUpdate);
            });

    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }
}