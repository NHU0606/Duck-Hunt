import { _decorator, Canvas, Component, EventMouse, Node, Sprite, Vec3, EventTouch, instantiate, math, find} from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameModel})
    private GameModel: GameModel;

    @property({type:GameView})
    private GameView: GameView;

    protected start(): void {
        this.schedule(function(){
            this.spawnBird();
        }, 5)
    }    
           
    protected spawnBird(dt: number): void {
        const birdNode = instantiate(this.GameModel.BirdPrefab);
        this.GameModel.BirdContain.addChild(birdNode);
        birdNode.setScale(0.6, 0.6, 0.6);
        birdNode.setPosition(math.randomRangeInt(0, 950), math.randomRangeInt(50, 100), 0);
    }

    // protected onLoad(): void {
    //     this.GameModel.BirdPrefab.on(Node.EventType.TOUCH_START, this.onClickBird, this);
    // }

    // protected onClickBird(event: EventTouch): void {
    //     console.log("rot naooooooooooo")
    // }
}


