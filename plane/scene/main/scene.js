
function hasPoint(a,px,py){
	return a.x<px&&px<a.x+a.w&&a.y<py&&py<a.y+a.h
	}
function collide(a,b){
	return hasPoint(a,b.x,b.y)||hasPoint(a,b.x+b.w,b.y)||hasPoint(a,b.x,b.y+b.h)||hasPoint(a,b.x+b.w,b.y+b.h)
	}

class Player extends GuaImage{
	constructor(game,scene){
		super(game,'player')
		this.setup()
		this.cooldown=0
		this.scene=scene
	}
	setup(){
		this.speed=10

	}
	update(){
		this.speed=config.player_speed
		if(this.cooldown==0){
			this.fire()
		}
		else{
			//log(this.cooldown)
			this.cooldown--
		}
	}
	fire(){
		//log("fire")
		this.cooldown=config.player_cooldown
		var s=this.scene
		var b=s.buf.pop()
		b.fire(s.player)
		s.bf.push(b)
	}
	
	getKilled(enemies){
		for(var e of enemies){
			if(collide(e,this))
				return true
		}
		return false
	}
	moveLeft(){
		this.x-=this.speed
	}
	moveRight(){
		this.x+= this.speed
	}
	moveUp(){
		this.y-=this.speed
	}
	moveDown(){
		this.y+=this.speed
	}
}
class Bullet extends GuaImage{
	constructor(game){
	//	log("called")
		super(game,'bullet')
		this.setup()
	}
	setup(){
		this.speed=7
		this.fired=false
	}
	fire(player){
		this.x=player.x
		this.y=player.y
		this.fired=true
	}
	update(s){
		var b=this
		if(b.fired){
			b.y-=b.speed
			if(b.y<-10){
				var bu=s.bf.splice(0,1)[0]
				s.buf.push(bu)
				b.setup()
			}
		}
	}
	
}
const randomBetween=function(start,end){
	var n =Math.random()*(end-start+1)
	return Math.floor(n+start)
}
class Enemy extends GuaImage{
	constructor(game){
		var type=randomBetween(0,3)
		var name='enemy'+type
		super(game,name)
		this.setup()
	}
	setup(){
		this.speed=randomBetween(2,5)
		this.x=randomBetween(0,300)
		this.y=-randomBetween(0,200)
		this.alive=true
	}
	update(bf){
	
		if(this.alive){
		for(var b of bf){
			if(this.collide(b)){
				this.alive=false
			//	log('create pas')
				this.pas=(GuaParticleSystem.new(this.game,this.x,this.y))
				
				break
			}
			
		  }
		}
		//log(this.alive)
		this.y+=this.speed
		if(this.y>600||!this.alive){
			this.setup()
		}
		
		if(this.pas){
			//log('updating')
			this.pas.update()
		}
	}
	draw(){
		super.draw()
		if(this.pas){
			//log('drawing')
			this.pas.draw()
		}
	}
	collide(b){
		var a=this
		return ((a.x<=b.x&&b.x<=a.x+a.w)&&(a.y<=b.y&&b.y<=a.y+a.h))
	}
	moveLeft(){
		this.x-=this.speed
	}
	moveRight(){
		this.x+= this.speed
	}
	moveUp(){
		this.y-=this.speed
	}
	moveDown(){
		this.y+=this.speed
	}
}
class Scene extends GuaScene{
	constructor(game,end){
		super(game)
		this.setup()
		this.setupInputs()
		this.end=end
		}
	setup(){
		this.elements=[]
		var game=this.game
		this.numberOfEnemies=7
		this.bg=GuaImage.new(game,'sky')
		this.bg.w=400
		this.bg.h=600
		//log(this.bg)
		this.player=Player.new(game,this)
		this.player.x=100
		this.player.y=150
	/*	this.game.registerAction('a',function(){
			paddle.moveLeft()
		})
		this.game.registerAction('d',function(){
			paddle.moveRight()
		})
		this.game.registerAction('f',function(){
			ball.fire()
		})*/
		this.addElement(this.bg)
		this.addElement(this.player)
		this.addEnemies()
		this.addBullets()
		
	}
	restart(){
		this.player.x=100
		this.player.y=150
	}
	addBullets(){
		this.buf=[]
		this.bf=[]
		for(var i=0;i<25;i++){
			var b=Bullet.new(this.game)
			this.buf.push(b)
			}
		//this.count=0
	}
	addEnemies(){
		var es=[]
		for(var i=0;i<this.numberOfEnemies;i++){
			var e=Enemy.new(this.game)
			es.push(e)
		//this.addElement(e)
		}
		this.enemies=es
	}
	setupInputs(){
		var g=this.game
		var s=this
		/*g.registerAction('a',function(){
			s.player.moveLeft()
		})
		g.registerAction('d',function(){
			s.player.moveRight()
		})
		g.registerAction('w',function(){
			s.player.moveUp()
		})
		g.registerAction('s',function(){
			s.player.moveDown()
		})8*/
		//g.registerAction()
		
	}
	draw(){
		super.draw()
		for(var b of this.bf){
				this.game.drawImage(b)
		}
		for(var e of this.enemies){
			//if(e.alive){
			//	log(e.x,e.y)
				e.draw()
		}
	}
	update(){
		
		super.update()
		
		for(var b of this.bf){
			b.update(this)
		}
		for(var e of this.enemies){
			e.update(this.bf)
		}
		if(this.player.getKilled(this.enemies)){
			//var s=new SceneEnd(this.game)
			this.game.replaceScene(this.end)
			//log(this.id)
			//clearInterval(this.id)
		}
		
	}
	//draw(){
		//this.game.drawImage(this.bg)
		//this.game.drawImage(this.player)
	//}
	
	
	
}



/* var  Scene=function(game){
	var s={
		game:game,
	};
	//initialization
	var paddle=Paddle(game);
	var ball=Ball(game);
	var score =0
	var blocks=loadLevel(game,1);
	game.registerAction('a',function()
	{paddle.moveLeft();});
	game.registerAction('d',function()
	{paddle.moveRight();});
	game.registerAction('f',function()
	{
	ball.fire();
	});
	window.addEventListener('keydown',function(event){
	if(event.key=='1')
	blocks=loadLevel(game,1);
	if(event.key=='2')
	blocks=loadLevel(game,2);
	});
	
	s.draw=function(){
		game.context.fillStyle="#554";
		game.context.fillRect(0,0,400,300);
		game.drawImage(paddle);
		game.drawImage(ball)
		for(block of blocks){
			if(block.alive)
			{game.drawImage(block);}
		}
		game.context.fillStyle="black";
		game.context.fillText('分数：'+score,10,290)
		
	}
	s.update=function(){
	ball.move();
	if(ball.y>paddle.y){
		var end=new SceneEnd(game);
		game.replaceScene(end);
		
	}
	if(paddle.collide(ball))
	{
		ball.red();
	}
	for (var i=0;i<blocks.length;i++){	
	
	var block=blocks[i];
	if(block.collide(ball))
		{
		block.kill();
		ball.red();
		score+=10;
		}
	}
	};
	var enableDrag=false
	game.canvas.addEventListener("mousedown",function(){
		var x=event.offsetX;
		var y=event.offsetY;
		if(ball.hasPoint(x,y)){
			enableDrag=true;
		}
	})
	game.canvas.addEventListener("mousemove",function(){
		var x=event.offsetX;
		var y=event.offsetY;
		if(enableDrag)
		{
			ball.x=x;
			ball.y=y;
		}
	})
	game.canvas.addEventListener("mouseup",function(){
		enableDrag=false;
	})
	return s
}*/