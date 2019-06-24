import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// structural directive
@Directive({
	selector: '[appUnless]'
})
export class UnlessDirective {
	// setter method
	@Input() set appUnless(condition: boolean) {
		if (!condition) {
			this.vcRef.createEmbeddedView(this.templateRef);
		} else {
			this.vcRef.clear();
		}
	}

	constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
