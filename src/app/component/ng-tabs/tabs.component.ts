/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
    Component, ContentChildren, QueryList,
    AfterContentInit, ViewChild, ComponentFactoryResolver,
    ViewContainerRef, Output, EventEmitter, Input
} from '@angular/core';

import { TabComponent } from './tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
    selector: 'my-tabs',
    templateUrl: `./tabs.html`,
    styleUrls: ['./tabs.css']
})
export class TabsComponent implements AfterContentInit {
    dynamicTabs: TabComponent[] = [];
    @ContentChildren(TabComponent)
    tabs: QueryList<TabComponent>;
    @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;
    @Input() selectTabName = null;
    @Output() onTabChange = new EventEmitter<any>();

    /*
      Alternative approach of using an anchor directive
      would be to simply get hold of a template variable
      as follows
    */
    // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPleholder;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        const activeTabs = this.tabs.filter((tab) => tab.active);
        console.log('tabs LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            console.log(this.tabs);
            let selectTabID = null;

            if (this.selectTabName) {
                this.tabs.toArray()
                    .forEach(tab => {
                        if (tab.tabId === this.selectTabName) {
                            selectTabID = tab;
                        }
                        console.log(tab);
                    });
            }
            console.log(selectTabID);

            if (selectTabID) {
                this.selectTab(selectTabID);
            } else if (!this.tabs.first.disabled) {
                this.selectTab(this.tabs.first);
            } else {
                this.selectTab(this.tabs.last);
            }
        }
    }


    selectTabWithID(newSelectTabId: string) {
        console.log(this.tabs);
        let selectTabID = null;
        if (newSelectTabId) {
            this.tabs.toArray().forEach(tab => {
                if (tab.tabId === newSelectTabId) {
                    selectTabID = tab;
                }
                console.log(tab);
            });
        }
        console.log(selectTabID);
        if (selectTabID) {
            this.selectTab(selectTabID);
        }
    }


    isTabCreated(tabId: string): number {
        let retVal = -1;
        let tabIndex = 0;
        for (const item of this.dynamicTabs) {
            if (item.tabId === tabId) {
                retVal = tabIndex;
                break;
            }
            tabIndex++;
        }
        return retVal;
    }

    openTab(title: string, template, data, isCloseable = false, tabId: string) {
        const existTab = this.isTabCreated(tabId);
        if (existTab > -1) {
            // set it active
            this.selectTab(this.dynamicTabs[existTab]);
        } else {
            // get a component factory for our TabComponent
            const componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

            // fetch the view container reference from our anchor directive
            const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

            // alternatively...
            // let viewContainerRef = this.dynamicTabPlder;

            // create a component instance
            const componentRef = viewContainerRef.createComponent(componentFactory);

            // set the according properties on our component instance
            const instance: TabComponent = componentRef.instance as TabComponent;
            instance.title = title;
            instance.template = template;
            instance.dataContext = data;
            instance.isCloseable = isCloseable;
            instance.tabId = tabId;


            // remember the dynamic component for rendering the
            // tab navigation headers
            this.dynamicTabs.push(componentRef.instance as TabComponent);

            // set it active
            this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
        }
    }

    selectTab(pTab: TabComponent) {

        console.log(pTab);
        if (pTab) {
            // if (!pTab || pTab.tabId === 'INSIGHTTAB') {
            //     //return;
            // }
            // deactivate all tabs
            this.tabs.toArray().forEach(tab => tab.active = false);
            this.dynamicTabs.forEach(tab => tab.active = false);

            // activate the tab the user has clicked on.
            pTab.active = true;
            console.log('tag getting change here....................');
            setTimeout(() => {
                this.onTabChange.emit(pTab.tabId);
            }, 100);
        }
    }

    selectLastTab() {
        if (this.tabs) {
            this.selectTab(this.tabs.last);
        }
    }

    closeTab(tab: TabComponent) {
        for (let i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                // remove the tab from our array
                this.dynamicTabs.splice(i, 1);

                // destroy our dynamically created component again
                const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
                // let viewContainerRef = this.dynamicTabPlaceholder;
                viewContainerRef.remove(i);

                // set tab index to 1st one
                if (this.dynamicTabs.length < 1) {
                    this.selectTab(this.tabs.first);
                } else {
                    this.selectTab(this.dynamicTabs[0]);
                }
                break;
            }
        }
    }

    closeActiveTab() {
        const activeTabs = this.dynamicTabs.filter((tab) => tab.active);
        if (activeTabs.length > 0) {
            // close the 1st active tab (should only be one at a time)
            this.closeTab(activeTabs[0]);
        }
    }

    closeTab2(tabId) {
        for (let i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i].tabId === tabId) {
                // remove the tab from our array
                this.dynamicTabs.splice(i, 1);

                const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
                // let viewContainerRef = this.dynamicTabPlaceholder;
                viewContainerRef.remove(i);
            }
        }
    }

}
