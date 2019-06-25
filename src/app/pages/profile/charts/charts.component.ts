import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/core/user.service';
import { Observable } from 'rxjs';


export interface mypoints{
  wpm:number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit{

  id_current=this.authService.userId;
  
  points: Observable<mypoints[]>;
  private pointsCollection: AngularFirestoreCollection<mypoints>;

  

  constructor(public afAuth: AngularFireAuth,private userService: UserService, private authService: AuthService,db: AngularFirestore,private afs: AngularFirestore) { 
    this.pointsCollection = this.afs.collection("users").doc(this.id_current).collection("race-stats");
    this.points = this.pointsCollection.valueChanges();

  
  }


  
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
    
  };
  
  public lineChartLabels = ['', '', '', '', '', '','','','',''];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    {data: [62,79,70,81,82,80,82,81,82,80], label:"last races" ,borderColor:"#329dad" ,fill:false}
   
  ];

  ngOnInit() {
   
  }

 
}
