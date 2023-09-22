import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';

@Component({
  selector: 'app-mychart-country',
  templateUrl: './mychart-country.component.html',
  styleUrls: ['./mychart-country.component.scss']
})
export class MychartCountryComponent implements OnInit {

  countryName!: string ;
  public olympics!: Olympic[];
  

  constructor(private olympicService: OlympicService,private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.countryName = params['country']; // Assegna il nome del paese alla variabile di istanza
    });
  }
  

  public chart: any;
  
  generateCountryChart() {

    const labels = this.olympics.map(countryData => countryData.country);
    const data = this.olympics.map(countryData => {
      const totalMedals = countryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
      return totalMedals;
    });

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {
        labels /* [this.olympics[0].country, this.olympics[1].country, this.olympics[2].country,this.olympics[3].country,
        this.olympics[4].country ] */,
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

        
      }
      
    });
  }

  
  ngOnInit(): void {
    if (this.countryName) {
      this.olympicService.getDataForCountry(this.countryName).subscribe(data => {
        
        this.generateCountryChart(); // Chiama la funzione per generare il grafico
      });
    }
  }
}
   
