import { Component, OnInit } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  config: any = [];
  currentSecondaryRoute: any = "";


  constructor(private navService: NavigatorService) {
    this.init();
   }

  ngOnInit(): void {
    
    this.config = this.navService.getRoutes();
    
  }

  init() {
    this.navService.modeChange.subscribe((value) => {
      this.config = this.navService.getRoutes();
    });
  }

  ngOnChanges(): void {
    console.log("SidebarComponent ngOnChanges");
  }

  primaryRouteClicked(primaryRoute: any) {
    this.config = this.navService.primaryClicked(primaryRoute);
  }

  secondaryRouteClicked(secondaryRoute: string, primaryRoute:string)  {
    this.config = this.navService.secondaryClicked(secondaryRoute, primaryRoute);
    
  }

  tertiaryRouteClicked(event:any, tertiaryRoute: string, secondaryRoute: string) {
    event.stopPropagation();
    this.config = this.navService.tertiaryClicked(tertiaryRoute, secondaryRoute);
  }

  




}
