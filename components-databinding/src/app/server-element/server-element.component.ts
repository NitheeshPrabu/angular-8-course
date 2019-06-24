import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, 
	DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, 
	OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
	selector: 'app-server-element',
	templateUrl: './server-element.component.html',
	styleUrls: ['./server-element.component.css'],
	encapsulation: ViewEncapsulation.None	// to disable view encapsulation (shadow DOM emulation)
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
	AfterViewChecked, AfterViewInit, OnDestroy {
	// now any parent component can bind to this element and send data into this component
	@Input('srvElement') element: { type: string, name: string, content: string };
	@Input() name: string;
	@ViewChild('heading', { static: true }) header: ElementRef;

	// to get access to content stored in another component, but projected via ng-content
	@ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

	/*
	 * LIFECYCLE HOOKS
	 * 
	 * ngOnChanges - Called after a bound input property changes
	 * ngOnInit - Called once the component is initialised
	 * ngDoCheck - Called during every change detection run
	 * ngAfterContentInit - Called after content (ng-content) has been projected into view
	 * ngAfterContentChecked - Called every time the projected content has been checked
	 * ngAfterViewInit - Called after the component's view (and child views) has been initialised
	 * ngAfterViewChecked - Called every time the view (and child views) have been checked
	 * ngOnDestroy - Called once the component is about to be destroyed 
	 * 
	 */

	constructor() {
		console.log('constructor called');
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log('ngOnChanges called');
		console.log(changes);
	}

	ngOnInit() {
		console.log('ngOnInit called');
		console.log('Text Content: ' + this.header.nativeElement.textContent);
		console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
	}

	ngDoCheck() {
		console.log('ngDoCheck called');
	}

	ngAfterContentInit() {
		console.log('ngAfterContentInit called');
		console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
	}

	ngAfterContentChecked() {
		console.log('ngAfterContentChecked called');
	}

	ngAfterViewInit() {
		console.log('ngAfterViewInit called');
		console.log('Text Content: ' + this.header.nativeElement.textContent);
	}

	ngAfterViewChecked() {
		console.log('ngAfterViewChecked called');
	}

	ngOnDestroy() {
		console.log('ngOnDestroy called');
	}
}