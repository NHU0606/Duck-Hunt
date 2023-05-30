import { _decorator, Canvas, Component, Animation, EventMouse, Node, Sprite, Vec3, instantiate, math, Input, input, Vec2, Camera, v3, director, AudioSource, Button, Label, cclegacy } from 'cc';
import { GameModel } from './GameModel';
import { ScoreController } from './ScoreController';
import { ResultController } from './ResultController';
import { BirdController } from './BirdController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type: ScoreController})
    private score: ScoreController;
    
    @property({type:ResultController})
    private result: ResultController;

    @property({type:GameModel})
    private GameModel: GameModel;
    
    @property({type: Label})
    private timeLabel: Label;

    @property({type: Camera})
    private camera : Camera;

    @property({type: Node})
    private inputNode : Node;
    
    @property({type: Node})
    private testNode : Node;

    private totalTime: number = 9;
    private time: number;
    private birdArray: BirdController[] = [];

    protected start(): void {
        document.getElementById('Cocos3dGameContainer').style.cursor = 'none';
        localStorage.setItem('highscore', '0')

        this.schedule(function(){
            this.spawnBird();
        }, 3)  
        
        setTimeout(() => {
            this.time = this.totalTime;
            this.updateTimeLabel();
            this.schedule(function(){
                this.updateTime();
            }, 1)  
        },1000); 
    }    

    protected onLoad() : void  {
        this.inputNode.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.inputNode.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.inputNode.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.inputNode.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);

        if(director.getScene().name == 'Play'){
            this.startGame();
        }

        //audio
        const audioSrc = this.node.getComponent(AudioSource)
        this.GameModel.AudioBackGround = audioSrc;
    }

    protected updateTime(): void{
        this.time--;

        if(this.time >= 0){
            this.updateTimeLabel();
            if(this.time == 0) {
                this.onTimeUp();
            }
        }
    }

    protected updateTimeLabel(): void{
        this.timeLabel.string = `Time: ` + this.time.toString();
    }

    protected onTimeUp() : void {
        this.inputNode.off(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.inputNode.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.inputNode.off(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.inputNode.off(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);

        this.result.showResult();
        document.getElementById('Cocos3dGameContainer').style.cursor = '';
        this.GameModel.BirdContain.active = false;
        this.testNode.active = false;
        this.timeLabel.string = '';
        this.score.hideScore();
        this.GameModel.TimeBoard.active = false;
        this.GameModel.ScoreBoard.active = false;
    }

    protected spawnBird(): void {
        const birdNode = instantiate(this.GameModel.BirdPrefab).getComponent(BirdController);
        birdNode.Initialized(this.GameModel.BirdContain);
        this.birdArray.push(birdNode);
    }
    
    private onMouseDown(event: EventMouse) : void {
        const cursorPosition = event.getLocation();
        let mousePos = new Vec3(cursorPosition.x, cursorPosition.y , 0);
        let worldPos = v3();
        let cameraPos: Vec3 = new Vec3(0,0,0);

        worldPos = this.camera.screenToWorld(mousePos, worldPos);
        this.testNode.worldPosition = worldPos;
        cameraPos = this.GameModel.BirdContain.inverseTransformPoint(cameraPos, worldPos);

        let destroyBirdIndex : number = -1;
        for(let i = 0; i < this.birdArray.length; ++i) {
            const birdPosition = this.birdArray[i].node.position;
            if (cameraPos.x >= birdPosition.x - 60 
                && cameraPos.x <= birdPosition.x + 60 
                && cameraPos.y >= birdPosition.y - 40 
                && cameraPos.y <= birdPosition.y + 40) {
                    destroyBirdIndex = i;
                    break;
            }
        }
        if (destroyBirdIndex >= 0) {
            this.score.addScore();
            this.birdArray[destroyBirdIndex].node.destroy()
            this.birdArray.splice(destroyBirdIndex, 1);
        }
    }

    private onMouseMove(event: EventMouse) : void {
        const cursorPosition = event.getLocation();
        let mousePos = new Vec3(cursorPosition.x, cursorPosition.y , 0);
        let worldPos = v3();

        worldPos = this.camera.screenToWorld(mousePos, worldPos);
        this.testNode.worldPosition = worldPos;
    }

    private onMouseEnter(event: EventMouse) : void {
        this.testNode.active = true;
        document.getElementById('Cocos3dGameContainer').style.cursor = 'none';
    }

    private onMouseLeave(event: EventMouse) : void {
        this.testNode.active = false;
        document.getElementById('Cocos3dGameContainer').style.cursor = '';
    }
 
    private startGame() : void {
        director.resume();
    }
}


