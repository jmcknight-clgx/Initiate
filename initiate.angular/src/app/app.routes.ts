import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { ConditionsComponent } from './conditions/conditions.component';
const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', component: CharactersComponent },  // default page
			{ path: 'conditions', component: ConditionsComponent },
			
		],
		//canActivateChild: [AuthGuard]
	}, 
];

export const routing = RouterModule.forRoot(routes);