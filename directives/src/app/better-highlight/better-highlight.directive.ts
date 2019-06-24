import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
	@Input() defaultColor: string = 'transparent';
	@Input() highlightColor: string = 'blue';

	// can pass a string defining to which property of a host we can bind
	@HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = this.defaultColor;
	}

	// listening to some events
	@HostListener('mouseenter') mouseover(eventData: Event) {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = this.highlightColor;	// simple than rendered
	}

	@HostListener('mouseleave') mouseleave(eventData: Event) {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
		this.backgroundColor = this.defaultColor;
	}
}
