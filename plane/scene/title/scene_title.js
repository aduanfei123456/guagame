class GuaLabel{
	constructor(game,text){
		this.game=game
		this.text=text
	}
	static new(game,text){
		return new this(game,text)
	}
	draw(){
		this.game.context.fillText(this.text,100,250)
	}	
	update(){
		
	}
}
class Pipes{
	constructor(game){
		this.game=game
		this.pipes=[]
		for(var i=0;i<6;i++){
				var name='p'+randomBetween(1,2)
				var p=GuaPipe.new(this.game,name,450+i*config['horizontal_distance'].k)
				this.pipes.push(p)
			}
	}
	update(){
		for(var i=0;i<this.pipes.length;i++){
				var p=this.pipes[i]
				p.update()
				if(p.x<-50){
					var name='p'+randomBetween(1,2)
					this.pipes[i]=GuaPipe.new(this.game,name,this.pipes[(i+5)%6].x+config['horizontal_distance'].k)
				}
			}
	}
	draw(){
		for(var i=0;i<this.pipes.length;i++){
				var p=this.pipes[i]
				p.draw()
			}
	}
	
}

class GuaPipe extends GuaImage{
	constructor(game,name,initialx){
		super(game,name)
		this.name=name
		this.initialx=initialx
		this.x=initialx
		this.h=randomBetween(50,200)
		this.y=name.includes('1')?0:370-this.h
		//log(this.y)
		this.w=50
	}
	static new(game,name,initialx){
		var i=new this(game,name,initialx)
		return i
	}
	update(){
		this.x-=5
		
	}
	
}

class SceneTitle extends GuaScene{
		constructor(game,scene){
			super(game)
			this.scene=scene
			this.setUp()
			this.setupInputs()
			
		}
		setUp(){
			var game=this.game
			log('settingUP')
			var bg=GuaImage.new(game,'bg')
			bg.w=400
			bg.h=450
			this.addElement(bg)
			var b=GuaAnimation.new(game)
			b.x=100
			b.y=200
			this.b=b
			this.addElement(b)
			this.grounds=[]
			for(var i=0;i<2;i++){
				
				let g=GuaImage.new(game,'ground')
				g.w=330
				g.x=i*g.w
				g.y=370
				//log(g.w)
				this.addElement(g)
				this.grounds.push(g)
			}
			this.pipes=new Pipes(this.game)
			this.addElement(this.pipes)
			this.skipCount=41
			this.speed=5
		}
		setupInputs(){
			var self=this
			var b=this.b
			this.game.registerAction('w',function(keyStatus){
				b.jump()
			})
			this.game.registerAction('a',function(keyStatus){
				b.move(-2,keyStatus)
			})
			this.game.registerAction('d',function(keyStatus){
				b.move(2,keyStatus)
			})
			this.game.registerAction('k',function(){
			self.scene.setup()
			self.game.replaceScene(scene)
			})
		}
		update(){
			super.update()
			this.skipCount--
			var offset=-this.speed
			if(this.skipCount==0){
				this.skipCount=41
				offset=this.speed*40
			}
			for(var i=0;i<2;i++){
				
				let g=this.grounds[i]
				g.x+=offset
			}
			
		}
		draw(){
			super.draw()
			
		}
		
}