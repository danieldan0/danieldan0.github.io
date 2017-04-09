//Made by danieldan0(C) 2017
//creating the app
var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a texture from an image path
var texture = PIXI.Texture.fromImage('required\assets\bunny.png');

// scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

//debug
//var debug = new PIXI.Text("debug"); //DEBUG
//debug.x = 0; //DEBUG
//debug.y = 0; //DEBUG
//app.stage.addChild(debug); //DEBUG

// text
var counter = 10;
var style = new PIXI.TextStyle({
    fontFamily: 'Comic Sans MS',
});
var text = new PIXI.Text('PUT THE BUNNY BACK IN THE BOX', style);
text.x = 30;
text.y = 90;
app.stage.addChild(text);

// box
var box = new PIXI.Graphics();
box.lineStyle(2, 0x0000FF, 1);
box.beginFill(0xFF700B, 1);
box.drawRect(50, 250, 120, 120);
app.stage.addChild(box);
// box text
var boxText = new PIXI.Text('BOX', style);
boxText.x = 80;
boxText.y = 280;
app.stage.addChild(boxText);

// create bunny
var bunny;
var bunnyPos = {x: 0, y: 0};
var bunnyIsInTheBox = false;
createBunny(app.renderer.width / 2, app.renderer.height / 2);

function createBunny(x, y) {
    bunny = new PIXI.Sprite(texture);
    bunny.interactive = true;
    bunny.buttonMode = true;
    bunny.anchor.set(0.5);
    bunny.scale.set(3);
    bunny
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    bunny.x = x;
    bunny.y = y;
    app.stage.addChild(bunny);
}

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    bunnyPos.x = this.x;
    bunnyPos.y = this.y;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

app.ticker.add(function(delta) {
    //rotating bunny
    bunny.rotation += 0.1 * delta;
    //debug.text = "debug X " + bunnyPos.x + " Y " + bunnyPos.y; //DEBUG
    //checking bunny position
    if(bunnyPos.x > 50 && bunnyPos.x < 170 && bunnyPos.y > 250 && bunnyPos.y < 370 && counter >= 1)
    {
        bunnyIsInTheBox = true;
    }
    //changing text
    if(!bunnyIsInTheBox)
    {
        if(counter > 1)
        {
            counter -= 1 / 60 * delta;
            text.text = 'PUT THE BUNNY BACK IN THE BOX ' + Math.trunc(counter);
        } else {
            text.text = "WHY COULDN'T YOU PUT THE BUNNY BACK IN THE BOX";
        }
    } else
    {
        text.text = "SMILING NICOLAS CAGE'S FACE";
    }
});