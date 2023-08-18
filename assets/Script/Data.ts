import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Data')
export class Data extends Component {
    public static readonly sound = 'soundBirdHunter';
    public static readonly highscore = 'highscoreBirdHunter'
    
    public static soundStatic: number = 1;
    public static highScoreStatic: number = 0;

    public static readonly Node_GameClient = {
        GameClient: 'GameClient'
    }
}

export const SCENE_NAME = {
    Entry: 'Entry',
    Setting: 'Setting',
    Play: 'Play'
}
