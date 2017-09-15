class GuaAnimation{
	constructor(game){
		log('newing')
		this.game=game
		this.texture=this.game.textureByName('b1')
		log(this.texture)
		//hard code animation
		this.animations={
			idle:[]
		}
		for(var i=1;i<4;i++){
			var name='b'+i
			var t=this.game.textureByName(name)
		
			this.animations['idle'].push(t)
		}
		this.animationName='idle'
		this.texture=this.frames()[0]
		
		this.h=this.texture.height
		
		this.w=this.texture.width
		this.frameIndex=0
		this.frameCount=3
		//this.flipX=false
		//gravity
		this.gy=10
		this.vy=0
		this.degree=0
	}
	static new (game){
		return new this(game)
	}
	frames(){
		return this.animations[this.animationName]
	}
	jump(){
		this.vy=-10
		this.degree=-45
	}
	update(){
		
		this.y+=this.vy
		this.vy+=this.gy*0.2 
		var h=335
		if(this.y>h){
			this.y=h
		}
		this.degree+=5
		this.frameCount--
		if( this.frameCount==0){
			
			this.frameCount=3
			this.frameIndex=(this.frameIndex+1)%this.frames().length
			//log(this.frameIndex)
			
			this.texture=this.frames()[this.frameIndex]
		}
	}
	draw(){
		//log(this.texture)
		var context=this.game.context
		
			context.save()
			var x=this.x+this.w/2
			var y=this.y+this.h/2
			context.translate(x,y)
			context.rotate(Math.PI*this.degree/180)
			//context.translate(-x,0)
			context.drawImage(this.texture,-this.w/2,-this.h/2)
			
			context.restore()
		}
	move(x,keyStatus){
		this.x+=x
		/*var animationNames={
			down:'run',
			up:'idle'
		}
		var name=animationNames[keyStatus]
		this.changeAnimation(name)*/
	}
	changeAnimation(name){
		this.animationName=name
	}
}