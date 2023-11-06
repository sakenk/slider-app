import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-unsub',
    template: ''
})
export abstract class Unsub implements OnDestroy {
    unsubscribe$ = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}