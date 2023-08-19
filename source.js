function P() {
    //#region Events
    const OnBallClick = new Event("OnBallClick");
    const OnBombClick = new Event("OnBombClick");
    const OnGemClick = new Event("OnGemClick");
    const OnUpdateUI = new Event("OnUpdateUI");
    const OnGameStop = new Event("OnGameStop");
    const OnGameStart = new Event("OnGameStart");
    const OnGameInteract = new Event("OnGameInteract");
    const OnSoundOn = new Event("OnSoundOn");
    const OnSoundOff = new Event("OnSoundOff");
    const OnNewSmileSound = new Event("OnNewSmileSound");
    //#endregion

    //#region Data
    window.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            Howler.mute(true);
            isGameHidden = true;
        }
        else {
            if (soundState && !isGameStopped) {
                Howler.mute(false);
                isGameHidden = false;
            }
        }
    });


    function SetSdk()
    {
        SetRu();


        vkBridge.subscribe((e) => {
            if (e.detail.type === 'VKWebAppViewHide') {
                Howler.mute(true);
                isGameHidden = true;
            }
        });

        vkBridge.subscribe((e) => {
            if (e.detail.type === 'VKWebAppViewRestore') {
                if (soundState && !isGameStopped) {
                    Howler.mute(false);
                    isGameHidden = false;
                }
            }
        });

    }

    let stringAdWillBeStartedAfter = '';
    let stringNewSmile = '';
    let stringReset = '';
    let stringReset1 = '';
    let stringYes = '';
    let stringNo = '';
    let upgrateTo = '';
    let forClick = '';
    let randomSmileString = '';
    let randomAttentionString = '';
    let emodjiString = '';
    let collectString = '';
    let crystalString = '';
    let ballQuestProgressString = '';


    function SetRu() {
        stringAdWillBeStartedAfter = 'Реклама будет запущена после ';
        stringNewSmile = 'Новый смайл за: ';
        stringReset = 'Начать заново!';
        stringReset1 = 'Прогресс игры будет стерт! Вы уверены?';
        stringYes = 'Да!';
        stringNo = 'Нет!';
        upgrateTo = 'Улучшить до +';
        forClick = '/клик за ';
        randomSmileString = 'Новый смайл или предыдущий за ';
        randomAttentionString = 'Смайлы выбираются случайно!';
        emodjiString = 'смайл: ';
        collectString = 'Собрать ';
        crystalString = ' кристаллов!';
        ballQuestProgressString = 'Открыть смайл номер: '
    }






    let maxBallNumber = 90;

    let ballNumber;
    let score;
    let cost;
    let clickCost;
    let upgrateClickCost;
    let totalMoney;
    let crystalNumber;
    let questCost;
    let ballQuestProgress;

    let isLocalStorageAvialable = false;


    Load();


    function Save() {
        if (isLocalStorageAvialable) {
            let saveObjectTemp = {
                s: score,
                bN: ballNumber,
                c: cost,
                cc: clickCost,
                ucc: upgrateClickCost,
                tm: totalMoney,
                cn: crystalNumber,
                qc: questCost,
                bqp: ballQuestProgress
            };
            localStorage.setItem('t2', JSON.stringify(saveObjectTemp));
        }
    }

    function Load() {
        try {
            let test = 't';
            localStorage.setItem(test, test);
            localStorage.removeItem(test, test);
            isLocalStorageAvialable = true;
        } catch (e) {
            isLocalStorageAvialable = false;
        }


        if (isLocalStorageAvialable) {
            let lS = localStorage.getItem('t2');
            if (lS != null) {
                let obj = JSON.parse(lS);
                score = obj.s;
                ballNumber = obj.bN;
                cost = obj.c;
                clickCost = obj.cc;
                upgrateClickCost = obj.ucc;
                totalMoney = obj.tm;
                crystalNumber = obj.cn;
                questCost = obj.qc;
                ballQuestProgress = obj.bqp;
            }
            else {
                SetDefault();
            }
        }
        else {
            SetDefault();
        }
    }

    function Reset() {
        if (isLocalStorageAvialable) {
            localStorage.clear();
        }
        SetDefault();
    }

    function SetDefault() {
        score = 0;
        ballNumber = 0;
        cost = 5;
        clickCost = 3;
        upgrateClickCost = 9;
        totalMoney = 0;
        crystalNumber = 0;
        questCost = 3;
        ballQuestProgress = 2;
    }



    //#endregion

    //#region CreateScene  

    const designWidth = 2000;
    const designHeight = (9 / 16) * designWidth;
    let isGameStopped = true;
    let isGameHidden = false;
    let soundState = true;

    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });

    const styleNS = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: false,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });

    const styleBomb = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#f8173e'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: false,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });

    const ordinaryText = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: ['#f8f8f8']
    });

    const styleGold = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#fffd37', '#f4c430'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: false,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });



    let myRes = 1;
    if (window.devicePixelRatio > 1) {
        myRes = window.devicePixelRatio;
    }

    const ball = [new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite()];
    AddTextureBall();


    const app = new PIXI.Application(
    {
            resizeTo: window,
            background: '#1099bb',
            autoDensity: true,
            antialias: true,
            resolution: myRes
    });

    document.body.appendChild(app.view);

    


    function SpritePositionX(mySprite, x) {
        mySprite.x = 0.01 * x * document.body.clientWidth;
    }

    function SpritePositionY(mySprite, y) {
        mySprite.y = 0.01 * y * document.body.clientHeight;
    }


    function SpriteScale(mySprite, scale) {
        let aspect;
        if (document.body.clientWidth >= 1.15 * document.body.clientHeight) {
            aspect = scale * (document.body.clientHeight / designHeight);
        }
        else {
            aspect = 1.7 * scale * (document.body.clientWidth / designWidth);
        }
        mySprite.scale.x = aspect;
        mySprite.scale.y = aspect;
    }

    document.addEventListener("OnGameStop", () => {
        Howler.mute(true);
        isGameStopped = true;
    });

    document.addEventListener("OnGameStart", () => {
        if (!isFirstGame) {
            isGameStopped = false;
        }
        if (soundState) {
            Howler.mute(false);
        }
    });

    //#endregion

    //#region AddBalls

    const ballScale = 1.8;
    const initPositionY = -22;

    const effectContainer = new PIXI.Container();
    effectContainer.interactiveChildren = false;
    app.stage.addChild(effectContainer);

    let coordinatesX = [23, 50, 77];
    let coordinatesY = [35, 65, 35];

    let bombState = [0, 0, 0];


    ball[0].anchor.set(0, 0.5);
    ball[1].anchor.set(0.5, 0.5);
    ball[2].anchor.set(1, 0.5);

    


    window.addEventListener('resize', SetBallSprites);
    SetBallSprites();

    function CreateEffectText(i) {
        let effectText;

        let paintEffect = new PIXI.Sprite();
        let effectPaintScale = 2.6;
        let xEffectPaintPos = coordinatesX[i];
        let yEffectPaintPos = coordinatesY[i];
        paintEffect.texture = sheet.textures["paint.png"];
        paintEffect.alpha = 1;

        function SetPaintText() {
            SpriteScale(paintEffect, effectPaintScale);
            SpritePositionX(paintEffect, xEffectPaintPos);
            SpritePositionY(paintEffect, yEffectPaintPos);
        }
        SetPaintText();
        window.addEventListener('resize', SetPaintText);

        switch (bombState[i]) {
            case -1:
                effectText = new PIXI.Text('-' + clickCost * multipliyer, styleBomb);
                paintEffect.tint = 0xff8888;
                score -= clickCost * multipliyer;
                document.dispatchEvent(OnUpdateUI);
                Save();
                break;

            case 0:
                effectText = new PIXI.Text('+' + clickCost * multipliyer, style);
                score += clickCost * multipliyer;
                totalMoney += clickCost * multipliyer;
                document.dispatchEvent(OnUpdateUI);
                Save();
                break;

            case 1:
                effectText = new PIXI.Text('+' + 2 * clickCost * multipliyer, style);
                score += 2*clickCost * multipliyer;
                totalMoney += 2*clickCost * multipliyer;
                document.dispatchEvent(OnUpdateUI);
                crystalNumber++;
                UpdateTrophyText();
                Save();
                break;
            case 2:
                effectText = new PIXI.Text('+' + 3 * clickCost * multipliyer, style);
                score += 3*clickCost * multipliyer;
                totalMoney += 3*clickCost * multipliyer;
                document.dispatchEvent(OnUpdateUI);
                crystalNumber++;
                UpdateTrophyText();
                Save();
                break;
            default:
                break;
        }


        let effectTextScale = 6;
        let xEffectTextPos = coordinatesX[i];
        let yEffectTextPos = coordinatesY[i];

        if (i == 0) {
            effectText.anchor.set(0, 0.5);
            paintEffect.anchor.set(0, 0.5);
        }
        if (i == 1) {
            effectText.anchor.set(0.5, 0.5);
            paintEffect.anchor.set(0.5, 0.5);
        }
        if (i == 2) {
            effectText.anchor.set(1, 0.5);
            paintEffect.anchor.set(1, 0.5);
        }

        app.ticker.add(EffectText);
        effectContainer.addChild(paintEffect);
        effectContainer.addChild(effectText);
        

        function EffectText(delta) {
            if (!isGameStopped) {
                yEffectTextPos += 0.75 * delta;
                effectTextScale -= 0.067 * delta;
                if (effectTextScale <= 3.8) {
                    paintEffect.alpha -= 0.012 * delta;
                }
            }
            SpriteScale(effectText, effectTextScale);            
            SpritePositionX(effectText, xEffectTextPos);
            SpritePositionY(effectText, yEffectTextPos);

            if (effectTextScale <= 0.7) {                
                window.removeEventListener('resize', SetPaintText);
                effectContainer.removeChild(effectText);
                effectContainer.removeChild(paintEffect);
                effectText.destroy();
                app.ticker.remove(EffectText);
            }
        }
    }

    function AddTextureBall() {
        for (let i = 0; i < ball.length; i++) {
            ball[i].texture = PIXI.Texture.from('sprites/balls/ball' + ballNumber + '.png');
        }
    }

    function SetBallSprites() {
        for (let i = 0; i < ball.length; i++) {
            SpriteScale(ball[i], ballScale);
            SpritePositionX(ball[i], coordinatesX[i]);
            SpritePositionY(ball[i], coordinatesY[i]);
        }
    }
    //#endregion

    //#region Sound
    let isFirstLoad = true;





    document.addEventListener("OnSoundOff", () => {
        Howler.mute(true);
    });

    document.addEventListener("OnSoundOn", () => {
        Howler.mute(false);
    });

    var effect = new Howl({
        src: ['sounds/effect.mp3'],
        sprite: {
            soundNewSmile: [0, 134],
            soundClick: [153, 132],
            soundGem: [310, 540],
            bombSound: [924, 242]
        }
    });

    document.addEventListener("OnNewSmileSound", () => {
        effect.play('soundNewSmile');
    });

    document.addEventListener("OnBallClick", () => {
        effect.play('soundClick');
    });

    document.addEventListener("OnBombClick", () => {
        effect.play('bombSound');
    });

    document.addEventListener("OnGemClick", () => {
        effect.play('soundGem');
    });

    document.addEventListener("OnGameInteract", () => {
        if (isFirstLoad) {
            let sound = new Howl({
                src: ['sounds/back.mp3'],
                html5: true,
                loop: true,
                volume: 0.38
            });
            sound.play();
        }
        isFirstLoad = false;
    });
    //#endregion

    //#region AddUI
    const randomSmileCost = 500;

    let multipliyer = 1;

    let isMenuOpen = false;
    let isLuckOpen = false;
    let isTrophyOpen = false;
    let isTrophySmileOpen = false;
    let isOpen = false;

    let giftFill = 0;

    let isFirstGame = true;


    const spriteSheetName = "sprites/UI.json";
    const resetText = new PIXI.Text(stringReset, style);
    const resetPanel = new PIXI.Sprite();
    const resetButton = new PIXI.Sprite();
    const scoreText = new PIXI.Text('0', style);
    const spriteNumberText = new PIXI.Text('0', style);
    const spriteNumberText1 = new PIXI.Text('0', style);
    const spriteNumberText2 = new PIXI.Text('0', style);
    const newButton = new PIXI.Sprite();
    const newText = new PIXI.Text('', style);
    const menuButton = new PIXI.Sprite();
    const rewardText = new PIXI.Text('', style);
    const rewardButton = new PIXI.Sprite();
    const adWillBeShownTxt = new PIXI.Text('', style);
    const menuRect = new PIXI.Sprite();
    const soundButton = new PIXI.Sprite();
    const closeButton = new PIXI.Sprite();
    const closeButton1 = new PIXI.Sprite();
    const closeButtonTrophy = new PIXI.Sprite();
    const upgrateButton = new PIXI.Sprite();
    const randomSmileButton = new PIXI.Sprite();
    const randomSmileImage = new PIXI.Sprite();
    const upgrateText = new PIXI.Text('', style);
    const resetText1 = new PIXI.Text('', style);
    const yesButton = new PIXI.Sprite();
    const yesText = new PIXI.Text('', style);
    const noButton = new PIXI.Sprite();
    const noText = new PIXI.Text('', style);
    const adsContainer = new PIXI.Container();
    const menuCircle = new PIXI.Graphics();
    const luckCircle = new PIXI.Graphics();
    const luckButton = new PIXI.Sprite();
    const randomSmileText = new PIXI.Text('', style);
    const randomSmileAttentionText = new PIXI.Text('', styleBomb);
    const giftButton = new PIXI.Sprite();
    const giftCircle = new PIXI.Graphics();
    const giftText = new PIXI.Text('', style);
    const giftAttentionText = new PIXI.Text('', styleGold);

    const trophyCircle = new PIXI.Graphics();
    const trophyRect = new PIXI.Sprite();
    const trophyButton = new PIXI.Sprite();
    const trophyText = new PIXI.Text('', style);
    const obtainTrophyButton = new PIXI.Sprite();
    const questButtonText = new PIXI.Text('', style);


    const trophySmileCircle = new PIXI.Graphics();
    const trophySmileButton = new PIXI.Sprite();
    const closeButtonTrophySmile = new PIXI.Sprite();
    const trophySmileRect = new PIXI.Sprite();
    const obtainTrophySmileButton = new PIXI.Sprite();
    const questButtonSmileText = new PIXI.Text('', style);
    const trophySmileText = new PIXI.Text('', styleNS);

    const startMenuRect = new PIXI.Sprite();
    const closeStartMenuRect = new PIXI.Sprite();
    const soundButton1 = new PIXI.Sprite();
    const shareButton = new PIXI.Sprite();
    const playButton = new PIXI.Sprite();

    const buttonContainer = new PIXI.Container();



    function CrystalQuestCost() {
        return 20 * Math.round(0.5 * questCost) * Math.round(1 + 0.08 * questCost) + Math.round(0.15 * cost);
    }


    function NewCost() {
        if (ballNumber <= 5) {
            return Math.round(1.45 * cost);
        }
        else
        {
            if (ballNumber <= 15)
            {
                return Math.round(1.4 * cost);
            }
            else
            {
                if (ballNumber <= 28)
                {
                    return Math.round(1.3 * cost);
                }
                else
                {
                    if (ballNumber <= 60) {
                        return Math.round(1.15 * cost);
                    }
                    else
                    {
                        return Math.round(1.12 * cost);
                    }
                }
            }
        }
    }

    function UpdateTrophyText() {
        if (crystalNumber >= questCost) {
            trophyButton.addChild(trophyCircle);
            obtainTrophyButton.alpha = 1;
        } else {
            trophyButton.removeChild(trophyCircle);
            obtainTrophyButton.alpha = 0.4;
        }
        trophyText.text = collectString + crystalNumber + '/' + questCost + crystalString;
    }

    function SmileTrophyBonus() {
        return 10 * Math.round(1 + 0.3 * ballQuestProgress) * Math.round(1 + 0.005 * ballQuestProgress * ballQuestProgress * ballQuestProgress);
    }

    function UpdateTrophySmile() {        
        if (ballQuestProgress <= ballNumber) {
            trophySmileButton.addChild(trophySmileCircle);
            obtainTrophySmileButton.alpha = 1;
        } else {
            trophySmileButton.removeChild(trophySmileCircle);
            obtainTrophySmileButton.alpha = 0.4;
        }
        
        questButtonSmileText.text = '+' + SmileTrophyBonus();

        trophySmileText.text = ballQuestProgressString + (ballQuestProgress%90 + 1);
    }

    function UpdateUpgrateText() {
        let newClickCost = clickCost + 1;
        upgrateText.text = upgrateTo + newClickCost + forClick + upgrateClickCost + '.';
    }

    function UpdateRandomSmileText() {
        randomSmileText.text = randomSmileString + randomSmileCost + '!';
    }

    function SetRandomSmileImage() {
        randomSmileImage.texture = PIXI.Texture.from('sprites/balls/ball' + ballNumber + '.png');
    }

    function UpdateGiftCircle() {
        giftCircle.clear();
        giftCircle.beginFill(0xfddb53, 0.8);
        giftCircle.arc(-65, -62, 58, -0.5 * Math.PI - (1 / 15) * Math.PI * giftFill, -0.5 * Math.PI);
        giftCircle.lineTo(-65, -62);
        giftCircle.endFill();
        if (giftFill != 0) {
            giftText.text = '' + giftFill.toFixed(1);
        }
        else {
            giftText.text = '';
        }
    }

    let adsSquare = new PIXI.Graphics();
    adsSquare.beginFill(0x133467, 0.82);
    adsSquare.drawRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    adsSquare.endFill();
    adsSquare.eventMode = 'static';




    adWillBeShownTxt.anchor.set(0.5, 0.5);
    function myResizeAdWillBeShownTxt() {
        SpriteScale(adWillBeShownTxt, 2.48);
        SpritePositionX(adWillBeShownTxt, 50);
        SpritePositionY(adWillBeShownTxt, 50);
    }


    function SetLanguage() {
        resetText.text = stringReset;
        resetText1.text = stringReset1;
        yesText.text = stringYes;
        noText.text = stringNo;
        randomSmileAttentionText.text = randomAttentionString;
        UpdateUpgrateText();
        document.dispatchEvent(OnUpdateUI);
        UpdateRandomSmileText();
        UpdateTrophyText();
        UpdateTrophySmile();
    }


    if (isYSDK) {
        SetSdk();
        SetLanguage();
    }
    else {
        document.addEventListener("OnYSDKInit", () => {            
            if (!isLocalStorageAvialable) {
                Load();
            }
            SetSdk();
            SetLanguage();
        });
    }

    adsContainer.addChild(adsSquare);
    adsContainer.addChild(adWillBeShownTxt);




    PIXI.Assets.load([
        spriteSheetName
    ]).then((textures) => {
        sheet = textures[spriteSheetName];

        app.stage.addChild(ball[0]);
        app.stage.addChild(ball[1]);
        app.stage.addChild(ball[2]);

        

        giftButton.texture = sheet.textures["gift.png"];
        giftButton.anchor.set(1, 1);
        function myResizeGiftButton() {
            SpriteScale(giftButton, 2)
            SpritePositionX(giftButton, 99.6);
            SpritePositionY(giftButton, 68);
        }
        giftButton.eventMode = 'static';
        giftButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);

            if (giftFill <= 0) {
                giftFill = 30;
                UpdateGiftCircle();
                let giftAmount = 50 + Math.round(0.28*cost);
                score += giftAmount;
                Save();
                document.dispatchEvent(OnGemClick);
                document.dispatchEvent(OnUpdateUI);
                
                giftAttentionText.x = -175;
                giftAttentionText.y = 120;
                giftAttentionText.scale.x = 1.45;
                giftAttentionText.scale.y = 1.45;
                giftAttentionText.text = '+' + giftAmount;
                scoreText.addChild(giftAttentionText);
                app.ticker.add(GiftTextEffectTimer);
                app.ticker.add(TimerOneSec);
            }
            else {
                document.dispatchEvent(OnNewSmileSound);
            }
        });
        buttonContainer.addChild(giftButton);



        giftText.anchor.set(0.5, 0.5);
        giftText.x = -65;
        giftText.y = -57;
        giftText.scale.x = 1.2;
        giftText.scale.y = 1.2;
        giftCircle.addChild(giftText);

        giftButton.addChild(giftCircle);



        trophyRect.texture = sheet.textures["box_menu.png"];
        trophyRect.anchor.set(0.5, 0.5);
        trophyRect.tint = 0xe4e4e4;
        function myResizeTrophyRect() {
            SpriteScale(trophyRect, 1.98)
            SpritePositionX(trophyRect, 50);
            SpritePositionY(trophyRect, 51);
        }
        trophyRect.eventMode = 'static';

        closeButtonTrophy.texture = sheet.textures["close.png"];
        closeButtonTrophy.anchor.set(1, 1);
        closeButtonTrophy.x = 280;
        closeButtonTrophy.y = -138;
        closeButtonTrophy.scale.x = 0.66;
        closeButtonTrophy.scale.y = 0.66;
        closeButtonTrophy.eventMode = 'static';
        closeButtonTrophy.on('pointerdown', function () {
            isTrophyOpen = !isTrophyOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;

            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }

            if (isTrophyOpen) {
                app.stage.addChild(trophyRect);
                
            }
            else {
                app.stage.removeChild(trophyRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });
        trophyRect.addChild(closeButtonTrophy);

        trophyText.anchor.set(0.5, 1);
        trophyText.x = 0;
        trophyText.y = 145;
        trophyText.scale.x = 1;
        trophyText.scale.y = 1;
        trophyRect.addChild(trophyText);

        
        obtainTrophyButton.texture = sheet.textures["redButton.png"];
        obtainTrophyButton.anchor.set(0.5, 0);
        obtainTrophyButton.x = 0;
        obtainTrophyButton.y = -115;
        obtainTrophyButton.height = 114;
        obtainTrophyButton.width = 400;
        obtainTrophyButton.eventMode = 'static';
        obtainTrophyButton.on('pointerdown', function () {
            if (crystalNumber >= questCost) {               
                crystalNumber -= questCost;                
                score += CrystalQuestCost();
                if (questCost <= 30) {
                    questCost += 4;
                }
                questButtonText.text = '+' + CrystalQuestCost();
                
                Save();
                document.dispatchEvent(OnGemClick);
                UpdateTrophyText();
                document.dispatchEvent(OnUpdateUI);

            }
        });
        trophyRect.addChild(obtainTrophyButton);

        questButtonText.text = '+' + CrystalQuestCost();
        questButtonText.anchor.set(0.5, 0.5);
        questButtonText.x = 0;
        questButtonText.y = 59;
        questButtonText.scale.x = 0.75;
        questButtonText.scale.y = 0.75;
        obtainTrophyButton.addChild(questButtonText);

        trophyButton.texture = sheet.textures["trophy.png"];
        trophyButton.anchor.set(1, 1);
        function myResizeTrophyButton() {
            SpriteScale(trophyButton, 1.6)
            SpritePositionX(trophyButton, 98.3);
            SpritePositionY(trophyButton, 38);
        }
        trophyButton.eventMode = 'static';
        trophyButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);
            isTrophyOpen = !isTrophyOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;

            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }


            if (isTrophyOpen) {
                app.stage.addChild(trophyRect);
                
            }
            else {
                app.stage.removeChild(trophyRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });


        trophyCircle.beginFill(0xcc0033, 1);
        trophyCircle.drawCircle(-27, -100, 32);
        trophyCircle.endFill();


        trophyCircleText = new PIXI.Text('!', ordinaryText);
        trophyCircleText.anchor.set(0.5, 0.5);
        trophyCircleText.x = -27;
        trophyCircleText.y = -100;
        trophyCircleText.scale.x = 1.7;
        trophyCircleText.scale.y = 1.7;
        trophyCircle.addChild(trophyCircleText);

        buttonContainer.addChild(trophyButton);

        




        scoreText.anchor.set(1, 0);
        function myResizeText() {
            SpriteScale(scoreText, 3.8)
            SpritePositionX(scoreText, 98.5);
            SpritePositionY(scoreText, 0);
        }
        app.stage.addChild(scoreText);
        giftAttentionText.anchor.set(0.5, 0.5);






        trophySmileRect.texture = sheet.textures["box_menu.png"];
        trophySmileRect.anchor.set(0.5, 0.5);
        trophySmileRect.tint = 0xe4e4e4;
        function myResizeSmileTrophyRect() {
            SpriteScale(trophySmileRect, 1.98)
            SpritePositionX(trophySmileRect, 50);
            SpritePositionY(trophySmileRect, 51);
        }
        trophyRect.eventMode = 'static';

        closeButtonTrophySmile.texture = sheet.textures["close.png"];
        closeButtonTrophySmile.anchor.set(1, 1);
        closeButtonTrophySmile.x = 280;
        closeButtonTrophySmile.y = -138;
        closeButtonTrophySmile.scale.x = 0.66;
        closeButtonTrophySmile.scale.y = 0.66;
        closeButtonTrophySmile.eventMode = 'static';
        closeButtonTrophySmile.on('pointerdown', function () {
            isTrophySmileOpen = !isTrophySmileOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;


            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }


            if (isTrophySmileOpen) {
                app.stage.addChild(trophySmileRect);
                
            }
            else {
                app.stage.removeChild(trophySmileRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });
        trophySmileRect.addChild(closeButtonTrophySmile);



        obtainTrophySmileButton.texture = sheet.textures["redButton.png"];
        obtainTrophySmileButton.anchor.set(0.5, 0);
        obtainTrophySmileButton.x = 0;
        obtainTrophySmileButton.y = -45;
        obtainTrophySmileButton.height = 114;
        obtainTrophySmileButton.width = 400;
        obtainTrophySmileButton.eventMode = 'static';
        obtainTrophySmileButton.on('pointerdown', function () {
            if (ballQuestProgress <= ballNumber) {

                
                if (ballQuestProgress <= 30)
                {
                    ballQuestProgress += 6;
                }
                else
                {
                    if (ballQuestProgress <= 70)
                    {
                        ballQuestProgress += 2;
                    }
                    else
                    {
                        if (ballQuestProgress <= 89)
                        {
                            ballQuestProgress += 1;
                        }
                    }
                    
                }
                score += SmileTrophyBonus();
                

                Save();
                document.dispatchEvent(OnGemClick);
                UpdateTrophySmile();
                document.dispatchEvent(OnUpdateUI);

            }
        });
        trophySmileRect.addChild(obtainTrophySmileButton);

        questButtonSmileText.text = '+' + SmileTrophyBonus();
        questButtonSmileText.anchor.set(0.5, 0.5);
        questButtonSmileText.x = 0;
        questButtonSmileText.y = 59;
        questButtonSmileText.scale.x = 0.75;
        questButtonSmileText.scale.y = 0.75;
        obtainTrophySmileButton.addChild(questButtonSmileText);

        trophySmileText.anchor.set(0.5, 1);
        trophySmileText.x = 0;
        trophySmileText.y = 149;
        trophySmileText.scale.x = 0.9;
        trophySmileText.scale.y = 0.9;
        trophySmileRect.addChild(trophySmileText);

        spriteNumberText2.anchor.set(0.5, 0.5);
        spriteNumberText2.x = -2;
        spriteNumberText2.y = -120;
        spriteNumberText2.scale.x = 1.1;
        spriteNumberText2.scale.y = 1.1;
        trophySmileRect.addChild(spriteNumberText2);


        
        trophySmileButton.texture = sheet.textures["trophy.png"];
        trophySmileButton.anchor.set(0, 1);
        function myResizeTrophySmileButton() {
            SpriteScale(trophySmileButton, 1.6)
            SpritePositionX(trophySmileButton, 1.6);
            SpritePositionY(trophySmileButton, 38);
        }
        trophySmileButton.eventMode = 'static';
        trophySmileButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);
            isTrophySmileOpen = !isTrophySmileOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;


            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }


            if (isTrophySmileOpen) {
                app.stage.addChild(trophySmileRect);
                
            }
            else {
                app.stage.removeChild(trophySmileRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });


        trophySmileCircle.beginFill(0xcc0033, 1);
        trophySmileCircle.drawCircle(117, -100, 32);
        trophySmileCircle.endFill();


        trophySmileCircleText = new PIXI.Text('!', ordinaryText);
        trophySmileCircleText.anchor.set(0.5, 0.5);
        trophySmileCircleText.x = 117;
        trophySmileCircleText.y = -100;
        trophySmileCircleText.scale.x = 1.7;
        trophySmileCircleText.scale.y = 1.7;
        trophySmileCircle.addChild(trophySmileCircleText);
       
        buttonContainer.addChild(trophySmileButton);



        spriteNumberText.anchor.set(0, 1);
        spriteNumberText.x = -10;
        spriteNumberText.y = 18;
        spriteNumberText.scale.x = 0.68;
        spriteNumberText.scale.y = 0.68;
        trophySmileButton.addChild(spriteNumberText);


        newButton.texture = sheet.textures["redButton.png"];
        newButton.anchor.set(0, 0);
        function myResizeNewButton() {
            SpriteScale(newButton, 1.4)
            SpritePositionX(newButton, 1.5);
            SpritePositionY(newButton, 0.2);
        }
        newButton.eventMode = 'static';
        newButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);
            if (score >= cost) {
                score -= cost;
                ballNumber++;
                ballNumber = ballNumber % maxBallNumber;
                bombState[0] = 0;
                bombState[1] = 0;
                bombState[2] = 0;
                AddTextureBall(ball, ballNumber);
                cost = NewCost();
                SetRandomSmileImage();
                document.dispatchEvent(OnUpdateUI);
                document.dispatchEvent(OnNewSmileSound);
                UpdateTrophySmile();
                Save();
            }
        });
        app.stage.addChild(newButton);




        newText.anchor.set(0.5, 0.5);
        newText.x = 201;
        newText.y = 58;
        newText.scale.x = 0.82;
        newText.scale.y = 0.82;
        newButton.addChild(newText);


        let luckRect = new PIXI.Sprite();
        luckRect.texture = sheet.textures["box_menu.png"];
        luckRect.anchor.set(0.5, 0.5);
        luckRect.tint = 0xe4e4e4;
        function myResizeLuckRect() {
            SpriteScale(luckRect, 1.98)
            SpritePositionX(luckRect, 50);
            SpritePositionY(luckRect, 51);
        }
        luckRect.eventMode = 'static';

        closeButton1.texture = sheet.textures["close.png"];
        closeButton1.anchor.set(1, 1);
        closeButton1.x = 280;
        closeButton1.y = -138;
        closeButton1.scale.x = 0.66;
        closeButton1.scale.y = 0.66;
        closeButton1.eventMode = 'static';
        closeButton1.on('pointerdown', function () {
            isLuckOpen = !isLuckOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;

            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }


            if (isLuckOpen) {
                app.stage.addChild(luckRect);
                
            }
            else {
                app.stage.removeChild(luckRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });
        luckRect.addChild(closeButton1);

        SetRandomSmileImage();
        randomSmileImage.anchor.set(0.5, 0.5);
        randomSmileImage.x = 0;
        randomSmileImage.y = -127;
        randomSmileImage.scale.x = 0.87;
        randomSmileImage.scale.y = 0.87;
        luckRect.addChild(randomSmileImage);

        spriteNumberText1.anchor.set(0.5, 0.5);
        spriteNumberText1.x = -2;
        spriteNumberText1.y = -33;
        spriteNumberText1.scale.x = 1.15;
        spriteNumberText1.scale.y = 1.15;
        luckRect.addChild(spriteNumberText1);



        randomSmileButton.texture = sheet.textures["redButton.png"];
        randomSmileButton.anchor.set(0.5, 0);
        randomSmileButton.x = 0;
        randomSmileButton.y = 17;
        randomSmileButton.scale.x = 0.66;
        randomSmileButton.scale.y = 0.66;
        randomSmileButton.eventMode = 'static';
        randomSmileButton.on('pointerdown', function () {
            if (randomSmileCost <= score) {
                score -= randomSmileCost;
                if (Math.random() > 0.5) {
                    ballNumber = ballNumber + 1;
                }
                else {
                    if (ballNumber >= 1) {
                        ballNumber = ballNumber - 1;
                    }
                    else {
                        ballNumber = ballNumber + 1;
                    }
                }
                ballNumber = ballNumber % maxBallNumber;
                bombState[0] = 0;
                bombState[1] = 0;
                bombState[2] = 0;
                AddTextureBall(ball, ballNumber);
                SetRandomSmileImage();
                document.dispatchEvent(OnUpdateUI);
                UpdateTrophySmile();
                Save();
                document.dispatchEvent(OnNewSmileSound);
            }
        });
        luckRect.addChild(randomSmileButton);

        randomSmileText.anchor.set(0.5, 0.5);
        randomSmileText.x = 4;
        randomSmileText.y = 54;
        randomSmileText.scale.x = 0.8;
        randomSmileText.scale.y = 0.8;
        randomSmileButton.addChild(randomSmileText);





        randomSmileAttentionText.anchor.set(0.5, 1);
        randomSmileAttentionText.x = 0;
        randomSmileAttentionText.y = 180;
        randomSmileAttentionText.scale.x = 0.76;
        randomSmileAttentionText.scale.y = 0.76;
        luckRect.addChild(randomSmileAttentionText);







        luckButton.texture = sheet.textures["star.png"];
        luckButton.anchor.set(1, 1);
        function myResizeLuckButton() {
            SpriteScale(luckButton, 1.6)
            SpritePositionX(luckButton, 98.3);
            SpritePositionY(luckButton, 90);
        }
        luckButton.eventMode = 'static';
        luckButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);
            isLuckOpen = !isLuckOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;

            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }


            if (isLuckOpen) {
                app.stage.addChild(luckRect);
                
            }
            else {
                app.stage.removeChild(luckRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });


        luckCircle.beginFill(0xcc0033, 1);
        luckCircle.drawCircle(-25, -94, 32);
        luckCircle.endFill();


        luckCircleText = new PIXI.Text('!', ordinaryText);
        luckCircleText.anchor.set(0.5, 0.5);
        luckCircleText.x = -25;
        luckCircleText.y = -94;
        luckCircleText.scale.x = 1.7;
        luckCircleText.scale.y = 1.7;
        luckCircle.addChild(luckCircleText);

        buttonContainer.addChild(luckButton);




        menuButton.texture = sheet.textures["menu.png"];
        menuButton.anchor.set(0, 1);
        function myResizeMenuButton() {
            SpriteScale(menuButton, 1.7)
            SpritePositionX(menuButton, 1.9);
            SpritePositionY(menuButton, 67);
        }
        menuButton.eventMode = 'static';
        menuButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);
            isMenuOpen = !isMenuOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;

            if (isOpen)
            {
                app.stage.removeChild(buttonContainer);
            }
            else
            {
                app.stage.addChild(buttonContainer);
            }

            if (isMenuOpen)
            {
                app.stage.addChild(menuRect);                
            }
            else
            {
                menuRect.removeChild(resetPanel);
                app.stage.removeChild(menuRect);
            }
            document.dispatchEvent(OnNewSmileSound);
        });
        buttonContainer.addChild(menuButton);

        menuCircle.beginFill(0xcc0033, 1);
        menuCircle.drawCircle(108, -108, 30);
        menuCircle.endFill();


        menuCircleText = new PIXI.Text('!', ordinaryText);
        menuCircleText.anchor.set(0.5, 0.5);
        menuCircleText.x = 108;
        menuCircleText.y = -108;
        menuCircleText.scale.x = 1.6;
        menuCircleText.scale.y = 1.6;
        menuCircle.addChild(menuCircleText);




        rewardButton.texture = sheet.textures["reward.png"];
        rewardButton.anchor.set(0, 1);
        function myResizeRewardButton() {
            SpriteScale(rewardButton, 1.53)
            SpritePositionX(rewardButton, 0.7);
            SpritePositionY(rewardButton, 91);
        }
        rewardButton.eventMode = 'static';
        rewardButton.on('pointerdown', function () {
            if (isYSDK)
            {
                document.dispatchEvent(OnGameStop);                   
                vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
                    .then((data) => {
                        if (data.result)
                        {
                            multipliyer++;
                            rewardText.text = multipliyer + 1 + ' X';
                            document.dispatchEvent(OnGameStart);
                            CheckRewardAds();
                        }                           
                        else
                        {
                            document.dispatchEvent(OnGameStart);
                        }
                            
                    })
                    .catch((error) => {
                        console.log(error);
                        document.dispatchEvent(OnGameStart);
                    });

            }
            document.dispatchEvent(OnGameInteract);
        });       



        rewardText.anchor.set(0.5, 0.5);
        rewardText.x = 60;
        rewardText.y = -110;
        rewardText.scale.x = 1.1;
        rewardText.scale.y = 1.1;
        rewardButton.addChild(rewardText);

        menuRect.texture = sheet.textures["box_menu.png"];
        menuRect.anchor.set(0.5, 0.5);
        menuRect.tint = 0xe4e4e4;
        function myResizeMenuRect() {
            SpriteScale(menuRect, 1.98)
            SpritePositionX(menuRect, 50);
            SpritePositionY(menuRect, 51);
        }
        menuRect.eventMode = 'static';


        soundButton.texture = sheet.textures["soundOn.png"];
        soundButton.anchor.set(0.5, 1);
        soundButton.x = 0;
        soundButton.y = -92;
        soundButton.scale.x = 0.67;
        soundButton.scale.y = 0.67;
        soundButton.eventMode = 'static';
        soundButton.on('pointerdown', function () {
            soundState = !soundState;
            if (soundState) {
                soundButton.texture = sheet.textures["soundOn.png"];
                document.dispatchEvent(OnSoundOn);
            }
            else {
                soundButton.texture = sheet.textures["soundOff.png"];
                document.dispatchEvent(OnSoundOff);
            }
        });
        menuRect.addChild(soundButton);




        closeButton.texture = sheet.textures["close.png"];
        closeButton.anchor.set(1, 1);
        closeButton.x = 280;
        closeButton.y = -138;
        closeButton.scale.x = 0.66;
        closeButton.scale.y = 0.66;
        closeButton.eventMode = 'static';
        closeButton.on('pointerdown', function () {
            isMenuOpen = !isMenuOpen;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;

            if (isOpen) {
                app.stage.removeChild(buttonContainer);
            }
            else {
                app.stage.addChild(buttonContainer);
            }

            if (isMenuOpen) {
                app.stage.addChild(menuRect);
                
            }
            else {
                menuRect.removeChild(resetPanel);
                app.stage.removeChild(menuRect);
                
            }
            document.dispatchEvent(OnNewSmileSound);
        });
        menuRect.addChild(closeButton);

        resetButton.texture = sheet.textures["redButton.png"];
        resetButton.anchor.set(0.5, 0);
        resetButton.x = 0;
        resetButton.y = 68;
        resetButton.height = 114;
        resetButton.width = 400;
        resetButton.eventMode = 'static';
        resetButton.on('pointerdown', function () {
            menuRect.addChild(resetPanel);
            document.dispatchEvent(OnNewSmileSound);
        });
        menuRect.addChild(resetButton);


        upgrateButton.texture = sheet.textures["redButton.png"];
        upgrateButton.anchor.set(0.5, 0);
        upgrateButton.x = 0;
        upgrateButton.y = -68;
        upgrateButton.height = 114;
        upgrateButton.width = 400;
        upgrateButton.eventMode = 'static';
        upgrateButton.on('pointerdown', function () {
            if (upgrateClickCost <= score) {
                score -= upgrateClickCost;
                clickCost++;
                upgrateClickCost = Math.floor(1.3 * upgrateClickCost)
                UpdateUpgrateText();
                document.dispatchEvent(OnUpdateUI);
                Save();
                document.dispatchEvent(OnNewSmileSound);
            }
        });
        menuRect.addChild(upgrateButton);



        upgrateText.anchor.set(0.5, 0.5);
        upgrateText.x = 0;
        upgrateText.y = 59;
        upgrateText.scale.x = 0.75;
        upgrateText.scale.y = 0.75;
        upgrateButton.addChild(upgrateText);



        resetText.anchor.set(0.5, 0.5);
        resetText.x = 0;
        resetText.y = 59;
        resetText.scale.x = 0.75;
        resetText.scale.y = 0.75;
        resetButton.addChild(resetText);



        resetPanel.texture = sheet.textures["box_menu.png"];
        menuRect.tint = 0xf2f2f2;
        resetPanel.anchor.set(0.5, 1);
        resetPanel.x = 0;
        resetPanel.y = 191;
        resetPanel.width = 485;
        resetPanel.height = 325;
        resetPanel.eventMode = 'static';



        resetText1.anchor.set(0.5, 0);
        resetText1.x = 0;
        resetText1.y = -380;
        resetText1.scale.x = 0.92;
        resetText1.scale.y = 0.92;
        resetPanel.addChild(resetText1);


        yesButton.texture = sheet.textures["redButton.png"];
        yesButton.anchor.set(0.5, 0);
        yesButton.x = 0;
        yesButton.y = -230;
        yesButton.width = 253;
        yesButton.height = 70;
        yesButton.eventMode = 'static';
        yesButton.on('pointerdown', function () {
            Reset();
            multipliyer = 1;
            isMenuOpen = false;
            isLuckOpen = false;
            isTrophyOpen = false;
            isTrophySmileOpen = false;
            isOpen = isMenuOpen || isLuckOpen || isTrophyOpen || isTrophySmileOpen;
            bombState[0] = 0;
            bombState[1] = 0;
            bombState[2] = 0;

            AddTextureBall(ball, ballNumber);
            SetRandomSmileImage();


            UpdateUpgrateText();
            document.dispatchEvent(OnUpdateUI);
            document.dispatchEvent(OnNewSmileSound);
            UpdateTrophyText();
            UpdateTrophySmile();
            questButtonText.text = '+' + CrystalQuestCost();


            menuRect.removeChild(resetPanel);
            app.stage.removeChild(menuRect);
            app.stage.removeChild(trophyRect);
            app.stage.removeChild(luckRect);
            app.stage.removeChild(trophySmileRect);
            
        });
        resetPanel.addChild(yesButton);



        yesText.anchor.set(0.5, 0.5);
        yesText.x = 0;
        yesText.y = 59;
        yesText.scale.x = 1.3;
        yesText.scale.y = 1.3;
        yesButton.addChild(yesText);



        noButton.texture = sheet.textures["redButton.png"];
        noButton.anchor.set(0.5, 0);
        noButton.x = 0;
        noButton.y = -110;
        noButton.width = 253;
        noButton.height = 70;
        noButton.eventMode = 'static';
        noButton.on('pointerdown', function () {
            menuRect.removeChild(resetPanel);
            document.dispatchEvent(OnNewSmileSound);
        });
        resetPanel.addChild(noButton);


        noText.anchor.set(0.5, 0.5);
        noText.x = 0;
        noText.y = 59;
        noText.scale.x = 1.3;
        noText.scale.y = 1.3;
        noButton.addChild(noText);



        startMenuRect.texture = sheet.textures["box_menu.png"];
        startMenuRect.anchor.set(0.5, 0.5);
        startMenuRect.tint = 0xe4e4e4;
        function myResizeStartMenuRect() {
            SpriteScale(startMenuRect, 1.98)
            SpritePositionX(startMenuRect, 50);
            SpritePositionY(startMenuRect, 51);
        }
        startMenuRect.eventMode = 'static';
        app.stage.addChild(startMenuRect);


        closeStartMenuRect.texture = sheet.textures["close.png"];
        closeStartMenuRect.anchor.set(1, 1);
        closeStartMenuRect.x = 280;
        closeStartMenuRect.y = -138;
        closeStartMenuRect.scale.x = 0.66;
        closeStartMenuRect.scale.y = 0.66;
        closeStartMenuRect.eventMode = 'static';
        closeStartMenuRect.on('pointerdown', function () {
            isGameStopped = false;
            isFirstGame = false;
            app.stage.removeChild(startMenuRect);
            document.dispatchEvent(OnNewSmileSound);
            document.dispatchEvent(OnGameInteract);
            app.stage.addChild(buttonContainer);
        });
        startMenuRect.addChild(closeStartMenuRect);

        soundButton1.texture = sheet.textures["soundOn.png"];
        soundButton1.anchor.set(0.5, 1);
        soundButton1.x = 0;
        soundButton1.y = -92;
        soundButton1.scale.x = 0.67;
        soundButton1.scale.y = 0.67;
        soundButton1.eventMode = 'static';
        soundButton1.on('pointerdown', function () {
            soundState = !soundState;
            if (soundState) {
                soundButton1.texture = sheet.textures["soundOn.png"];
                document.dispatchEvent(OnSoundOn);
                document.dispatchEvent(OnGameInteract);
            }
            else {
                soundButton1.texture = sheet.textures["soundOff.png"];
                document.dispatchEvent(OnSoundOff);
                document.dispatchEvent(OnGameInteract);
            }
        });
        startMenuRect.addChild(soundButton1);


        shareButton.texture = sheet.textures["redButton.png"];
        shareButton.anchor.set(0.5, 0);
        shareButton.x = 0;
        shareButton.y = 68;
        shareButton.height = 114;
        shareButton.width = 400;
        shareButton.eventMode = 'static';
        shareButton.on('pointerdown', function () {
            document.dispatchEvent(OnGameInteract);
            document.dispatchEvent(OnNewSmileSound);

            bridge.send('VKWebAppShare', {
                link: 'https://vk.com/app51731881'
            })
                .then((data) => {
                    if (data.result)
                    {
                        score += 500;
                    }
                })
                .catch((error) => {
                    // Ошибка
                    console.log(error);
                });

        });
        


        playButton.texture = sheet.textures["redButton.png"];
        playButton.anchor.set(0.5, 0);
        playButton.x = 0;
        playButton.y = -68;
        playButton.height = 114;
        playButton.width = 400;
        playButton.eventMode = 'static';
        playButton.on('pointerdown', function () {
            isGameStopped = false;
            isFirstGame = false;
            app.stage.removeChild(startMenuRect);
            document.dispatchEvent(OnNewSmileSound);
            document.dispatchEvent(OnGameInteract);
            app.stage.addChild(buttonContainer);
        });
        startMenuRect.addChild(playButton);





        function myResizeUI() {
            myResizeText();
            myResizeNewButton();
            myResizeMenuButton();
            myResizeRewardButton();
            myResizeAdWillBeShownTxt();
            myResizeLuckButton();
            myResizeLuckRect();
            myResizeGiftButton();
            myResizeTrophyButton();
            myResizeTrophySmileButton();

            adsSquare.width = document.body.clientWidth;
            adsSquare.height = document.body.clientHeight;

            myResizeMenuRect();
            myResizeTrophyRect();
            myResizeSmileTrophyRect();
            myResizeStartMenuRect();
        }

        function UpdateUI() {
            if (score < 1500) {
                scoreText.text = '' + score;
            }
            else {
                scoreText.text = '' + Math.round(score / 100) / 10 + ' K';
            }

            if (score < cost) {
                newButton.alpha = 0.4;
            }
            else {
                newButton.alpha = 1;
            }

            if (score < upgrateClickCost) {
                upgrateButton.alpha = 0.4;
                menuButton.removeChild(menuCircle);
            }
            else {
                upgrateButton.alpha = 1;
                menuButton.addChild(menuCircle);
            }

            if (score < randomSmileCost) {
                randomSmileButton.alpha = 0.4;
                luckButton.removeChild(luckCircle);
            }
            else {
                randomSmileButton.alpha = 1;
                luckButton.addChild(luckCircle);
            }

            if (cost < 1500) {
                newText.text = stringNewSmile + cost + ' !';
            }
            else {
                let newTextStringTemp = Math.round(cost / 100) / 10 + ' K';
                newText.text = stringNewSmile + newTextStringTemp + ' !';
            }

            rewardText.text = (multipliyer + 1) + ' X';
            spriteNumberText.text = emodjiString + (ballNumber + 1) + '/' + (maxBallNumber);
            spriteNumberText1.text = emodjiString + (ballNumber + 1) + '/' + (maxBallNumber);
            spriteNumberText2.text = emodjiString + (ballNumber + 1) + '/' + (maxBallNumber);
            
        }

        window.addEventListener('resize', myResizeUI);
        UpdateUI();
        document.addEventListener("OnUpdateUI", UpdateUI);
        myResizeUI();

        function BallClick(i) {
            CreateEffectText(i);
            coordinatesY[i] = 115;
        }

        for (let i = 0; i < ball.length; i++) {
            ball[i].eventMode = 'dynamic';
            ball[i].on('pointerdown', function () {
                document.dispatchEvent(OnGameInteract);
                if (!isOpen && !isGameStopped) {
                    BallClick(i);
                    switch (bombState[i]) {
                        case -1:
                            document.dispatchEvent(OnBombClick);
                            break;
                        case 0:
                            document.dispatchEvent(OnBallClick);
                            break;
                        case 1:
                            document.dispatchEvent(OnGemClick);
                            break;
                        case 2:
                            document.dispatchEvent(OnGemClick);
                            BallClick((i + 1) % 3);
                            BallClick((i + 2) % 3);
                            break;
                        default:
                            break;
                    }
                }
            });
        }







        setTimeout(() => { app.ticker.add(moveBall); }, 390);


        function CheckRewardAds()
        {
          vkBridge.send('VKWebAppCheckNativeAds', {
            ad_format: 'reward'
          }).then((data) => {
            if (data.result) {
                app.stage.addChild(rewardButton);
            } else {
                app.stage.removeChild(rewardButton);
            }
          }).catch((error) => { console.log(error); });
        }

        
        if (isYSDK) {
            startMenuRect.addChild(shareButton);
            CheckRewardAds();
            setTimeout(() => { CheckRewardAds(); }, 8000);            
        }
        document.addEventListener("OnYSDKInit", () => {                
            startMenuRect.addChild(shareButton);
            CheckRewardAds();
            setTimeout(() => { CheckRewardAds(); }, 8000);
        });

        var element = document.getElementById("ld");
        element.remove();
    });






    //#endregion

    //#region BallMove

    let velocity = 0.29;
    let count = 1;

    function SetSpeed() {
        let velocityBoost = ((count) / (count + 3)) + ((count - 1) / (count + 1)) * Math.sqrt((totalMoney / 1000));
        if (velocityBoost > 2.1) {
            velocityBoost = 2.1;
        }
        return velocityBoost * velocity * (0.66 + 1.63 * Math.random());
    }
    
    let speed = [SetSpeed(), SetSpeed(), SetSpeed()];


    function moveBall(delta) {
        if (!isGameStopped && !isOpen) {
            for (let i = 0; i < ball.length; i++) {
                coordinatesY[i] += speed[i] * delta;
                if (coordinatesY[i] > 120) {
                    count++;
                    coordinatesY[i] = initPositionY;
                    speed[i] = SetSpeed();
                    if (bombState[i] != -1) {
                        score += multipliyer;
                        totalMoney += multipliyer;
                    }


                    if (Math.random() >= 0.7) {
                        if (Math.random() > 0.5) {
                            bombState[i] = -1;
                            ball[i].texture = sheet.textures["bomb.png"];
                        }
                        else {
                            if (Math.random() > 0.67) {
                                bombState[i] = 2;
                                ball[i].texture = sheet.textures["gem1.png"];
                            }
                            else {
                                bombState[i] = 1;
                                ball[i].texture = sheet.textures["gem.png"];
                            }
                        }
                    }
                    else {
                        bombState[i] = 0;
                        ball[i].texture = PIXI.Texture.from('sprites/balls/ball' + ballNumber + '.png');
                    }
                    Save();
                    document.dispatchEvent(OnUpdateUI);
                }
                SpritePositionY(ball[i], coordinatesY[i]);
            }
        }
    }
    //#endregion

    //#region Timers


    function ShowInter() {
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
            .then((data) => {
                if (data.result)
                {
                    document.dispatchEvent(OnGameStart);
                    app.stage.removeChild(adsContainer);
                }
                else
                {
                    document.dispatchEvent(OnGameStart);
                    app.stage.removeChild(adsContainer);
                }
            })
            .catch((error) => {
                console.log(error);
                document.dispatchEvent(OnGameStart);
                app.stage.removeChild(adsContainer);
            });
    }



    function AutoShow() {
        vkBridge.send('VKWebAppCheckNativeAds', {
            ad_format: 'interstitial'
        })
            .then((data) => {
                if (data.result)
                {
                    if (!isGameHidden && !isGameStopped) {
                        app.stage.addChild(adsContainer);
                        document.dispatchEvent(OnGameStop);
                        setTimeout(ShowInter, 780);
                        adWillBeShownTxt.text = stringAdWillBeStartedAfter + '2...'
                        setTimeout(() => {
                            adWillBeShownTxt.text = stringAdWillBeStartedAfter + '1...'
                        }, 590);
                    }
                }
            })
            .catch((error) => { console.log(error); });
    }


    let timerCycle = 0;
    function CycleTimer(delta) {
        if (!isGameStopped) {
            timerCycle += delta / 60;
        }
        if (timerCycle >= 79) {
            timerCycle = 0;
            AutoShow();
        }
    }



    let timerOneSec = 0;
    function TimerOneSec(delta) {
        if (!isGameStopped) {
            timerOneSec += delta / 60;
        }
        if (timerOneSec >= 0.5) {
            timerOneSec = 0;
            giftFill -= 0.5;
            if (giftFill <= 0) {
                giftFill = 0;
                app.ticker.remove(TimerOneSec);
            }
            UpdateGiftCircle();
        }
    }

    let giftAttentionTime = 0;
    function GiftTextEffectTimer(delta) {
        if (!isGameStopped) {
            giftAttentionTime += delta / 50;
            giftAttentionText.x += 1.38 * delta * giftAttentionTime;
            giftAttentionText.y -= 1.48 * delta * giftAttentionTime;
            giftAttentionText.scale.x -= (0.023 * delta) * giftAttentionTime;
            giftAttentionText.scale.y -= (0.023 * delta) * giftAttentionTime;
            if (giftAttentionText.scale.x <= 0.22) {
                giftAttentionTime = 0;
                scoreText.removeChild(giftAttentionText);
                app.ticker.remove(GiftTextEffectTimer);
            }
        }
    }



    setTimeout(() => {        
        app.ticker.add(CycleTimer);
        vkBridge.send('VKWebAppShowBannerAd', {
            banner_location: 'bottom',
            layout_type: 'resize'
        })
            .then((data) => {
            })
            .catch((error) => {
            })
    }, 19000);

    AutoShow();
    //#endregion
}
P();