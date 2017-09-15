
class SceneEnd extends GuaScene{
		constructor(game,title){
			super(game)
			this.title=title
			game.registerAction('r',function(){
			//var s=new SceneTitle(game)
			game.replaceScene(title)
			})
			
		}
		draw(){
		this.game.context.fillText('游戏结束,r返回标题',100,250)
		}
		
	}