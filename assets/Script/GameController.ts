import { _decorator, Canvas, Component, EventMouse, Node, Sprite, Vec3, EventTouch, instantiate, math, find, Input, input, Vec2, Camera, v3, director } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
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

    @property({type:GameView})
    private GameView: GameView;
    
    @property({type: Camera})
    private camera : Camera;
    
    @property({type: Node})
    private testNode : Node;
    
    private birdPosition: Vec3;
    private birdNode: Node[] = []

    protected start(): void {
        this.schedule(function(){
            this.spawnBird();
        }, 3)     
    }    
           
    protected spawnBird(dt: number): void {
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
            // this.result.resetScore();
        }
    }
    
    onMouseMove(event: EventMouse) {
        let a = new Vec3(0,0,0);
        const cursorPosition = event.getLocation();
        let mousePos = new Vec3(cursorPosition.x, cursorPosition.y , 0);
        let worldPos = v3();
        let cameraPos: Vec3;

        worldPos = this.camera.screenToWorld(mousePos, worldPos);
        this.testNode.worldPosition = worldPos;
        cameraPos = this.GameModel.BirdContain.inverseTransformPoint(a, mousePos);

        if (cameraPos.x >= this.birdPosition.x - 40 && cameraPos.x <= this.birdPosition.x + 40 && cameraPos.y >= this.birdPosition.y - 20 && cameraPos.y <= this.birdPosition.y + 20) {
            this.score.addScore();
            console.log("click on the bird ok")
        }
    }
   

    startGame() {
        this.result.hideResult();
        director.resume();
    }

    protected update(dt: number): void {
       
    }
}


