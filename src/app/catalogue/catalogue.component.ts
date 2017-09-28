import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  providers: [ProjectService]
})
export class CatalogueComponent implements OnInit {
  projects: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;
  projectId: string;
  projectToDisplay;

  constructor(private router: Router, private projectService: ProjectService, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.projectId = urlParameters['id'];
      this.projects = this.projectService.getProjects();
    });
    this.projectService.getProjectById(this.projectId).subscribe(dataLastEmittedFromObserver => {
      // debugger;
      // console.log(this.projectId);
    this.projectToDisplay = new Project(dataLastEmittedFromObserver.name,
            dataLastEmittedFromObserver.description,
            dataLastEmittedFromObserver.author,
            dataLastEmittedFromObserver.pledged,
            dataLastEmittedFromObserver.funded,
            dataLastEmittedFromObserver.daysToGo,
            dataLastEmittedFromObserver.goal,
            dataLastEmittedFromObserver.category,
            dataLastEmittedFromObserver.image)
  })
  }

  goToDetailPage(clickedProject){
    this.router.navigate(['projects', clickedProject.$key]);
  }

}
