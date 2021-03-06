import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import * as Rellax  from 'rellax';
import isMobile from 'ismobilejs';

import { create as createDots } from '../dots';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public playTitles: string[] = [
		"Embrace \"Smart Cities\"",
		"Cultivate Local Innovation Ecosystem",
		"Invite Public Influence",
		"Question Data",
		"Imagine The Possible"
	];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {

  	createDots(document.getElementById('dots'), 4, 1, 100, true);
  	createDots(document.getElementById('dots-getstarted'), 3, 1, 200);
  	createDots(document.getElementById('dots-playbook'), 4, 2, 200, true);

  	if(!isMobile(window.navigator.userAgent).phone)
		  new Rellax('.img');

  }

}
