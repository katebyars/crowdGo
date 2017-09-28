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
      console.log("testing");
    var projectEntryinFirebase = this.getProjectById(localUpdatedProject.$key);

    projectEntryinFirebase.update({
    name: localUpdatedProject.name,
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

  fundProject(donationValue, projectToDisplay, projectId) {
    console.log("in service"+projectId);
    let pickles = this.getProjectById(projectId);
    let homies;
    var projectEntryinFirebase = this.getProjectById(projectId).subscribe ( e => {
      homies = e.pledged;
    });
    // console.log(projectEntryinFirebase);
    // var newFunds: number = parseInt(projectToDisplay.pledged) + parseInt(donationValue);
    // projectToDisplay.pledged = newFunds;

// var newAmount = projectEntryinFirebase.pledged + donationValue;
    pickles.update({
      pledged: homies
  });
}
}
