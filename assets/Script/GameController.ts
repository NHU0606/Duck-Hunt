import { _decorator, Canvas, Component, Animation, EventMouse, Node, Sprite, Vec3, instantiate, math, Input, input, Vec2, Camera, v3, director, AudioSource, Button, Label, cclegacy, sys, Constraint, UIOpacity } from 'cc';
import { GameModel } from './GameModel';
import { ScoreController } from './ScoreController';
import { PauseController } from './PauseController';
import { ResultController } from './ResultController';
import { BirdController } from './BirdController';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type: Animation})
    private anim: Animation;

    @property({type: ScoreController})    
    private score: ScoreController;

    @property({type: AudioController})
    private audioController: AudioController;

    @property({type: Button})
    private iconShow: Button = null;    

    @property({type: Button})
    private iconOff: Button = null;  

    @property({type: PauseController})
    private pause: PauseController;
    
    @property({type:ResultController})
    private result: ResultController;

    @property({type:GameModel})
    private GameModel: GameModel;
    
    @property({type: Label})
    private timeLabel: Label;

    @property({type: Camera})
    private camera : Camera;

    @property({type: Node})
    private inputNode : Node;
    
    @property({type: Node})
    private testNode : Node;

    private totalTime: number = 50;
    private time: number;
    private birdArray: BirdController[] = [];
    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;

    protected start(): void {
        document.getElementById('Cocos3dGameContainer').style.cursor = 'none';

        this.schedule(function(){
            this.spawnBird();
        }, math.randomRangeInt(2, 4.5))  
        
        setTimeout(() => {
            this.time = this.totalTime;
            this.updateTimeLabel();
            this.schedule(function(){
                this.updateTime();
            }, 1)  
        },1500); 
    
        //hanlde audio
        var getVolumne = sys.localStorage.getItem('volume')

        if(getVolumne){
            this.variableVolumeArray = JSON.parse(getVolumne)
            localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))
        
        }
        else {
            this.audioController.playAudio();
            this.iconShow.node.active = true;
            this.iconOff.node.active = false;
        }
        
        this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1]
        if(this.convertVolume === 1){
            this.iconShow.node.active = true;
            this.iconOff.node.active = false;
            this.audioController.playAudio();
        }
        else if(this.convertVolume === 0) {
            this.iconShow.node.active = false;
            this.iconOff.node.active = true;
            this.audioController.pauseAudio();
        }
    }    

    protected onLoad() : void  {
        this.inputNode.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.inputNode.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.inputNode.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.inputNode.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);

        if(director.getScene().name == 'Play'){
            this.startGame();
        }

        this.anim.node.active = false;

        //audio
        const audioSrc = this.node.getComponent(AudioSource)
        this.GameModel.AudioBackGround = audioSrc;
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
        this.timeLabel.string = `Time: ` + this.time.toString();
    }

    protected onTimeUp() : void {
        this.inputNode.off(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.inputNode.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.inputNode.off(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.inputNode.off(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);

        this.result.showResult();
        document.getElementById('Cocos3dGameContainer').style.cursor = '';
        this.GameModel.BirdContain.active = false;
        this.testNode.active = false;
        this.timeLabel.string = '';
        this.score.hideScore();
        this.GameModel.TimeBoard.active = false;
        this.GameModel.ScoreBoard.active = false;
        this.iconShow.node.active = false;
        this.iconOff.node.active = false;
        this.pause.node.active = false;
    }

    protected spawnBird(): void {
        const birdNode = instantiate(this.GameModel.BirdPrefab).getComponent(BirdController);
        birdNode.Initialized(this.GameModel.BirdContain);
        this.birdArray.push(birdNode);
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
            this.anim.node.position = birdPosition.clone();      
            if (cameraPos.x >= birdPosition.x - 60 
                && cameraPos.x <= birdPosition.x + 60 
                && cameraPos.y >= birdPosition.y - 40 
                && cameraPos.y <= birdPosition.y + 40) {
                    if(this.pause.playIcon.active === false){
                        destroyBirdIndex = i;
                        if (this.anim) {
                            this.anim.node.active = true;
                            this.anim.play();
                        }
                        break;
                    }
                }
            }
        if (destroyBirdIndex >= 0) {
            this.score.addScore();
            this.birdArray[destroyBirdIndex].node.destroy()
            this.birdArray.splice(destroyBirdIndex, 1);
        }
    }    

    protected onAudio(): void {
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.iconShow.node.active = true;
        this.iconOff.node.active = false;
        this.audioController.playAudio();
    }

    protected offAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.iconShow.node.active = false;
        this.iconOff.node.active = true;
        this.audioController.pauseAudio();
    }

    onClickIconPause(){
        let opacityBtnOff = this.iconOff.getComponent(UIOpacity)
        let opacityBtnOn = this.iconShow.getComponent(UIOpacity)
        
        this.pause.IsPause = !this.pause.IsPause;
        if(this.pause.IsPause){
            this.iconOff.interactable = false;
            this.iconShow.interactable = false;
            opacityBtnOff.opacity = 0;
            opacityBtnOn.opacity = 0;
            director.pause();
        } else {
            director.resume();
            this.iconOff.interactable = true;
            this.iconShow.interactable = true;
            opacityBtnOff.opacity = 255;
            opacityBtnOn.opacity = 255;
        }
    }

    private onMouseMove(event: EventMouse) : void {
        const cursorPosition = event.getLocation();
        let mousePos = new Vec3(cursorPosition.x, cursorPosition.y , 0);
        let worldPos = v3();

        worldPos = this.camera.screenToWorld(mousePos, worldPos);
        this.testNode.worldPosition = worldPos;
    }

    private onMouseEnter(event: EventMouse) : void {
        this.testNode.active = true;
        document.getElementById('Cocos3dGameContainer').style.cursor = 'none';
    }

    private onMouseLeave(event: EventMouse) : void {
        this.testNode.active = false;
        document.getElementById('Cocos3dGameContainer').style.cursor = '';
    }
 
    private startGame() : void {
        director.resume();
    }
}


