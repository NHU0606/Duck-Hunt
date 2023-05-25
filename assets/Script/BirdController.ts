import { _decorator, Component, Node, Vec3, Quat, instantiate, math, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum BirdDirection {
    Left,
    Right,
    TopLeft,
    TopRight
}

@ccclass('BirdController')
export class BirdController extends Component {
    @property({ type: Prefab })
    private birdPrefab: Prefab = null;

    @property({type:Node})
    private birdContain: Node;

    private spawnDelayCreate: number = 2;
    private timeCountCreate: number = 0;
    
    private bird: Node;
    private birdSpeed: number = 170;
    private currentDirection: BirdDirection = BirdDirection.TopRight;
    private directionChangeDelay: number = 1;
    private directionChangeTime: number = 0;
    
    protected onLoad(): void {
        this.bird = this.node;
        this.directionChangeTime = this.directionChangeDelay;
    }
    
    protected moveBird(dt: number): void {
        const movement = new Vec3(0, 0, 0);
        
        switch (this.currentDirection) {
            case BirdDirection.Left:
                movement.x -= this.birdSpeed * dt;
                this.bird.angle = 180;
                break;
            case BirdDirection.Right:
                movement.x += this.birdSpeed * dt;
                this.bird.angle = 0;
                break;
            case BirdDirection.TopLeft:
                movement.x -= this.birdSpeed * dt;
                movement.y += this.birdSpeed * dt;
                this.bird.angle = 135;
                break;
            case BirdDirection.TopRight:
                movement.x += this.birdSpeed * dt;
                movement.y += this.birdSpeed * dt;
                this.bird.angle = 45;
                break;
            }
        this.bird.position = this.bird.position.add(movement);
    }
            
    protected updateDirection(dt: number): void {
        this.directionChangeTime -= dt;
        if (this.directionChangeTime <= 0) {
            this.setDirection();
            this.directionChangeTime = this.directionChangeDelay;
        }
    }
            
    protected setDirection(): void {
        const directionCount = Object.keys(BirdDirection).length / 2;
        const nextDirection = (this.currentDirection + 1) % directionCount;
        this.currentDirection = nextDirection;
    }
            
    protected spawnBird(): void {
        const birdNode = instantiate(this.birdPrefab);
        this.birdContain.addChild(birdNode);
        birdNode.setScale(0.6, 0.6, 0.6);
        birdNode.setPosition(math.randomRangeInt(0, 950), math.randomRangeInt(0, 100), 0);
    }
            
    protected update(dt: number): void {
        this.moveBird(dt);
        this.updateDirection(dt);
                
        this.timeCountCreate += dt;
        if (this.timeCountCreate >= this.spawnDelayCreate) {
            this.spawnBird();
            this.timeCountCreate = 0;
        }
    }
}
