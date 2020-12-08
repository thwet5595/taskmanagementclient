
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
    <button mat-icon-button>
        <mat-icon (click)="onClick($event)">{{icon}}</mat-icon>
    </button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

    params;
    icon: string;

    agInit(params): void {
        this.params = params;
        this.icon = this.params.icon || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {

        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data,
                rowIndex: this.params.node.id
            }
            
            this.params.onClick(params);

        }
    }
}