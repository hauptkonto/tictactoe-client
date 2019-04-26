import { User } from './user';

export class Game {
    public id: string;
    public player1Id: string;
    public player2Id: string;
    public symbol: string;
    public startDateTime: Date;
    public lastUpdated: Date;
    public endDateTime: Date;
    public status: string;
    public board: string;

    public player1: User;
    public player2: User;

    /*GetIntBoard(): number[] {
        let spltBoard = this.Board.split(',');
        let intBoard = [];
        for (let i = 0; i < spltBoard.length; i++) {
            intBoard[i] = parseInt(spltBoard[i], 10);
        }
        return intBoard;
    }*/
}
