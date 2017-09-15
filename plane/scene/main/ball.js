function Ball(game)
	{
		//var ball= new createImage('ball.png');
		var ball=game.imageByName('ball');
		ball.y=200;
		ball.x=100
		ball.speedx=5;
		ball.speedy=5;
		ball.fired=false;
		ball.fire=function(){ball.fired=true;};
		ball.red=function(){ball.speedy*=-1;};
		ball.move=function(){
			if(ball.fired)
			{
				if(ball.x<0||ball.x>400)
				{
				ball.speedx=-ball.speedx;
				}
				if(ball.y<0||ball.y>300)
				{
				ball.speedy=-ball.speedy;
				}
				//move
				ball.x+=ball.speedx;
				ball.y+=ball.speedy;
			}
		};
		ball.hasPoint=function(x,y){
			var xIn=x>=ball.x&&x<=ball.x+ball.w;
			var yIn=y>=ball.y&&y<=ball.y+ball.h;
			return xIn&&yIn;
		}
		return ball;
	}