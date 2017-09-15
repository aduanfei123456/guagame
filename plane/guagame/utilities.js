
var e=sel=>document.querySelector(sel);
var log=console.log.bind(console);

var imageFromPath=function(path)
	{
	var image=new Image();
	image.src=path;
	return image;
	}
	function createImage(imagePath)
	{
	this.image=imageFromPath(imagePath);
	this.x=100;
	this.y=250;
	this.speed=10;
	
	}
	
	function rectIntersects(a,b){
	if(b.y>a.y&&b.y<a.y+a.image.height){
	 if(b.x>a.x&&b.x<a.x+a.image.height)
		{return true;}
	}
		return false;
	};
