import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.scss']
})
export class MychartComponent implements OnInit {
 
  

  constructor(private olympicService: OlympicService) { }
   public olympics!: Olympic[];

  
   
   public chart: any;
   createChart(){
    
  
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart
     /*  this.olympics.flatMap(row => row.country ), */
      data: {// values on X-Axis
        labels: [this.olympics[0].country, this.olympics[1].country, this.olympics[2].country,this.olympics[3].country,
        this.olympics[4].country ], 
	       datasets: [
          {
            label: "medalCount",
            data: ['500','400', '200', '140', '130',
								 ],
            backgroundColor:  ['Green', 'Orange', 'Yellow', 'Red', 'Blue'],
          },
          
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


  ngOnInit(){
   

    this.olympicService.getOlympics().subscribe(response => {

      console.log(response)
      this.olympics = response;

      this.createChart();


    })
    /* this.olympicService.getOlympicByCountry("Tokyo").subscribe(response=> {
      console.log(response)
      
    }) */

  }

  

}
