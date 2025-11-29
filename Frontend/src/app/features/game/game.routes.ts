import { Routes } from '@angular/router';
import { GameScreen } from './game-screen/game-screen';
import { VotePanel } from './vote-panel/vote-panel';
import { ResultsScreen } from './results-screen/results-screen';
import { ImpostorReveal } from './impostor-reveal/impostor-reveal';

export const GAME_ROUTES: Routes = [
    { path: '', component: GameScreen },
    { path: 'vote', component: VotePanel },
    { path: 'reveal', component: ImpostorReveal },
    { path: 'results', component: ResultsScreen }
];