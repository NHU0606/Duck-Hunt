import { _decorator, ColliderComponent, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

enum BirdDirection {
    Left,
    Right,
    TopLeft,
    TopRight
}

@ccclass('BirdController')
export class BirdController extends Component {
    private birdNode: Node;
    private birdSpeed: number = 170;
    private currentDirection: BirdDirection = BirdDirection.TopRight;
    private directionChangeDelay: number = 1;
    private directionChangeTimer: number = 0;


    protected onLoad(): void {
        this.birdNode = this.node;
        this.directionChangeTimer = this.directionChangeDelay;
    }

    protected moveBird(dt: number): void {
        const movement = new Vec3(0,0,0);
       
        switch (this.currentDirection) {
            case BirdDirection.Left:
                movement.x -= this.birdSpeed*dt;
                this.birdNode.setRotationFromEuler(0, 180, 0);
                break;
            case BirdDirection.Right:
                movement.x += this.birdSpeed*dt;
                this.birdNode.setRotationFromEuler(0, 0, 0);
                break;
            case BirdDirection.TopLeft:
                movement.x -= this.birdSpeed*dt;
                movement.y += this.birdSpeed*dt; 
                this.birdNode.setRotationFromEuler(0, 135, 0);
                break;
            case BirdDirection.TopRight:
                movement.x += this.birdSpeed*dt;
                movement.y += this.birdSpeed*dt;
                this.birdNode.setRotationFromEuler(0, 45, 0);
                break;
        }
        this.birdNode.position = this.birdNode.position.add(movement);
    }

    protected updateDirection(dt: number): void {
        this.directionChangeTimer -= dt;
        if (this.directionChangeTimer <= 0) {
            this.setDirection();
            this.directionChangeTimer = this.directionChangeDelay;
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


