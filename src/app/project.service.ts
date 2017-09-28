import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ProjectService {
  projects: FirebaseListObservable<any[]>;
  projectToFund;

  constructor(private database: AngularFireDatabase){
    this.projects = database.list('projects');
  }

  getProjects(){
    return this.projects;
  }

  addProject(newProject: Project){
    this.projects.push(newProject);
  }

  getProjectById(projectId: string){
    return this.database.object('projects/' + projectId);
  }

  updateProject(localUpdatedProject){
    var projectEntryinFirebase = this.getProjectById(localUpdatedProject.$key);
    projectEntryinFirebase.update({name: localUpdatedProject.name,
    description: localUpdatedProject.description,
    author: localUpdatedProject.author,
    pledged: localUpdatedProject.pledged,
    funded: localUpdatedProject.funded,
    daysToGo: localUpdatedProject.daysToGo,
    goal: localUpdatedProject.goal,
    category: localUpdatedProject.category,
    image: localUpdatedProject.image});
  }

  deleteProject(localProjectToDelete){
    var projectEntryinFirebase = this.getProjectById(localProjectToDelete.$key);
    projectEntryinFirebase.remove();
  }

  fundProject(donationValue, projectToDisplay) {
    console.log("fund project in service");

    var projectEntryinFirebase = this.getProjectById(projectToDisplay.$key);
    //
    // this.getProjectById(projectToDisplay.$key).subscribe(dataLastEmittedFromObserver => {
    // this.projectToFund = new Project(dataLastEmittedFromObserver.name,
    //         dataLastEmittedFromObserver.description,
    //         dataLastEmittedFromObserver.author,
    //         dataLastEmittedFromObserver.pledged,
    //         dataLastEmittedFromObserver.funded,
    //         dataLastEmittedFromObserver.daysToGo,
    //         dataLastEmittedFromObserver.goal,
    //         dataLastEmittedFromObserver.category,
    //         dataLastEmittedFromObserver.image)
    // })


    var newFunds: number = parseInt(projectToDisplay.pledged) + parseInt(donationValue);
    projectToDisplay.pledged = newFunds;
    console.log(newFunds);
    console.log(projectToDisplay.pledged);
    console.log(donationValue);

    projectEntryinFirebase.update({name: projectToDisplay.name,
      description: projectToDisplay.description,
      author: projectToDisplay.author,
      pledged: projectToDisplay.pledged,
      funded: projectToDisplay.funded,
      daysToGo: projectToDisplay.daysToGo,
      goal: projectToDisplay.goal,
      category: projectToDisplay.category,
      image: projectToDisplay.image});
  }


}
