import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';
import { Participation } from '../core/models/Participation';
import Chart, { ChartEvent } from 'chart.js/auto';


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

    const labels = this.olympics.map(countryData => countryData.country);
    const data = this.olympics.map(countryData => {
      const totalMedals = countryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
      return totalMedals;
    });

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

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
        /* aspectRatio: 2.5, */
        responsive: true,
        maintainAspectRatio: false,

        onClick: (event: ChartEvent, elements: any[]) => {
          const nativeEvent = event.native as MouseEvent;
          if (elements.length > 0) {
            const clickedElementIndex = elements[0].index;
            /*  const clickedLabel = labeldata[clickedElementIndex];
             const clickedMedal = this.medaldata[clickedElementIndex];
             const clickedValue = realdata[clickedElementIndex]; */

            console.log(elements[0])
            console.log(labels[elements[0].index])

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
