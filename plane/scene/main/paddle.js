function Paddle(game)
	{
		//var paddle=new createImage('paddle.png');
		var paddle=game.imageByName('paddle');
		paddle.collide=function(ball){
			/*if(ball.y+ball.h>paddle.y)
				{
				if(ball.x>paddle.x&&ball.x<paddle.x+paddle.w)
					{return true;}
				}
			return false;
		}*/
		var a=paddle;
		var b=ball;
		function aInb(x,x1,x2){
			
			return x>=x1&&x<=x2;
		}
		if(aInb(a.x,b.x,b.x+b.w)||aInb(b.x,a.x,a.x+a.w))
			if(aInb(a.y,b.y,b.y+b.h)||aInb(b.y,a.y,a.y+a.h))
				return true;
			return false;
		}
		paddle.x=100;
		paddle.y=250;
		paddle.speed=15;
		paddle.move=function(x){ 
		if(x<0)
		{x=0;}
		if(x>400-paddle.w)
			{
			x=400-paddle.w;
			}
			paddle.x=x;
		}
		paddle.moveLeft=function(){
			paddle.move(this.x-this.speed)
		};
		paddle.moveRight=function(){
			paddle.move(this.x+this.speed)
		};
		return paddle;
	}
	