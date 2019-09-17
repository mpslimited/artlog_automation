import {
    Component, OnInit, Input, OnDestroy, Output,
    EventEmitter, OnChanges, ChangeDetectorRef
} from '@angular/core';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
    selector: 'app-angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})

export class LoaderComponent implements OnInit, OnDestroy, OnChanges {


    @Input() name: string;
    @Input() group: string;
    @Input() loadingImage: string;
    @Input() loaderSize = '60px';

    private isShowing: boolean;

    @Input()
    get show(): boolean {
        return this.isShowing;
    }

    @Output() showChange = new EventEmitter();
    count = 0;
    constructor(
        private loaderService: LoaderService,
        private cdf: ChangeDetectorRef) {
        console.log('this.loaderSize', this.loaderSize);
    }

    set show(val: boolean) {
        this.isShowing = val;
        this.showChange.emit(this.isShowing);
    }

    get loaderStyle() {
        console.log('this.loaderSize', this.loaderSize);
        return 'font-size:' + this.loaderSize + 'px;';

    }

    ngOnChanges() {
        //   this.cdf.detectChanges();
    }

    ngOnInit(): void {
        if (!this.name) {
            console.warn('Loader must have a "name" attribute. In Think Project');
        }
        this.loaderService._register(this);
    }

    ngOnDestroy(): void {
        this.loaderService._unregister(this);
    }
}

