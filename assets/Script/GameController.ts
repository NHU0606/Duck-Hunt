import { BirdController } from './BirdController';
import { _decorator, Canvas, Component, EventMouse, Node, Sprite, Vec3, EventTouch, instantiate, math, find, Input, input, Vec2, Camera, v3, director, Prefab } from 'cc';
import { GameModel } from './GameModel';
import { ScoreController } from './ScoreController';
import { ResultController } from './ResultController';

const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {
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

    // @property({type: Prefab})
    // private hideBird : Prefab;
    
    
    private birdPosition: Vec3;
    private totalTime: number = 50;
    private time: number;

    protected start(): void {
        this.result.hideResult();

        this.schedule(function(){
            this.spawnBird();
        }, 3)  
        
        // time
        this.time = this.totalTime;
        this.updateTimeLabel();
        this.schedule(this.updateTime, 1);
    }    

    updateTime(){
        this.time--;

        if(this.time >= 0){
            this.updateTimeLabel();
            if(this.time == 0) {
                this.onTimeUp();
            }
        }
    }

    updateTimeLabel(){
        this.GameModel.TimeLabel.string = this.time.toString();
    }

    onTimeUp(){
        director.pause();
        this.result.showResult();
        this.GameModel.BirdContain.active = false;
    }
           
    protected spawnBird(): void {
        const birdNode = instantiate(this.GameModel.BirdPrefab);
        this.GameModel.BirdContain.addChild(birdNode);
        birdNode.setScale(0.6, 0.6, 0.6);
        birdNode.setPosition(math.randomRangeInt(-450, 450), math.randomRangeInt(-300, -250), 0);
        this.birdPosition = birdNode.getPosition();
    }
    
    onLoad() {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseMove, this);
    
        if(director.getScene().name == 'Play'){
            this.startGame();
        }
    }
    
    // private hideNodeInPrefab() {
    //     const instantiatedNode = instantiate(this.GameModel.BirdPrefab); 
    //     instantiatedNode.active = false; 
    // }

    onMouseMove(event: EventMouse) {
        let a = new Vec3(0,0,0);
        const cursorPosition = event.getLocation();
        let mousePos = new Vec3(cursorPosition.x, cursorPosition.y , 0);
        let worldPos = v3();
        let cameraPos: Vec3;

        worldPos = this.camera.screenToWorld(mousePos, worldPos);
        this.testNode.worldPosition = worldPos;
        cameraPos = this.GameModel.BirdContain.inverseTransformPoint(a, mousePos);

        if (cameraPos.x >= this.birdPosition.x - 150 && cameraPos.x <= this.birdPosition.x + 150 && cameraPos.y >= this.birdPosition.y - 30 && cameraPos.y <= this.birdPosition.y + 30) {
            this.score.addScore();
            // this.hideNodeInPrefab();
            // this.hideBird.active = false;
            // this.BirdController.playExplosionEffect();
        }
    }

    onClickAgain() {
        director.loadScene('Play');
    }

    startGame() {
        director.resume();
    }
    
    // playExplosionEffect(){
    //     this.birdPrefab.enable = false;
    // }
}


