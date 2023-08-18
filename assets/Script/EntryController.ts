import { _decorator, Component, Node, Button, director, AudioSource, Sprite, input, Input, sys, find, error } from 'cc';
import { StoreAPI } from "./StoreAPI";
import { Data, SCENE_NAME } from './Data';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;

    @property({type: Button})
    private playBtn: Button;

    @property({type: Button})
    private settingBtn: Button;

    @property(AudioSource)
    public audioBackground: AudioSource = null;

    @property({type: Sprite})
    private iconToShow: Sprite = null;    

    @property({type: Sprite})
    private iconToHide: Sprite = null;

    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;

    public gameClient;
    public matchId: string;

    protected onLoad(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
    }

    protected start(): void {
        this.playBtn.interactable = true;
        this.settingBtn.interactable = true;

        try {
            if(!localStorage.getItem(Data.highscore)) {
                localStorage.setItem(Data.highscore, '0')
            } 
        } catch (error) {
            if ( Data.highScoreStatic === null ) Data.highScoreStatic = 0;
        }

        try {
            var getVolumne = sys.localStorage.getItem(Data.sound)
    
            if(getVolumne){
                this.variableVolumeArray = JSON.parse(getVolumne)
                this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1]
                localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))
            }
            else {
                if(Data.soundStatic === 1){
                    this.onAudio();
                }
                else if (Data.soundStatic === 0){
                    this.offAudio();
                }
            }
            this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1]
            if(this.convertVolume === 1){
               this.onAudio();
            }
            else if(this.convertVolume === 0) {
               this.offAudio();
            }
        } catch (error) {
            if(Data.soundStatic === 1){
                this.onAudio();
            }
            else if (Data.soundStatic === 0){
                this.offAudio();
            }
        }
    }

    protected onAudio(): void {
        this.variableVolume = 1;
        this.audioBackground.play();
        this.variableVolumeArray.push(this.variableVolume)

        try{
            sys.localStorage.setItem(Data.sound, JSON.stringify(this.variableVolumeArray));
        }
        catch(error){
            Data.soundStatic = 1;
        }
        this.audioBackground.volume = 1;
    }

    protected offAudio(): void {
        this.variableVolume = 0;
        this.audioBackground.pause();
        this.variableVolumeArray.push(this.variableVolume)

        try{
            sys.localStorage.setItem(Data.sound, JSON.stringify(this.variableVolumeArray));
        }
        catch(error){
            Data.soundStatic = 0;
        }

        this.audioBackground.volume = 0;

    }

    private async onclickBtnPlay(): Promise<void>{
        this.playBtn.interactable = false;
        this.settingBtn.interactable = false;
        let _this= this;
        let param = find("GameClient");
        let gameClientParams = param.getComponent(StoreAPI);
        this.gameClient = gameClientParams.gameClient;

        await gameClientParams.gameClient.match
            .startMatch()
            .then((data) => {
                _this.matchId = data.matchId;
            })
            .catch((error) => console.log(error))

        gameClientParams.matchId = _this.matchId;
        director.loadScene(SCENE_NAME.Play);
    }

    private onclickBtnSetting(){
        this.settingBtn.interactable = false;
        this.playBtn.interactable = false;
        director.loadScene(SCENE_NAME.Setting);
    }
    
    private onClickIcon () {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            Data.soundStatic = 0;
            this.audioBackground.volume = 0;
        } else {
            Data.soundStatic = 1;
            this.audioBackground.volume = 1;
        }               
    }  

    private onToggleButtonClicked() {
        this.isIconShown = !this.isIconShown;
        this.updateIconsVisibility();
    }

    private updateIconsVisibility() {
        this.iconToShow.node.active = this.isIconShown;
        this.iconToHide.node.active = !this.isIconShown;
    }
}


