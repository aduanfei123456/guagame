function Block(game,position)
	{
	var p=position;
	//var block=new createImage('block.png');
	var block=game.imageByName('block');
	
	
	block.x=p[0];
	block.y=p[1];
	block.w=50;
	block.h=20;
	block.alive=true;
	block.kill=function()
	{
	block.alive=false;
	}
	block.collide=function(ball){
			return block.alive&&(rectIntersects(block,ball)||rectIntersects(ball,block));
		};
	return block;
	}