class GuaParticle extends GuaImage{
	constructor(game){
		super(game,'fire')
		this.setup()
	}
	setup(){
		this.life=10
	}
	init(x,y,vx,vy){
		this.x=x
		this.y=y
		this.vx=vx
		this.vy=vy
		
	}
	update(){
		this.life--
		this.x+=this.vx
		this.y+=this.vy
		var factor=0.02
		this.vx+=factor*this.vx
		this.vy+=factor*this.vy
	}
}
class GuaParticleSystem{
	constructor(game,x,y){
		this.game=game
		//log(game,x,y)
		this.setup(x,y)
	}
	static new(game,x,y){
		return new this(game,x,y)
	}
	setup(x,y){
		
		this.x=x
		this.y=y
		this.numberOfParticles=10
		this.particles=[]
	}
	update(){
		if(this.numberOfParticles){
			this.numberOfParticles--
			//log(particles)
			var p=GuaParticle.new(this.game)
			var s=2
			var vx=randomBetween(-s,s)||1
			var vy=randomBetween(-s,s)||-1
		    p.init(this.x,this.y,vx,vy)
			this.particles.push(p)
		}
		for(var p of this.particles){
			p.update()
		}
	this.particles=this.particles.filter(p=>p.life>0)
	
	}
	draw(){
		for(var p of this.particles){
			p.draw()
		}
	}
}