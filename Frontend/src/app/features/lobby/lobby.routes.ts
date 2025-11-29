import { Routes } from '@angular/router';

export const LOBBY_ROUTES: Routes = [
    {
        path: 'create',
        loadComponent: () =>
            import('./create-room/create-room').then(m => m.CreateRoom)
    },
    {
        path: 'join',
        loadComponent: () =>
            import('./join-room/join-room').then(m => m.JoinRoom)
    }
];