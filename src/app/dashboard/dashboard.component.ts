import { Component, OnInit } from '@angular/core';
import { GraficoModel } from '../app.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
    date=Date();
    functioningLight:number=986;
    notFunctioningLight:number=142;
    smartBins={
      bins:21,
      trashLevel:3,
      trash_level:18
    };
    cctv:number=63;
    activeCctv:number=62;
    wifi:number=102;
    public Animals: Array<GraficoModel> = [
      {Value: 500, Color:'#498B94', Size:''},
      {Value: 250, Color:'Violet', Size:''},
      {Value: 107, Color:'MediumSeaGreen', Size:''},
      {Value: 190, Color:'Orange', Size:''},
      {Value: 400, Color:'red', Size:''},

    ];

    public Total=0;
    public MaxHeight= 100;

    constructor(private authService:AuthService , private router:Router) { }

    ngOnInit(): void {
      this.MontarGrafico();
    }

    MontarGrafico(){
      this.Animals.forEach(element => {
        this.Total += element.Value;
      });

      this.Animals.forEach(element => {
        element.Size = Math.round((element.Value*this.MaxHeight)/this.Total) + '%';
      });
    }

    chartOptions = {
      animationEnabled: true,
      title:{
      text: "parking Occupancy"
      },
      data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: 37, name: "Avaliable" },
        { y: 45, name: "Occupied" },
        { y: 18, name: "Non compliant" }
      ]
      }]
    }


    logout(){
         this.authService.logOut()
         this.router.navigate(['login'])
    }
}
