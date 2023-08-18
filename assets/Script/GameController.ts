import {
  _decorator,
  Canvas,
  Component,
  Animation,
  Prefab,
  EventMouse,
  Node,
  Sprite,
  Vec3,
  instantiate,
  math,
  Camera,
  v3,
  Button,
  find,
  director,
  error,
} from "cc";
import { GameModel } from "./GameModel";
import { BirdController } from "./BirdController";
import { AudioController } from "./AudioController";
import { StoreAPI } from "./StoreAPI";
import { SCENE_NAME } from "./Data";
const { ccclass, property } = _decorator;

let matchId: string;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: Prefab })
  private prefabBirdExploision: Prefab;

  @property({ type: Button })
  private iconShow: Button = null;

  @property({ type: Button })
  private iconOff: Button = null;

  @property({ type: GameModel })
  private GameModel: GameModel;

  @property({ type: Camera })
  private camera: Camera;

  @property({ type: [Node] })
  private heartNode: Node[] = [];

  private GameClient;
  gameClient: any;
  private heartIndex: number = 0;
  private missBird: number = 0;
  private totalTime: number = 50;
  private time: number;
  private birdArray: BirdController[] = [];

  protected start(): void {
    document.getElementById("Cocos3dGameContainer").style.cursor = "none";

    this.schedule(function () {
      this.spawnBird();
    }, math.randomRangeInt(1, 2));

    this.schedule(function () {
      this.spawnBird();
    }, math.randomRangeInt(3, 4));

    setTimeout(() => {
      this.time = this.totalTime;
      this.updateTimeLabel();
      this.schedule(function () {
        this.updateTime();
      }, 1);
    }, 1500);

    for (const heartItem of this.heartNode) {
      heartItem.active = true;
    }
  }

  protected onLoad(): void {
    this.GameModel.InputNode.on(
      Node.EventType.TOUCH_START,
      this.onTouchDown,
      this
    );
    this.GameModel.InputNode.on(
      Node.EventType.MOUSE_DOWN,
      this.onMouseDown,
      this
    );
    this.GameModel.InputNode.on(
      Node.EventType.MOUSE_MOVE,
      this.onMouseMove,
      this
    );
    this.GameModel.InputNode.on(
      Node.EventType.MOUSE_ENTER,
      this.onMouseEnter,
      this
    );
    this.GameModel.InputNode.on(
      Node.EventType.TOUCH_END,
      this.onMouseLeave,
      this
    );
    this.GameModel.InputNode.on(
      Node.EventType.MOUSE_LEAVE,
      this.onMouseLeave,
      this
    );

    let param = find("GameClient");
    let gameClientParams = param.getComponent(StoreAPI);
    this.gameClient = gameClientParams.gameClient;

    matchId = gameClientParams.matchId;
  }

  protected update(dt: number): void {
    this.birdOutScreen();
  }

  protected updateTime(): void {
    this.time--;

    if (this.time >= 0) {
      this.updateTimeLabel();
      if (this.time == 0) {
        this.onTimeUp();
      }
    }
  }

  protected updateTimeLabel(): void {
    this.GameModel.TimeLabel.string = `Time: ` + this.time.toString();
  }

  protected async onTimeUp(): Promise<void> {
    this.GameModel.InputNode.off(
      Node.EventType.TOUCH_START,
      this.onTouchDown,
      this
    );
    this.GameModel.InputNode.off(
      Node.EventType.MOUSE_DOWN,
      this.onMouseDown,
      this
    );
    this.GameModel.InputNode.off(
      Node.EventType.MOUSE_MOVE,
      this.onMouseMove,
      this
    );
    this.GameModel.InputNode.off(
      Node.EventType.MOUSE_ENTER,
      this.onMouseEnter,
      this
    );
    this.GameModel.InputNode.off(
      Node.EventType.TOUCH_END,
      this.onMouseLeave,
      this
    );
    this.GameModel.InputNode.off(
      Node.EventType.MOUSE_LEAVE,
      this.onMouseLeave,
      this
    );

    this.GameModel.Result.showResult();
    document.getElementById("Cocos3dGameContainer").style.cursor = "";
    this.GameModel.BirdContain.active = false;
    this.GameModel.CursorNode.active = false;
    this.GameModel.TimeLabel.string = "";
    this.GameModel.Score.hideScore();
    this.GameModel.TimeBoard.active = false;
    this.GameModel.ScoreBoard.active = false;
    this.iconShow.node.active = false;
    this.iconOff.node.active = false;

    let _this = this;

    await this.gameClient.match
      .completeMatch(matchId, { score: _this.GameModel.Score.curScore })
      .then((data) => {})
      .catch((error) => console.log(""));
  }

  protected spawnBird(): void {
    const birdNode = instantiate(this.GameModel.BirdPrefab).getComponent(
      BirdController
    );
    birdNode.Initialized(this.GameModel.BirdContain);
    this.birdArray.push(birdNode);
  }

  private birdOutScreen(): void {
    for (let i = 0; i < this.birdArray.length; ++i) {
      const birdPosition = this.birdArray[i].node.position;
      if (birdPosition.y >= 250) {
        this.birdArray[i].node.destroy();
        this.birdArray.splice(i, 1);
      }
    }
  }

  private onMouseDown(event: EventMouse): void {
    const cursorPosition = event.getLocation();
    let mousePos = new Vec3(cursorPosition.x, cursorPosition.y, 0);
    let worldPos = v3();
    let cameraPos: Vec3 = new Vec3(0, 0, 0);

    worldPos = this.camera.screenToWorld(mousePos, worldPos);
    this.GameModel.CursorNode.worldPosition = worldPos;
    cameraPos = this.GameModel.BirdContain.inverseTransformPoint(
      cameraPos,
      worldPos
    );

    let destroyBirdIndex: number = -1;
    for (let i = 0; i < this.birdArray.length; ++i) {
      const birdPosition = this.birdArray[i].node.position;
      if (
        cameraPos.x >= birdPosition.x - 60 &&
        cameraPos.x <= birdPosition.x + 60 &&
        cameraPos.y >= birdPosition.y - 40 &&
        cameraPos.y <= birdPosition.y + 40
      ) {
        destroyBirdIndex = i;
        if (this.prefabBirdExploision) {
          this.showBirdExplosion(birdPosition);
        }
        break;
      }
    }
    if (destroyBirdIndex >= 0) {
      this.GameModel.AudioNode.onTouchStart();
      this.GameModel.Score.addScore();
      this.birdArray[destroyBirdIndex].node.destroy();
      this.birdArray.splice(destroyBirdIndex, 1);
    }
  }

  private onTouchDown(event: EventMouse): void {
    const cursorPosition = event.getLocation();
    let mousePos = new Vec3(cursorPosition.x, cursorPosition.y, 0);
    let worldPos = v3();
    let cameraPos: Vec3 = new Vec3(0, 0, 0);

    worldPos = this.camera.screenToWorld(mousePos, worldPos);
    this.GameModel.CursorNode.worldPosition = worldPos;
    cameraPos = this.GameModel.BirdContain.inverseTransformPoint(
      cameraPos,
      worldPos
    );

    let destroyBirdIndex: number = -1;
    for (let i = 0; i < this.birdArray.length; ++i) {
      const birdPosition = this.birdArray[i].node.position;
      if (
        cameraPos.x >= birdPosition.x - 60 &&
        cameraPos.x <= birdPosition.x + 60 &&
        cameraPos.y >= birdPosition.y - 40 &&
        cameraPos.y <= birdPosition.y + 40
      ) {
        destroyBirdIndex = i;
        if (this.prefabBirdExploision) {
          this.showBirdExplosion(birdPosition);
        }
        break;
      }
    }
    if (destroyBirdIndex >= 0) {
      this.GameModel.AudioNode.onTouchStart();
      this.GameModel.Score.addScore();
      this.birdArray[destroyBirdIndex].node.destroy();
      this.birdArray.splice(destroyBirdIndex, 1);
    } else {
      this.missBird++;

      if (this.missBird >= 1) {
        this.onMissBird();
      }
    }
  }

  private onMissBird(): void {
    if (this.heartIndex < this.heartNode.length) {
      this.heartNode[this.heartIndex].active = false;
      this.heartIndex++;
    }

    if (this.heartIndex >= this.heartNode.length) {
      this.onTimeUp();
    }
  }

  private showBirdExplosion(birdPosition: Vec3): void {
    const birdExplosionNode = instantiate(this.prefabBirdExploision);
    this.GameModel.BirdContain.addChild(birdExplosionNode);

    birdExplosionNode.position = birdPosition;

    const animationComponent = birdExplosionNode.getComponent(Animation);
    if (animationComponent) {
      birdExplosionNode.active = true;
      animationComponent.play();

      animationComponent.on(Animation.EventType.FINISHED, () => {
        birdExplosionNode.destroy();
      });
    }
  }

  private onMouseMove(event: EventMouse): void {
    const cursorPosition = event.getLocation();
    let mousePos = new Vec3(cursorPosition.x, cursorPosition.y, 0);
    let worldPos = v3();

    worldPos = this.camera.screenToWorld(mousePos, worldPos);
    this.GameModel.CursorNode.worldPosition = worldPos;
  }

  private onMouseEnter(event: EventMouse): void {
    this.GameModel.CursorNode.active = true;
    document.getElementById("Cocos3dGameContainer").style.cursor = "default";
  }

  private onMouseLeave(event: EventMouse): void {
    this.GameModel.CursorNode.active = false;
    document.getElementById("Cocos3dGameContainer").style.cursor = "";
  }

  private async onClickAgain(): Promise<void> {
    let _this = this;
    let param = find("GameClient");
    let gameClientParams = param.getComponent(StoreAPI);
    this.gameClient = gameClientParams.gameClient;

    await gameClientParams.gameClient.match
      .startMatch()
      .then((data) => {
        matchId = data.matchId;
      })
      .catch((error) => console.log(""));

    gameClientParams.matchId = matchId;

    director.loadScene(SCENE_NAME.Play);
  }
}
