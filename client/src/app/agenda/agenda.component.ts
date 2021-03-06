import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router,
	RouterEvent,
	ActivatedRoute,
	ParamMap,
	Params
} from '@angular/router';

import {
	ScrollToService
} from '@nicky-lenaers/ngx-scroll-to';;
import {
  TweenLite,
  Quad
} from "gsap";
import * as _ from 'underscore';
import {
	DataService
} from '../data.service';

@Component({
	selector: 'app-agenda',
	templateUrl: './agenda.component.html',
	styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

	public stepId: string;
	public nextStep: string;

	public sections: any;
	public content: any;

	private stepIndex: number;
	private fromOtherPage: boolean;

	constructor(public _dataSvc: DataService, private _scrollToService: ScrollToService, private route: ActivatedRoute, private router: Router) {

		this.router.events.subscribe((val: RouterEvent) => {

			this.fromOtherPage = false;
			if (val.url === '/agenda' && val['urlAfterRedirects'] === '/agenda/introduction') {

				this.fromOtherPage = true;
				this._scrollToService
					.scrollTo({
						target: 'top',
						duration: 1
					});

			}

		});

		this.route.params.subscribe(params => {

			if (this.fromOtherPage) return;

			this.stepId = params['step'];

			this.getContent();

			this._scrollToService
				.scrollTo({
					target: 'top',
					easing: 'easeOutQuad',
					duration: 1500
				});

		});

	}

	ngOnInit() {}

	async getContent() {

		const items = await this._dataSvc.getFilteredDataForUrl('agenda', 'name%20key');
		const response = await this._dataSvc.getDataForUrl('agenda/' + this.stepId);

		this.sections = items;
		this.content = response;

		this.setProgress();
	}

	public getNextStep() {

		if (!this.sections) return;

		return this.sections[this.stepIndex + 1];

	}

	public changeStep(step) {

		this.router.navigateByUrl(this.router.url.replace(this.stepId, step));

	}

	private setProgress() {

		if (!this.sections) return;

		this.stepIndex = this.sections.findIndex((section) => {
			return section.key === this.stepId
		});
		// Set progress bar    
		let progress = document.getElementById('progress');
		if (this.stepIndex > 0) {
			let width = 20 * (this.stepIndex - 1);
			let newWidth = (20 * this.stepIndex) + 1;
			progress.style.width = width + 1 + '%';

			TweenLite.to(progress, 1, {
				width: newWidth + '%',
				delay: 1.2,
				ease: Quad.easeOut
			})
		}

	}

}