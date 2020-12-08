
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
    <span><button style="height: 20px" (click)="onClick($event)" class="btn btn-danger">Close</button></span>
    `,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})

export class CloseRenderComponent implements ICellRendererAngularComp {

    params;
    //icon: string;

    agInit(params): void {
        this.params = params;
        //this.icon = this.params.icon || null;
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