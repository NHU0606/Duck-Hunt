import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum BirdDirection {
    Left,
    Right,
    TopLeft,
    TopRight,
    Die
}

@ccclass('BirdController')
export class BirdController extends Component {
    private birdNode: Node;
    private birdSpeed: number = 100;
    private currentDirection: BirdDirection = BirdDirection.TopRight;

    protected onLoad(): void {
        this.birdNode = this.node;
    }

    protected update(dt: number): void {
        const movement = new Vec3()

        switch (this.currentDirection) {
            case BirdDirection.Left:
                movement.x -= this.birdSpeed*dt;
                break;
            case BirdDirection.Right:
                movement.x += this.birdSpeed*dt;
                break;
            case BirdDirection.TopLeft:
                movement.x -= this.birdSpeed*dt;
                movement.y += this.birdSpeed*dt; 
                break;
            case BirdDirection.TopRight:
                movement.x += this.birdSpeed*dt;
                movement.y += this.birdSpeed*dt;
        }
        this.birdNode.position = this.birdNode.position.add(movement);
    }

    protected setDirection(direction: BirdDirection): void {
        const directionCount = Object.keys(BirdController).length / 2;
        const nextDirection = (this.currentDirection + 1) % directionCount; 
        this.currentDirection = nextDirection;
    }
}


