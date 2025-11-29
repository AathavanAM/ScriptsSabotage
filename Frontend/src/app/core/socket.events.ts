export const SOCKET_EVENTS = {
    ROUND_START: 'game:round-start',
    ROUND_END: 'game:round-end',

    VOTE_START: 'game:vote-start',
    VOTE_CAST: 'game:vote-cast',
    VOTE_END: 'game:vote-end',

    REVEAL: 'game:reveal',

    RESULTS: 'game:results',
    NEXT_ROUND: 'game:next-round',

    LEAVE_ROOM: 'room:leave'
} as const;