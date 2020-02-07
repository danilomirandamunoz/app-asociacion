import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-site',
  templateUrl: './header-site.component.html',
  styleUrls: ['./header-site.component.scss'],
})
export class HeaderSiteComponent implements OnInit {

  @Input() load: boolean;
  @Input() texto: string;
  
  constructor() { }

  ngOnInit() {}

}
