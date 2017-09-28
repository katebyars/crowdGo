import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProjectService]
})
export class AdminComponent implements OnInit {
  projectId: string;
  projectToDisplay;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.projectId = urlParameters['id'];
    });
    this.projectService.getProjectById(this.projectId).subscribe(dataLastEmittedFromObserver => {
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

  submitForm(name: string, description: string, author: string, pledged: number, funded: boolean, daysToGo: number, goal: number, category: string, image: string){
    var newProject: Project = new Project(name, description, author, pledged, funded, daysToGo, goal, category, image);
    this.projectService.addProject(newProject);
  }


}
