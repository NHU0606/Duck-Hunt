import { GameModel } from './GameModel';
import { _decorator, AudioSource, Component, input, Input, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;

    public get IsMuted() : boolean {
        return this.isMuted;
    }
    
    public set IsMuted(isMuted : boolean) {
        this.isMuted = isMuted;
    } 
       
    @property(AudioSource)
    public audioBackground: AudioSource = null;

    @property(AudioSource)
    public audioShoot: AudioSource = null;

    @property({type: Sprite})
    private iconToShow: Sprite = null;    

    public get IconToShow() : Sprite {
        return this.iconToShow;
    }
    
    public set IconToShow(iconToShow : Sprite) {
        this.iconToShow = iconToShow;
    } 

    @property({type: Sprite})
    private iconToHide: Sprite = null;

    public get IconToHide() : Sprite {
        return this.iconToHide;
    }
    
    public set IconToHide(iconToHide : Sprite) {
        this.iconToHide = iconToHide;
    } 

    protected onLoad(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(){
        this.audioShoot.play();
    }
    
    onClickIcon () {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.audioBackground.volume = 0;
            this.audioShoot.volume = 0;
        } else {
            this.audioShoot.volume = 1;
            this.audioBackground.volume = 1;
        }               
    }  

    onToggleButtonClicked() {
        this.isIconShown = !this.isIconShown;
        this.updateIconsVisibility();
    }

    updateIconsVisibility() {
        this.iconToShow.node.active = this.isIconShown;
        this.iconToHide.node.active = !this.isIconShown;
    }

    playAudio() {
        this.audioShoot.volume = 1;
        this.audioBackground.volume = 1;

    }

    pauseAudio() {
        this.audioBackground.volume = 0;
        this.audioShoot.volume = 0;
    }    
}