import { Data, SCENE_NAME } from './Data';
import { GameModel } from './GameModel';
import { _decorator, AudioSource, Component, director, input, Input, Node, Sprite, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;
    private variableVolumeArray: number[] = [];
    private variableVolume: number;
    private convertVolume: number;
       
    @property(AudioSource)
    public audioBackground: AudioSource = null;

    @property(AudioSource)
    public audioShoot: AudioSource = null;

    @property({type: Sprite})
    private iconToShow: Sprite = null;    

    @property({type: Sprite})
    private iconToHide: Sprite = null;

    protected onLoad(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected start(): void {
        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;

        try {
            var getVolumne = sys.localStorage.getItem(Data.sound);

            if (getVolumne) {
                this.variableVolumeArray = JSON.parse(getVolumne);
                localStorage.setItem(Data.sound, JSON.stringify(this.variableVolumeArray));
                this.convertVolume =  this.variableVolumeArray[this.variableVolumeArray.length - 1];

                if (this.convertVolume === 1) {
                    this.onAudio();
                    
                } else if ( this.convertVolume === 0 ) {
                    this.offAudio();
                }
            }
            else {
                if(Data.soundStatic === 1) {
                    this.onAudio();
                } else if (Data.soundStatic === 0 ) {
                    this.offAudio();
                }
            }
        } catch (error) {
            if(Data.soundStatic === 1) {
                this.onAudio();
            } else if (Data.soundStatic === 0 ) {
                this.offAudio();
                
            }
        }
    }

    protected onAudio(): void {
        const currentScene = director.getScene()?.name || '';

        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;
        this.variableVolume = 1;
        this.audioBackground.play();
        this.variableVolumeArray.push(this.variableVolume)

        try {
            sys.localStorage.setItem(Data.sound, JSON.stringify(this.variableVolumeArray));
            Data.soundStatic = 1;
        } catch (error) {
            Data.soundStatic = 1;
        }

        this.audioBackground.volume = 1;
        this.audioShoot.volume = 1;
    }

    protected offAudio(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;

        this.variableVolume = 0;
        this.audioBackground.pause();
        this.variableVolumeArray.push(this.variableVolume);

        try {
            sys.localStorage.setItem(Data.sound, JSON.stringify(this.variableVolumeArray));
            Data.soundStatic = 0;
        } catch (error) {
            Data.soundStatic = 0;
        }

        this.audioBackground.volume = 0;
        this.audioShoot.volume = 0;
    }

    onTouchStart(){
        this.audioShoot.play();
    }
    
    onClickIcon () {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            Data.soundStatic = 0;
            this.audioBackground.volume = 0;
            this.audioShoot.volume = 0;
        } else {
            Data.soundStatic = 1;
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
}