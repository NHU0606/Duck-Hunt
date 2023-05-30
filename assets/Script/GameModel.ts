import { _decorator, Component, ImageAsset, instantiate, Label, Node, Prefab, AudioSource, Sprite, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({ type: Prefab })
    private birdPrefab: Prefab = null;

    @property({type:Node})
    private birdContain: Node; 

    @property(AudioSource)
    private audioBackGround: AudioSource = null;

    @property(AudioSource)
    private audioShoot: AudioSource = null;

    @property(Node)
    private timeBoard: Node;

    @property(Node)
    private scoreBoard: Node;

    public get BirdPrefab() : Prefab {
        return this.birdPrefab;
    }
    
    public set BirdPrefab(birdPrefab : Prefab) {
        this.birdPrefab = birdPrefab;
    }

    public get BirdContain() : Node {
        return this.birdContain;
    }
    
    public set BirdContain(birdContain : Node) {
        this.birdContain = birdContain;
    }   
    
    public get AudioBackGround() : AudioSource {
        return this.audioBackGround;
    }


    public set AudioBackGround(audioBackGround: AudioSource){
        this.audioBackGround = audioBackGround;
    }

    public get AudioShoot() : AudioSource {
        return this.audioShoot;
    }

    public set AudioShoot(audioShoot: AudioSource){
        this.audioShoot = audioShoot;
    }

    public get TimeBoard() : Node {
        return this.timeBoard;
    }
    
    public set TimeBoard(timeBoard : Node) {
        this.timeBoard = timeBoard;
    } 

    public get ScoreBoard() : Node {
        return this.scoreBoard;
    }
    
    public set ScoreBoard(scoreBoard : Node) {
        this.scoreBoard = scoreBoard;
    } 
}




