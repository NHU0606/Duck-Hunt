import { _decorator, Component, director, find, Node, Sprite } from "cc";
import GameClient from "@onechaintech/gamesdk-beta";
import { StoreAPI } from "./StoreAPI";
import { Data, SCENE_NAME } from "./Data";
const { ccclass, property } = _decorator;

@ccclass("LoadingController")
export class LoadingController extends Component {
  public userIdBirdHunter: string;
  public gameClient;
  public userId: string;

  private readonly gameID: string = "64d1b49d1523bbbaab295f07";
  private readonly apiKey: string = "d111636d-b164-4f88-81db-95470da79316";

  public async start(): Promise<void> {
    let parameters = find(Data.Node_GameClient.GameClient);

    if (parameters === null) {
      let parameters = new Node(Data.Node_GameClient.GameClient);

      if (this.gameClient === undefined) {
        this.gameClient = new GameClient(
          this.gameID,
          this.apiKey,
          window.parent,
          { dev: true }
        );
        await this.gameClient
          .initAsync()
          .then(() => {
            let userID = this.gameClient.user.citizen.getSaId();
            try {
              if (!localStorage.getItem("userId")) {
                localStorage.clear();
                localStorage.setItem("userId", userID);
              } else {
                if (localStorage.getItem("userId") !== userID) {
                  localStorage.clear();
                }
                localStorage.setItem("userId", userID);
              }
            } catch (error) {
            }
          })
          .catch((err) => console.log(err));
      }
      
      let gameClientParams = parameters.addComponent(StoreAPI);
      gameClientParams.gameClient = this.gameClient;
      director.addPersistRootNode(parameters);
    }
      director.loadScene(SCENE_NAME.Entry);
  }
}
