import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  @Input() defaultColor: string = 'transparent';
  @Input( ) highlightColor: string = 'blue';

 // @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventDate: Event) {
   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    //this.backgroundColor = 'blue';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventDate: Event) {
  //  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    //this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }

}
