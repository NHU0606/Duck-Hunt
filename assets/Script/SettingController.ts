import { _decorator, Component, Node, Button, director, Sprite, sys, AudioSource } from 'cc';
import { SCENE_NAME } from './Data';
const { ccclass, property } = _decorator;

@ccclass('SettingController')
export class SettingController extends Component {
    @property({type: Button})
    private menuBtn: Button = null;

    @property({type: Button})
    private playBtn: Button = null;

    protected onLoad(): void {
        this.menuBtn.interactable = true;
        this.playBtn.interactable = true;
    }
    
    private onClickMenuBtn(){
        this.menuBtn.interactable = false;
        this.playBtn.interactable = false;
        director.loadScene(SCENE_NAME.Entry);
    }

    private onClickPlayBtn(){
        this.menuBtn.interactable = false;
        this.playBtn.interactable = false;
        director.loadScene(SCENE_NAME.Play);
    }
}


