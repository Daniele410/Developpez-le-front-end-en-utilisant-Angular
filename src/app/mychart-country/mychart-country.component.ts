import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Olympic } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-mychart-country',
  templateUrl: './mychart-country.component.html',
  styleUrls: ['./mychart-country.component.scss']
})
export class MychartCountryComponent implements OnInit {
  countryName!: string;
  public olympics!: Olympic[];
  public chart: any;

  numberOfEntries: number = 0;
  totalMedals: number = 0;
  totalAthletes: number = 0;




  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.countryName = params['country'];
  });
  }


  generateCountryChart() {
    // Extraire les années de participation pour le pays.
    const labels = this.olympics[0].participations.map(participation => `${participation.city} ${participation.year}`);

    // Extraire le total des médailles pour chaque année de participation.
    const data = this.olympics[0].participations.map(participation => participation.medalsCount);

    this.chart = new Chart("MyChart", {
        type: 'line', // Vous pouvez également choisir 'bar' si vous le préférez.
        data: {
            labels,
            datasets: [{
                label: "Nombre de médailles",
                data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




  ngOnInit(): void {


    this.olympicService.getDataForCountry(this.countryName).subscribe(data => {
      if (data) {
          this.olympics = [data];
  
          if (this.olympics && this.olympics.length) {
              const countryData = this.olympics[0];
              this.numberOfEntries = countryData.participations.length;
              this.totalMedals = countryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
              this.totalAthletes = countryData.participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
          }
  
          this.generateCountryChart();
      }
  });
  }
}



