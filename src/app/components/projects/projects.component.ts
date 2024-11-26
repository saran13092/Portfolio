import { Component } from '@angular/core';
import { Tools } from 'src/app/models/tools';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  firstPoject: Tools[] = [
    {
      name: 'Node.js',
    },
    {
      name: 'Angular',
    },
    {
      name: 'MongoDB',
    },
    {
      name: 'Gitlab',
    },
  ];

  secoundProject: Tools[] = [
  
    {
      name: 'Spring boot',
    },
    {
      name: 'Angular',
    },
    {
      name: 'PostgreSQL',
    },
  ];

  thirdProject: Tools[] = [
    {
      name: 'Angular',
    },
    {
      name: 'Node.js',
    },
    {
      name: 'MySQL',
    }
    
];

  projectOne = () => {
    window.open(environment.projectOne, '_blank');
  };

  projectTwo = () => {
    window.open(environment.projectTwo, '_blank');
  };

  projectThree = () => {
    window.open(environment.projectThree, '_blank');
  };
}
