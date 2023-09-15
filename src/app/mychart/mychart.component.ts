import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.scss']
})
export class MychartComponent implements OnInit {

  constructor(private olympicService: OlympicService) { }
   public olympics!: Olympic[];


  ngOnInit(): void {
   

    this.olympicService.getOlympics().subscribe(response => {

      console.log(response)
      this.olympics = response;
    })
    
  }

}
