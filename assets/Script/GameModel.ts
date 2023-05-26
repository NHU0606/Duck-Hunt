import { _decorator, Component, ImageAsset, instantiate, Node, Prefab, Sprite, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({ type: Prefab })
    private birdPrefab: Prefab = null;

    @property({type:Node})
    private birdContain: Node;

    @property({type: Sprite})
    private mousePointer: Sprite = null;
    
    public get BirdPrefab() : Prefab {
        return this.birdPrefab;
    }
    
    public set BirdPrefab(birdPrefab : Prefab) {
        this.birdPrefab = birdPrefab;
    }

    public get BirdContain() : Node {
        return this.birdContain;
    }
    
    public set BirdContain(birdContain : Node) {
        this.birdContain = birdContain;
    }
    
    public get MousePointer() : Sprite {
        return this.mousePointer
    }
    
    public set MousePointer(mousePointer : Sprite) {
        this.mousePointer = mousePointer;
    }
}




