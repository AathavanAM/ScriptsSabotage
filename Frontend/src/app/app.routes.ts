import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./home/home').then(m => m.Home)
    },

    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

    {
        path: 'lobby',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./features/lobby/lobby.routes').then(m => m.LOBBY_ROUTES)
    },

    {
        path: 'game',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./features/game/game.routes').then(m => m.GAME_ROUTES)
    },

    {
        path: 'movies',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./features/movie-selection/movie-selection').then(m => m.MovieSelection)
    },

    { path: '**', redirectTo: '' }
];