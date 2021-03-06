import * as PIXI from 'pixi.js';
import {Blob} from "./Blob";
import Task from "./Task";
import GameField from "./GameField";
import {taskTextStyle, bigNumberTextStyle} from "./constants";
import {GAME_MATRIX_SIZE, GAME_MATRIX_SPACING} from "./constants";

export default class Level extends PIXI.Container{
    constructor(levelWidth, levelHeight) {
        super();
        this.resources = PIXI.Loader.shared.resources;

        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
        this.spriteTextures = this.resources["./src/images/atlas.json"].textures;

    }

    init(dataStorage) {
        //Создание панели с тасками
        this.blobTask1 = new Blob(dataStorage.task1Color);
        this.blobTask2 = new Blob(dataStorage.task2Color);

        this.panel = new PIXI.Sprite(this.spriteTextures["panel.png"]);
        this.panel.position.set(this.levelWidth / 2 - this.panel.width / 2, 10);
        this.addChild(this.panel);

        this.done = new PIXI.Sprite(this.spriteTextures["done.png"]);
        this.done.anchor.set(0.5);
        this.done.visible = dataStorage.currentTaskCount1 >= dataStorage.maxCountTask1;


        this.done1 = new PIXI.Sprite(this.spriteTextures["done.png"]);
        this.done1.anchor.set(0.5);
        this.done1.visible = dataStorage.currentTaskCount2 >= dataStorage.maxCountTask2;

        this.task1 = new Task(this.blobTask1, dataStorage.currentTaskCount1,
            dataStorage.maxCountTask1, taskTextStyle);
        this.task2 = new Task(this.blobTask2, dataStorage.currentTaskCount2,
            dataStorage.maxCountTask2, taskTextStyle);
        this.panel.addChild(this.task1);
        this.panel.addChild(this.task2);

       this.task1.position.set(55, 25);
       this.task2.position.set(this.panel.width - 55, 25);

       game.level.panel.children[0].children[0].addChild(this.done);
       game.level.panel.children[1].children[0].addChild(this.done1);

        //Создание панели уровня
        this.levelPanel = new PIXI.Sprite(this.spriteTextures["steps.png"]);
        this.levelPanel.position.set(this.levelWidth - 150 - this.levelPanel.width,
            this.levelHeight - this.levelPanel.height - 50);
        this.addChild(this.levelPanel);

        let levelNumberMessage = new PIXI.Text(`${dataStorage.currentLevel}`, bigNumberTextStyle);
        let levelMessage = new PIXI.Text("уровень", taskTextStyle);

        this.levelPanel.addChild(levelNumberMessage);
        levelNumberMessage.position.set(this.levelPanel.width / 2 - levelNumberMessage.width / 2, 5);
        this.levelPanel.addChild(levelMessage);
        levelMessage.position.set(this.levelPanel.width / 2 - levelMessage.width / 2,
            this.levelPanel.height - levelMessage.height - 15);


        //Создание панели ходов
        this.stepsPanel = new PIXI.Sprite(this.spriteTextures["steps.png"]);
        this.stepsPanel.position.set(this.panel.x - this.stepsPanel.width - 150, 10);
        this.addChild(this.stepsPanel);

        let stepsNumberMessage = new PIXI.Text(`${dataStorage.currentStep}`, bigNumberTextStyle);
        let stepsMessage = new PIXI.Text("ходов", taskTextStyle);

        this.stepsPanel.addChild(stepsNumberMessage);
        stepsNumberMessage.position.set(this.stepsPanel.width / 2
            - stepsNumberMessage.width / 2, 5);
        this.stepsPanel.addChild(stepsMessage);
        stepsMessage.position.set(this.stepsPanel.width / 2 - stepsMessage.width / 2,
            this.stepsPanel.height - stepsMessage.height - 15);


        //Создание игрового поля
        this.gameField = new GameField(GAME_MATRIX_SPACING, GAME_MATRIX_SIZE);
        this.gameField.init();
        this.addChild(this.gameField);
        this.gameField.x = (this.levelWidth / 2) - (this.gameField.width / 2) +
            (this.gameField.children[0].width / 2);
        this.gameField.y = (this.levelHeight / 2) - (this.gameField.height / 2);
    }
}