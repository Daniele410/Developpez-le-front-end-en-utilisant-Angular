import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';
import { Partecipation } from '../core/models/Partecipation';
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
  createChart() {
    this.olympics.map(row => row.country);

    const labels = this.olympics.map(countryData => countryData.country);
    const data = this.olympics.map(countryData => {
      const totalMedals = countryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
      return totalMedals;
    });

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart
      /*  this.olympics.flatMap(row => row.country ), */
      data: {// values on X-Axis
        labels: labels/* [this.olympics[0].country, this.olympics[1].country, this.olympics[2].country,this.olympics[3].country,
        this.olympics[4].country ] */,
        datasets: [
          {
            label: "Medal Count",
            data: data,
            backgroundColor: ['Green', 'Red', 'Orange', 'Yellow', 'Blue'],
          },

        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
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
