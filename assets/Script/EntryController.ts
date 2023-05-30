import { _decorator, Component, Node, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    @property({type: Button})
    private startBtn: Button;

    @property({type: Button})
    private helpBtn: Button;

    @property({type: Button})
    private playBtn: Button;
    
    @property({type: Button})
    private menuBtn: Button;

    onclickBtnStart(){
        director.loadScene('Play')
    }

    onclickBtnHelp(){
        director.loadScene('Help')
    }

    onclickBtnPlay(){
        director.loadScene('Play')
    }

    onclickBtnMenu(){
        director.loadScene('Entry')
    }
}


