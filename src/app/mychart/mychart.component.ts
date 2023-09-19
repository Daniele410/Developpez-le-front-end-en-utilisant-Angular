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

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
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
    
  }

}
