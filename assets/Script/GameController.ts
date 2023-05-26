import { _decorator, Canvas, Component, EventMouse, Node, Sprite, Vec3, EventTouch, instantiate, math, find, Input, input, Vec2, Camera, v3 } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameModel})
    private GameModel: GameModel;

    @property({type:GameView})
    private GameView: GameView;
    private birdPosition: Vec3;

    @property({type: Camera})
    private camera : Camera;

    @property({type: Node})
    private testNode : Node;
    
    private birdNode: Node[] = []

    protected start(): void {
        this.schedule(function(){
            this.spawnBird();
        }, 5)      
    }    
           
    protected spawnBird(dt: number): void {
        const birdNode = instantiate(this.GameModel.BirdPrefab);
        this.GameModel.BirdContain.addChild(birdNode);
        birdNode.setScale(0.6, 0.6, 0.6);
        birdNode.setPosition(math.randomRangeInt(-450, 450), math.randomRangeInt(-100, 100), 0);
        this.birdPosition = birdNode.getPosition();
        // this.birdNode.push(birdNode);
    }
    
    onLoad() {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseMove, this);
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
            console.log('bang neeee')
        }
    }

    
    protected update(dt: number): void {
       
    }
}


