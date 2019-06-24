import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
	selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
	// Angular automatically injects the element in which
	// the directive sits (here, as attribute),
	// into this class

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
		this.elementRef.nativeElement.style.backgroundColor = 'green';
	}
}
