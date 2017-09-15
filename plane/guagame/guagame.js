var fps=30;
class GuaGame{
	constructor(images,runCallback)
	{
		this.images=images,
		this.runCallback=runCallback
		this.scene=null,
		this.actions={},
		this.keydowns={},
		this.canvas=document.querySelector("#id-canvas")
		this.context=this.canvas.getContext('2d')
		this.names=Object.keys(images)
		var self=this
		window.addEventListener('keydown',function(event){
		self.keydowns[event.key]='down'
		})
		
		window.addEventListener('keyup',event=>{
		this.keydowns[event.key]='up'
		})
		this.init()
	}
	static instance(...args){
		this.i=this.i||new this (...args)
		return this.i
		}
	drawImage(guaImage){
		//log(guaImage)
		this.context.drawImage(guaImage.texture,guaImage.x,guaImage.y,guaImage.w,guaImage.h)
	}
	drawTexture(texture){
		//log(texture)
		this.context.drawImage(texture,texture.x,texture.y,texture.w,texture.h)
	}
	init(){
	var images =this.images
	//log(images)
	var names=this.names
	var g=this
	function loadImage(i)
	{	
		//var names=this.names
		var image=new Image();
		image.src=images[names[i]];
		//log(i,names[i]);
		return new Promise(function(resolve,reject){
		image.onload=function(){
			images[names[i]]=image;
		//log(g.images);
			resolve(++i)
			}
		})
	}
	var next=new Promise(function(resolve,reject){resolve(0)})

	for(var i=0;i<this.names.length;i++){
		next=next.then(loadImage)
		}
	next.then(function(){
	log("success")
	g.runCallback(g)
	setTimeout(g.runloop,1000/fps,g)})
	}
	textureByName(name){
		var g=this
		var img=g.images[name]
		
		return img
	}
	update(){
		if(paused)
			return 
		this.scene.update()
	}
	draw(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
		this.scene.draw()
	}
	registerAction(key,callback){
		this.actions[key]=callback
	}
	replaceScene(scene)
	{
		this.scene=scene
	}
	runWithScene(s)
	{
		this.replaceScene(s)
	}
	runloop(g){
	//events
	
	//log(g.actions)
	var actions=Object.keys(g.actions)
	for(var key of actions)
	{
		var status=g.keydowns[key]
		if(status=='down')
		{

			g.actions[key]('down')
		}
		else if(g.keydowns[key]=='up')
		{
			//log('up')
			g.actions[key]('up')
			g.keydowns[key]=null
		}
	}
	g.update&&g.update();
	
	g.draw()
	setTimeout(
		g.runloop,1000/fps,g)
	}
	imageByName(name){
		var g=this
		var img=g.images[name];
		var image={
			w:img.width,
			h:img.height,
			image:img
			
		};
		return image;
	}
	}
