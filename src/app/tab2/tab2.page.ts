import { SpeedData } from './../models/speedData.model';
import { RaceData } from './../models/raceData.model';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns';
import {Chart, LinearScale, registerables} from 'chart.js/auto';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;
  Data: RaceData[] = [];
  showingDetails = false;
  chart:any;
  speedData : SpeedData= new SpeedData(0, "Something", "something2", [
    0,7.5,13,17,10,15,30,25,25,35,40
  ], 0, "Speed", 0, 0, 0);
  selectedItem : RaceData = new RaceData(0, "", "5k",this.speedData);
  lineChart: any;
  
  constructor() {
    this.showingDetails = false;
    Chart.register(...registerables);
    this.Data.push (new RaceData(1, "2021-01-02", "5k", this.speedData
   ));
   this.Data.push (new RaceData(2, "2021-2-02", "10k", this.speedData));
   this.Data.push (new RaceData(3, "2021-3-03", "5k", this.speedData));
   this.Data.push (new RaceData(4, "2021-4-04", "10k", this.speedData));
   this.Data.push (new RaceData(5, "2021-5-05", "5k", this.speedData));
   this.Data.push (new RaceData(6, "2021-6-06", "10k", this.speedData));
   this.Data.push (new RaceData(7, "2021-7-07", "5k", this.speedData));

  }

  formatDate(date: string): string {
    const formattedDate = format(new Date("2021-2-02"), 'dd MMMM yyyy');
    return formattedDate;
  }
  raceDetails(Data: RaceData){
    this.selectedItem = Data;
    this.showingDetails = true;
    this.lineChartMethod();
  }
  lineChartMethod() {
    const labels = this.selectedItem.speedData.speed_Speed.map((_, index) => {
      const time = new Date();
      time.setHours(7, index * 5, 0); // Set the time to 7:00, 7:05, 7:10, ...
      return format(time, 'HH:mm');
    });
    const speeds = this.selectedItem.speedData.speed_Speed;
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Speed',
            data: speeds,
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        resizeDelay: 10,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Speed km/hr'
            }
          }
        }
      }
    });
  }
  goBack(){
    this.showingDetails = false;
  }
  createLineGraph() {
    const labels = this.selectedItem.speedData.speed_Speed.map((_, index) => {
      const time = new Date();
      time.setHours(7, index * 5, 0); // Set the time to 7:00, 7:05, 7:10, ...
      return format(time, 'HH:mm');
    });
    const speeds = this.selectedItem.speedData.speed_Speed;

    this.chart = new Chart("MC", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Speed',
            data: speeds,
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Speed'
            }
          }
        }
      }
      
    });
    this.chart.register(LinearScale);
    }
}