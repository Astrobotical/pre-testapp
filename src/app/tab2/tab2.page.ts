import { SpeedData } from './../models/speedData.model';
import { RaceData } from './../models/raceData.model';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns';
import {Chart, LinearScale, registerables} from 'chart.js/auto';
import { ResizeObserver } from '@juggle/resize-observer';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;
  Data: RaceData[] = [];
  showingDetails = false;
  chart:any;
  selectedFilter:number = 0;
  filterTime = () => console.log("Filtering Time");
  speedData : SpeedData= new SpeedData(0, "Something", "something2", [
    0,7.5,13,17,10,15,30,25,25,35,40
  ], 0, "Speed", 0, 0, 0);
  selectedItem : RaceData = new RaceData(0, "2021-01-02", "5k",this.speedData);
  lineChart: any;
  
  ngOnInit() {
    Chart.register(...registerables);
    this.Data.push(new RaceData(3, "2021-01-02", "5k", new SpeedData(1, "Something", "something2",
    [0,7.5,13,17,10,15,30,25,25,35,40], 0, "Speed", 0,
    0, 0)));
    this.Data.push(new RaceData(4, "2021-01-02", "5k", new SpeedData(1, "Something", "something2",
    [0,7.5,13,17,10,15,30,25,25,35,40], 0, "Speed", 0,
    0, 0)));
    const ro = new ResizeObserver((entries, observer) => {
      console.log('Body has resized!');
      //observer.observe(this.lineCanvas.nativeElement);
      observer.disconnect(); // Stop observing
    });
    ro.observe(document.body);

  }
  constructor() {
 
  }

  formatDate(date: String) { 
    var value = date.toString();
    console.log(value)
    var formattedDate = format(new Date(value), 'dd MMMM yyyy');
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
      time.setHours(7, index * 1, 0); // Set the time to 7:00, 7:05, 7:10, ...
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
            backgroundColor: 'red',
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
}