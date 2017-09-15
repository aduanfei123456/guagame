	function loadLevel(game,n){
		n=n-1;
		var blocks=[];
		var le=levels[n];
		
		for(var i=0;i<le.length;i++){ 
		var p=le[i];
		
		var b=Block(game,p);
	//b.x=i*150；
		blocks.push(b);
			}
		return blocks;
	};
	var paused=false;
	
	var enableDebugMode=function(enable){
	if(!enable){
		return ;
	}
		window.addEventListener('keydown',function(event){
		if(event.key=='p')
		{
			paused=!paused;}
		});
		document.querySelector("#id-input-speed").addEventListener('input',function(event)
		{
		var input=event.target;
		//log(event,input.value);
		fps=Number(input.value);
		});
	}
	

	
	
	function main(){
	var images={
		block:'img/block.png',
		paddle:'img/bullet.png',
		sky:'img/sky.jpg',
		player:'img/player.png',
		enemy0:'img/enemy0.png',
		enemy1:'img/enemy1.png',
		enemy2:'img/enemy2.png',
		enemy3:'img/enemy3.png',
		bullet:'img/bullet.png',
		fire:'img/fire.jpg',
		bg:'img/flappybird/bg_day.png',
		ground:'img/flappybird/land.png',
		b1:'img/flappybird/bird0_0.png',
		b2:'img/flappybird/bird0_1.png',
		b3:'img/flappybird/bird0_2.png',
		p1:'img/flappybird/pipe_down.png',
		p2:'img/flappybird/pipe_up.png'
		}
	var game= GuaGame.instance(images,function(g){
	var scene=new Scene(g)
	var scenetitle=new SceneTitle(g,scene)
	var scenend=new SceneEnd(g,scenetitle)
	scene.end=scenend
/*	var scene= new SceneTitle(g);
	blocks=loadLevel(g,1);*/
	g.runWithScene(scenetitle)

	})
	enableDebugMode(true);
	//runloop();
	}