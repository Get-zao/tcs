// 兼容性获取元素
function getClass(className,obj){
	var obj=obj||document
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(className);
	}
	else{
		var arr=[];
		var t=obj.getElementsByTagName('*');
		for(var i=0;i<t.length;i++){
			if(bijiao(t[i],className)){
				arr.push(t[i]);
			}
		}
		return arr;
	}
}
function bijiao(obj,className){
	var classStr=obj.className;
	var fenge=classStr.split(" ");
		for(var i=0;i<fenge.length;i++){
		if(fenge[i]==className){
			return true;
		}
		
	}return false;
}

//  获取内容

// function getText(obj){
// 	if(obj.innerText){
// 		return obj.innerText;
// 	}else{
// 		return obj.textContent;
// 	}
// }


// 获取并设置内容

function operateText(obj,val){
	if(val!=undefined){
		// 设置内容
		if(obj.innerText){
			obj.innerText=val
		}else{
			obj.textContent;
		}
	}else{
		// 获取内容
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
}

// 获取样式

function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style];
	}else{
		return getComputedStyle(obj,null)[style];
	}
}


//$函数
function $(val,obj){
	if(typeof val=='string'){
		var	obj=obj||document;
		var val=val.replace(/^\s*|\s*$/g,'');
		if(val.charAt(0)=='#'){
			return obj.getElementById(val.slice(1));
		}else if(val.charAt(0)=='.'){
			return obj.getElementsByClassName(val.slice(1),obj);
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)){
			return obj.getElementsByTagName(val);
		}
		else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){ 
			return document.createElement(val.slice(1,-1))
		}
	}else if(typeof val=='function'){
		window.onload=function(){
			val()
		}
	}
}



//获取子节点
function getChilds(obj,type){
	var type=type||'no';
	var kids=obj.childNodes;
	var arr=[];
	for(var i=0;i<kids.length;i++){
	if(type=='no'){
			if(kids[i].nodeType=='1'){
				arr.push(kids[i]);
			}
		}else if(type=='yes'){
			if(kids[i].nodeType=='1'||kids[i].nodeType==3&kids[i].odevalue.replace(/^\s*|\s*$/g,''));
		}
	}
	return arr;
}


//获取第一个子节点
function getFirst(obj,type){
	var type=type||'no';
	return getChilds(obj,type)[0];
}


//获取最后一个子节点
function getLast(obj,type){
	var type=type||'no';
	var childs=getChilds(obj,type);
	return childs[childs.length-1];
}


//获取第N个子节点
function getN(obj,n,type){
	var type=type||'no';
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1];
}
//取兄弟节点
//obj.nextSibling
//obj.previousSibling

//获取下一个兄弟节点
function getNext(obj,type){
	var type=type||'no';
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	if(type=='no'){
		while(next.nodeType=='3'||next.nodeType=='8'){
			next=next.nextSibling;
				if(next==null){
					return false;
				}
			}
			return next;
	}else if(type=='yes'){
		while(next.nodeType=='3'&&!next.nodeValue.replace(/^\s*|\s*$/g,'')||next.nodeType=='8'){
		next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}

}

//获取上一个兄弟节点
function previous(obj,type){
	var type=type||'no';
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	if(type=='no'){
		while(previous.nodeType=='3'||previous.nodeType=='8'){
			previous=previous.previousSibling;
				if(previous==null){
					return false;
				}
			}
			return previous;
	}else if(type=='yes'){
		while(previous.nodeType=='3'&&!previous.nodeValue.replace(/^\s*|\s*$/g,'')||previous.nodeType=='8'){
		previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}

}

//插入对象之前
function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj);
}
//插入对象之后
function insertAfter(obj,afterObj){
	var parent=afterObj.parentNode;
	var next=getNext(afterObj,'yes');
	if(!next){
		parent.appendChild(obj);
	}else{
		parent.insertBefore(obj,next);
	}
}

//添加事件
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		return obj.attachEvent('on'+event,fun);
	}else if(obj.addEventListener){
		return obj.addEventListener(event,fun,false);
	}
}
//删除事件
function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		return obj.detachEvent('on'+event,fun);
	}else if(obj.removeEventListener){
		return obj.removeEventListener(event,fun,false);
	}
}
//鼠标滚轮事件
function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		document.attachEvent('mousewheel',scrollFun,false);
	}else{
		document.addEventListener('mousewheel',scrollFun,false);
		document.addEventListener('DOMMouseScroll',scrollFun,false);
	}
	
	function scrollFun(e){
		var e=e||window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else {
			e.returnValue=false;
		}
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			//改变this指针，让this指向obj
			up.call(obj);
		}else if(nub==-120||nub==3){
			down.call(obj);
		}
	}
}


//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}


//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}
