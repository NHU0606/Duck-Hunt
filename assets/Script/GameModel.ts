import { _decorator, Component, ImageAsset, instantiate, Node, Prefab, Sprite, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({ type: Prefab })
    private birdPrefab: Prefab = null;

    @property({type:Node})
    private birdContain: Node; 

   
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
}




