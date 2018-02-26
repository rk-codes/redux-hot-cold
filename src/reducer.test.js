import reducer from './reducer';
import {makeGuess, restartGame, generateAuralUpdate} from './actions';

describe('reducer', () => {
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('makeGuess', () => {
        it('shoule make a guess', () => {
            let state = {
                guesses: [2, 5],
                feedback: 'You\'re Cold' ,
                auralStatus: '',
                correctAnswer: 70
            };
    
            state = reducer(state, makeGuess(4));
            expect(state.guesses).toEqual([2,5,4]);
            expect(state.feedback).toEqual('You\'re Ice Cold...');
    
            state = reducer(state, makeGuess(32));
            expect(state.guesses).toEqual([2,5,4,32]);
            expect(state.feedback).toEqual('You\'re Cold...');
    
            state = reducer(state, makeGuess(50));
            expect(state.guesses).toEqual([2,5,4,32,50]);
            expect(state.feedback).toEqual('You\'re Warm.');
    
            state = reducer(state, makeGuess(65));
            expect(state.guesses).toEqual([2,5,4,32,50,65]);
            expect(state.feedback).toEqual('You\'re Hot!');
    
            state = reducer(state, makeGuess(70));
            expect(state.guesses).toEqual([2,5,4,32,50,65,70]);
            expect(state.feedback).toEqual('You got it!');
          
        })
    })
 
    describe('restartGame', () => {
        it('should restart the game', () => {
            let state = {
                guesses: [1, 2, 3, 4],
                feedback: 'Awesome',
                correctAnswer: 4
            };
            state = reducer(state, restartGame());
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.auralStatus).toEqual('');
        })
    })
  
    describe('generateAuralUpdate', () => {
        it('should generate aural update', () => {
            let state = {
                guesses: [1, 2, 3, 4],
                feedback: 'You\'re Hot!',
            };
            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual('Here\'s the status of the game right now: You\'re Hot! You\'ve made 4 guesses. In order of most- to least-recent, they are: 4, 3, 2, 1');
        })
    })
})