import { _decorator, Canvas, Component, Animation, EventMouse, Node, Sprite, Vec3, instantiate, math, Input, input, Vec2, Camera, v3, director, AudioSource, Button } from 'cc';
import { GameModel } from './GameModel';
import { ScoreController } from './ScoreController';
import { ResultController } from './ResultController';
import { BirdController } from './BirdController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(AudioSource)
    private audioBackGround: AudioSource = null;

    @property(AudioSource)
    private audioShoot: AudioSource = null;
    
    @property({type: ScoreController})
    private score: ScoreController;
    
    @property({type:ResultController})
    private result: ResultController;

    @property({type:GameModel})
    private GameModel: GameModel;

    @property({type: Camera})
    private camera : Camera;
    
    @property({type: Node})
    private testNode : Node;

    @property({type: Button})
    private againBtn: Button;

    @property({type: Node})
    private totalTime: number = 50;
    private time: number;
    private birdArray: BirdController[] = [];
    audioSource: any;

    protected start(): void {
        document.getElementById('Cocos3dGameContainer').style.cursor = 'none';

        this.result.hideResult();

        this.schedule(function(){
            this.spawnBird();
        }, 3)  
        
        setTimeout(() => {
            this.time = this.totalTime;
            this.updateTimeLabel();
            this.schedule(function(){
                this.updateTime();
            }, 1)  
        }, math.randomRangeInt(1000, 1500)); 
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
        this.GameModel.TimeLabel.string = `Time: ` + this.time.toString();
    }

    protected onTimeUp() : void {
        director.pause();
        this.result.showResult();
        this.GameModel.BirdContain.active = false;
    }

    protected spawnBird(): void {
        const birdNode = instantiate(this.GameModel.BirdPrefab).getComponent(BirdController);
        birdNode.Initialized(this.GameModel.BirdContain);
        this.birdArray.push(birdNode);
    }
    
    protected onLoad() : void  {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    
        if(director.getScene().name == 'Play'){
            this.startGame();
        }

        //audio
        const audioSrc = this.node.getComponent(AudioSource)
        this.audioBackGround = audioSrc;
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

    private onClickAgain() : void {
        director.loadScene('Play');
    }

    private startGame() : void {
        director.resume();
    }
}


