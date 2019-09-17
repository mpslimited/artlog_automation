import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderState } from './loader';
import { LoaderComponent } from './loader.component';
@Injectable()

export class LoaderService {

    private loaderCache = new Set<LoaderComponent>();
    private loaderSubject = new Subject<LoaderState>();

    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    _register(loader: LoaderComponent): void {
        this.loaderCache.add(loader);
    }

    _unregister(loaderToRemove: LoaderComponent): void {
        this.loaderCache.forEach(loader => {
            if (loader === loaderToRemove) {
                this.loaderCache.delete(loader);
            }
        });
    }

    show(loaderName: string) {
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                ++loader.count;
                loader.show = true;
            }
            // console.log('loaderCache at show', loader.name, 'loader.count', loader.count)
        });

    }

    hide(loaderName: string) {
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                --loader.count;
                if (loader.count < 1) {
                    loader.show = false;
                }
            }
            // console.log('loaderCache at Hide', loader.name, 'loader.count', loader.count)
        });
    }


    showNow(loaderName: string) {
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                loader.count = 1;
                loader.show = true;
            }
            // console.log('loader Cache at showNow', loader.name, 'loader.count', loader.count)
        });
    }

    hideNow(loaderName: string) {
        this.loaderCache.forEach(loader => {
            if (loader.name === loaderName) {
                loader.count = 0;
                loader.show = false;
            }
            // console.log('loader Cache at hideNow', loader.name, 'loader.count', loader.count)
        });
    }


}
