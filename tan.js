$(function(){
  // function tan(){
	var box=$('#box');
	// 表格   环境
	for(var i=0;i<20;i++){
			for(var n=0;n<20;n++){
			var div=$('<div>');
			div.id=i+"-"+n;
			box.appendChild(div);

		}
	}
	// 蛇
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
		for(var i=0;i<she.length;i++){
			var obj=$('#'+she[i].x+'-'+she[i].y);
			obj.className='she';
		}
	// 食物
	function Food(){
		do{
			var x=Math.floor(Math.random()*20);
			var y=Math.floor(Math.random()*20);
		}while(panduan(x,y));

		
		
		var obj=$('#'+x+'-'+y);
			obj.className='food';

		return {x:x,y:y};
	}
	// 判断函数
	function panduan(a,b){
		for(var i=0;i<she.length;i++){
			if(she[i].x==a&&she[i].y==b){
				return true
			}				
		}
		return false
	}

	
	var food=Food();
	// var foodobj=$('#'+food.x+'-'+food.y);
	// foodobj.className='food';

	var fangxiang='you';
	var a;
	var b;
// 蛇动
	var span=$('span')[0];
	var jsh=$('span')[1];
	var li=$('li')[0];
	var flag=1;
	li.onclick=function(){
		
		span.style.display='none';
		var t=setInterval(run,200);
		function run(){
				var jiuT=she[she.length-1];
			if(fangxiang=='you'){
				var newT=$('#'+jiuT.x+'-'+(jiuT.y+1));
				if(newT==null||panduan(jiuT.x,jiuT.y+1)){
					jsh.style.display='block';
					clearInterval(t);
					return;
				}
				a=jiuT.x;
				b=jiuT.y+1;
				newT.className='she';
				she.push({x:jiuT.x,y:jiuT.y+1});
			}
			else if(fangxiang=='shang'){
				var newT=$('#'+(jiuT.x-1)+'-'+jiuT.y);
				if(newT==null||panduan(jiuT.x-1,jiuT.y)){
					jsh.style.display='block';
					clearInterval(t);
					return;
				}
				a=jiuT.x-1;
				b=jiuT.y;
				newT.className='she';
				she.push({x:jiuT.x-1,y:jiuT.y});
			}
			else if(fangxiang=='xia'){
				var newT=$('#'+(jiuT.x+1)+'-'+jiuT.y);
				if(newT==null||panduan(jiuT.x+1,jiuT.y)){
					jsh.style.display='block';
					clearInterval(t);
					return;
				}
				a=jiuT.x+1;
				b=jiuT.y;
				newT.className='she';
				she.push({x:jiuT.x+1,y:jiuT.y});
			}
			else if(fangxiang=='zuo'){
				var newT=$('#'+jiuT.x+'-'+(jiuT.y-1));
				if(newT==null||panduan(jiuT.x,jiuT.y-1)){
					jsh.style.display='block';
					clearInterval(t);
					return;
				}
				a=jiuT.x;
				b=jiuT.y-1;
				newT.className='she';
				she.push({x:jiuT.x,y:jiuT.y-1});
			}

			if(food.x==a&&food.y==b){
				food=Food();
			}
			else {
				var sheW=$('#'+she[0].x+'-'+she[0].y);
				sheW.className='';
				she.shift();
			}
				
			}
		document.onkeydown=function(e){
			var e=e||window.event;
			var nub=e.keyCode;
			if(nub==37){
				
				if(fangxiang=='you'){
					return;
				}
				fangxiang='zuo';
			}
			else if(nub==38){
				
				if(fangxiang=='xia'){
					return;
				}
				fangxiang='shang';
			}
			else if(nub==39){
				
				if(fangxiang=='zuo'){
					return;
				}
				fangxiang='you';
			}
			else if(nub==40){
				
				if(fangxiang=='shang'){
					return;
				}
				fangxiang='xia';
			}
		}
		var lii=$('li')[2];
		lii.onclick=function(){
		clearInterval(t);
		span.style.display='block';
		}
}
})