import { Component,  enableProdMode} from '@angular/core';

 enableProdMode();
@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent {

}