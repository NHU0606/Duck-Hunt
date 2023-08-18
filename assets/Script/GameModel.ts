import { _decorator, Component, ImageAsset, instantiate, Label, Node, Prefab, AudioSource, Sprite, SpriteFrame, Texture2D } from 'cc';
import { ResultController } from './ResultController';
import { ScoreController } from './ScoreController';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({ type: Prefab })
    private birdPrefab: Prefab = null;

    @property({type:Node})
    private birdContain: Node; 

    @property(Node)
    private timeBoard: Node;

    @property(Node)
    private scoreBoard: Node;

    @property({type: ScoreController})    
    private score: ScoreController;

    @property({type:ResultController})
    private result: ResultController;

    @property({ type: AudioController})
    private audioNode: AudioController;

    @property({type: Label})
    private timeLabel: Label;

    @property({type: Node})
    private cursorNode : Node;

    @property({type: Node})
    private inputNode : Node;

    public get InputNode() : Node {
        return this.inputNode;
    }
    
    public set InputNode(inputNode : Node) {
        this.inputNode = inputNode;
    }

    public get CursorNode() : Node {
        return this.cursorNode;
    }
    
    public set CursorNode(cursorNode : Node) {
        this.cursorNode = cursorNode;
    }

    public get TimeLabel() : Label {
        return this.timeLabel;
    }
    
    public set TimeLabel(timeLabel : Label) {
        this.timeLabel = timeLabel;
    }

    public get AudioNode() : AudioController {
        return this.audioNode;
    }
    
    public set AudioNode(audioNode : AudioController) {
        this.audioNode = audioNode;
    }

    public get Score() : ScoreController {
        return this.score;
    }
    
    public set Score(score : ScoreController) {
        this.score = score;
    }

    public get Result() : ResultController {
        return this.result;
    }
    
    public set Result(result : ResultController) {
        this.result = result;
    }

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




