import { User } from './user';

export class Game {
    public Id: string;
    public Player1Id: string;
    public Player2Id: string;
    public Symbol: string;
    public StartDateTime: Date;
    public LastUpdated: Date;
    public EndDateTime: Date;
    public Status: string;
    public Board: string;

    public Player1: User;
    public Player2: User;
}
