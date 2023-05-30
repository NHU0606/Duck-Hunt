import { _decorator, Button, Component, director, EventMouse, Input, input, Node} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PauseController')
export class PauseController extends Component {
    private isIconPause: boolean = false;
    private isPause: boolean = false;

    @property(Node)
    public pauseIcon: Node = null;

    @property(Node)
    public playIcon: Node = null;

    protected onLoad(): void {
        this.playIcon.active = false;
        this.pauseIcon.active = true;
    }

    onClickIconPause(){
        this.isPause = !this.isPause;
        if(this.isPause){
            director.pause();
        } else {
            director.resume();
        }
    }

    onToggleButtonClicked() {
        this.isIconPause = !this.isIconPause;
        this.updateIcon();
    }

    updateIcon(){
        this.playIcon.active = this.isIconPause;
        this.pauseIcon.active = !this.isIconPause;
    }
}


