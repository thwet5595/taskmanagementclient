import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {

    constructor(private _el: ElementRef) { }

    // @HostListener('input', ['$event']) onInputChange(event) {
    //     const initalValue = this._el.nativeElement.value;
    //     console.log(initalValue)
    //     this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    //     console.log(this._el.nativeElement.value)
    //     if (initalValue !== this._el.nativeElement.value) {
    //         event.stopPropagation();
    //     }
    // }

    // Allow decimal numbers and negative values
    private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', '-'];

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {

        // Allow Backspace, tab, end, and home keys, 'CTRL + C', 'CTRL +  V'
        if ((this.specialKeys.indexOf(event.key) !== -1) ||
            ((event.ctrlKey || event.metaKey) && event.keyCode === 67) ||
            ((event.ctrlKey || event.metaKey) && event.keyCode === 86)
        ) {
            return;
        }

        const current: string = this._el.nativeElement.value;
        const next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
