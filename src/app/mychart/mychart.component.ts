  import { Component, OnInit } from '@angular/core';
  import { OlympicService } from '../core/services/olympic.service';
  import { Olympic } from '../core/models/Olympic';
  import Chart, { ChartEvent } from 'chart.js/auto';
  import { Router } from '@angular/router';


  @Component({
    selector: 'app-mychart',
    templateUrl: './mychart.component.html',
    styleUrls: ['./mychart.component.scss']
  })
  export class MychartComponent implements OnInit {
    

    

    constructor(private olympicService: OlympicService, private router: Router ) { }
    public olympics: Olympic[]=[];
    public chart: any;
    
    
    
    
    createChart() {
      
      const labels = this.olympics.map(countryData => countryData.country);
      const data = this.olympics.map(countryData => {
        const totalMedals = countryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
        return totalMedals;
      });

      this.chart = new Chart("MyChart", {
        type: 'pie', //this denotes tha type of chart

        data: {
          labels ,
          datasets: [
            {
              label: "Medal Count",
              data,
              /* backgroundColor: ['Green', 'Red', 'Orange', 'Yellow', 'Blue'], */
            },

          ]
        },
        options: {
          
          responsive: true,
          maintainAspectRatio: false,

          onClick: (event: ChartEvent, elements: any[]) => {
            if (elements.length > 0) {
              const clickedElementIndex = elements[0].index;
              const clickedLabel = labels[clickedElementIndex];
              this.router.navigate(['mychartcountry', clickedLabel]);
            }
          }
        }
        
      });
    }


    ngOnInit() {


      this.olympicService.getOlympics().subscribe(response => {

        console.log(response)
        this.olympics = response;

        this.createChart();


      })


    }



  }
