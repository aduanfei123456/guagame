class GuaImage{
	constructor(game,name){
		//log(name)
		this.texture=game.textureByName(name)
		this.x=0
		this.y=0
		this.w=this.texture.width
		this.h=this.texture.height
		this.game=game
	}
	static new(game,name){
		var i=new this(game,name)
		return i
	}
	draw(){
		this.game.drawImage(this)
	}
 	update(){
	}
}
