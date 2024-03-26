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
    date=Date()
    public Animals: Array<GraficoModel> = [
      {Value: 500, Color:'#498B94', Size:'', Legend:'06.00 AM'},
      {Value: 250, Color:'Violet', Size:'', Legend:'12.00 PM'},
      {Value: 107, Color:'MediumSeaGreen', Size:'', Legend:'06.00 PM'},
      {Value: 190, Color:'Orange', Size:'', Legend:'NIGHT'},
      {Value: 400, Color:'red', Size:'', Legend:'MID-NIGHT'},

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
