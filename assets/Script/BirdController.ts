import { _decorator, Canvas, Component, EventMouse, Node, Sprite, Vec3, Vec2, RigidBody, math} from 'cc';
const { ccclass, property } = _decorator;

enum BirdDirection {
    Left,
    Right,
    TopLeft,
    TopRight,
    DownLeft,
    DownRight
}

@ccclass('BirdController')
export class BirdController extends Component {
    private birdSpeed: number = math.randomRangeInt(80, 100);
    private currentDirection: BirdDirection = BirdDirection.TopRight;
    private directionChangeDelay: number = 1;
    private directionChangeTime: number = 0;

    public Initialized(parent : Node) : void {
        parent.addChild(this.node);
        this.node.setScale(0.6, 0.6, 0.6);
        this.node.setPosition(math.randomRangeInt(-250, 250), math.randomRangeInt(0, -50), 0);
    }
    
    protected moveBird(dt: number): void {
        const movement = new Vec3(0, 0, 0);
            switch (this.currentDirection) {
                case BirdDirection.Left:
                    movement.x -= this.birdSpeed * dt;
                    this.node.angle = 180;
                    this.node.scale = new Vec3 (0.6, -0.6, 0);
                    break;
                case BirdDirection.Right:
                    movement.x += this.birdSpeed * dt;
                    this.node.angle = 0;
                    this.node.scale = new Vec3 (0.6, 0.6, 0);
                    break;
                case BirdDirection.TopLeft:
                    movement.x -= this.birdSpeed * dt;
                    movement.y += this.birdSpeed * dt;
                    this.node.angle = 135;
                    this.node.scale = new Vec3 (0.6, -0.6, 0);
                    break;
                case BirdDirection.TopRight:
                    movement.x += this.birdSpeed * dt;
                    movement.y += this.birdSpeed * dt;
                    this.node.angle = 45;
                    this.node.scale = new Vec3(0.6, 0.6, 0);
                    break;

                case BirdDirection.DownLeft:
                    movement.x -= this.birdSpeed * dt;
                    movement.y -= this.birdSpeed * dt;
                    this.node.angle = 225;
                    this.node.scale = new Vec3(0.6, -0.6, 0);
                    break;
                case BirdDirection.DownRight:
                    movement.x += this.birdSpeed * dt;
                    movement.y -= this.birdSpeed * dt;
                    this.node.angle = 315;
                    this.node.scale = new Vec3(0.6, 0.6, 0);
                    break;
            }
        this.node.position = this.node.position.add(movement);
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

    protected update(dt: number): void {
        this.moveBird(dt);
        this.updateDirection(dt);
    }
}
