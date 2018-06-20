window.getMenuRoot=function(el) {
	/*Menu*/
	while(el=el.parentElement) {
		if(el.className!=undefined && el.className.indexOf("menu-root")!=-1)
			return el;
	}
	return el;	
}


window.onload = function()
{



	/*Menu*/
	var mTypArr=["pri", "sec", "suc", "dng" , "wrn", "inf", "lgt", "drk"];

	for(var typEl=0;typEl<mTypArr.length;typEl++) {
		var aTags=document.querySelectorAll(".menu-"+mTypArr[typEl]+" a");
		for( var k=0;k<aTags.length;k++) {
			aTags[k].addEventListener("click",function(el) {

				var mTyArr=["pri", "sec", "suc", "dng" , "wrn", "inf", "lgt", "drk"];
				//set active cursor
				if(el.target.className.indexOf("menu-nosel")==-1) {
					var parentEl=window.getMenuRoot(el.target);
					for(var tyEl=0;tyEl<mTyArr.length;tyEl++) {
						var aActive=parentEl.querySelectorAll(".active-"+mTyArr[tyEl]);
						if(aActive.length>0) {
							for(var i=0;i<aActive.length;i++) 
								aActive[i].classList.remove("active-"+mTyArr[tyEl]);
							el.target.classList.add("active-"+mTyArr[tyEl]);
						}
					}
				}
				
				var width = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
				
				if(width<768 && el.target.nextSibling!=null) {
					let arr=el.target.parentElement.childNodes;
					for(var i=0;i<arr.length;i++) {
						if(arr[i]==el.target) {
							if(arr[i+2].style.display=='' || arr[i+2].style.display=="none" || arr[i+2].style.display===undefined) 
								arr[i+2].style.display="flex";
							else
								arr[i+2].style.display="";
							break;
						}
					}
				}
				
			});
		}
	}






	/*Checkbox*/
	var cbClick=function(el) {
		if(	el.target.className!=undefined)
		{
			var mTyArr=["pri", "sec", "suc", "dng" , "wrn", "inf", "lgt", "drk"];
			var isUnchecked=false;
			var uncheckedClass="";
			for(var i=0;i<mTyArr.length;i++) {
				if(el.target.className.indexOf("unchecked-"+mTyArr[i]+"l")!=-1) {
					isUnchecked=true;
					uncheckedClass=mTyArr[i]+"l";
					break;
				}

				if(el.target.className.indexOf("unchecked-"+mTyArr[i]+"r")!=-1) {
					isUnchecked=true;
					uncheckedClass=mTyArr[i]+"r";
					break;
				}
			}

			if(!isUnchecked) {
				for(var i=0;i<mTyArr.length;i++) {
					if(el.target.className.indexOf("checked-"+mTyArr[i]+"l")!=-1) {
						uncheckedClass=mTyArr[i]+"l";
						break;
					}
	
					if(el.target.className.indexOf("checked-"+mTyArr[i]+"r")!=-1) {
						uncheckedClass=mTyArr[i]+"r";
						break;
					}
				}
			}

			if(isUnchecked) {
				el.target.classList.remove("unchecked-"+uncheckedClass);
				el.target.classList.add("checked-"+uncheckedClass);
			}
			else {
				el.target.classList.remove("checked-"+uncheckedClass);
				el.target.classList.add("unchecked-"+uncheckedClass);
			}
		}
	}
	for(var i=0;i<mTypArr.length;i++) {
		var arrCb=[	".checked-"+mTypArr[i]+"l", 
					".unchecked-"+mTypArr[i]+"l",
					".checked-"+mTypArr[i]+"r", 
					".unchecked-"+mTypArr[i]+"r"];
		
		for(var j=0;j<arrCb.length;j++) {
			var aTags=document.querySelectorAll(arrCb[j]);
			for( var k=0;k<aTags.length;k++) 
				aTags[k].addEventListener("click",cbClick);
		}
	}





	/*List*/
	for(var typEl=0;typEl<mTypArr.length;typEl++) {
		var aTags=document.querySelectorAll(".list-"+mTypArr[typEl]+" a");
		for( var k=0;k<aTags.length;k++) {
			aTags[k].addEventListener("click",function(el) {
				var mTyArr=["pri", "sec", "suc", "dng" , "wrn", "inf", "lgt", "drk"];
				//set active cursor
				for(var tyEl=0;tyEl<mTyArr.length;tyEl++) {
					var aActive=el.target.parentElement.parentElement.querySelectorAll(".active-"+mTyArr[tyEl]);
					if(aActive.length>0) {
						for(var i=0;i<aActive.length;i++) 
							aActive[i].classList.remove("active-"+mTyArr[tyEl]);
						el.target.classList.add("active-"+mTyArr[tyEl]);
					}
				}
			});
		}
	}




	/*Lightbox galleries*/
	window.typ=[];
	window.setNextImage=function(node) {
		node.cur=node.cur.nxt;
		var imgAr=node.querySelectorAll(".bdy>img");
		if(imgAr.length>0) 
			imgAr[0].src=node.cur.src;
		var imgHdr=node.querySelectorAll(".hdr>.h2");
		if(imgHdr.length>0) 
			imgHdr[0].innerText=node.cur.title;
	}

	window.setPrevImage=function(node) {
		node.cur=node.cur.prv;
		var imgAr=node.querySelectorAll(".bdy>img");
		if(imgAr.length>0) 
			imgAr[0].src=node.cur.src;
		var imgHdr=node.querySelectorAll(".hdr>.h2");
		if(imgHdr.length>0) 
			imgHdr[0].innerText=node.cur.title;
	}

	//Add image click
	window.addClickEvntModal=function(objTrgt) {
		objTrgt.addEventListener("click", function(el) {
			var parentNode=doc;
			var bodyTag=document.querySelectorAll("body");
			var htmlTag=document.querySelectorAll("html");
			var doc=document.documentElement;//html
			if(bodyTag.length>0) parentNode=bodyTag[0];
			else if(htmlTag.length>0) parentNode=htmlTag[0];
			var elOld=document.querySelectorAll(".gal-mdlc-"+el.target.styl);
			if(elOld.length>0)	elOld[0].remove();
			parentNode.insertAdjacentHTML("afterBegin", '\
			<div class="gal-mdlc-'+el.target.styl+'">\
				<div class="mcnt">\
					<div class="hdr">\
						<div class="h2">'+el.target.title+'</div>\
						<label class="mcls clsbl">&#x2715;</label>\
					</div>\
					<div class="bdy">\
						<img src="'+el.target.src+'">\
					</div>\
					<div class="ftr">\
						<label class="btn prv">&#xf137;</label>\
						<label class="btn clsbl">CLOSE</label>\
						<label class="btn nxt">&#xf138;</label>\
					</div>\
				</div>\
			</div>');
			var anim=parentNode.querySelectorAll('.gal-mdlc-'+el.target.styl);
			if(anim.length>0) 
			{
				window.setTimeout(function () {
					anim[0].style.opacity=1;
					anim[0].style.height="100vh";
				},10);
			}

			//Close Btn
			var elAr=parentNode.querySelectorAll(".gal-mdlc-"+el.target.styl+" .clsbl");
			if(elAr.length>0)
			for(var i=0;i<elAr.length;i++) {
				elAr[i].addEventListener("click", function(el) {
					el.target.parentNode.parentNode.parentNode.remove();
				});
				elAr[i].styl=el.target.styl;
				elAr[i].parentNode.parentNode.parentNode.cur=el.target;
			}

			//Next Image
			var nxtEl=parentNode.querySelectorAll(".gal-mdlc-"+el.target.styl+" .ftr .nxt");
			if(nxtEl.length>0) {
				nxtEl[0].addEventListener("click", function(el) {
					window.setNextImage(el.target.parentNode.parentNode.parentNode)
				});
				nxtEl[0].cur=el.target.cur;
			}

			//Prev Image
			var prvEl=parentNode.querySelectorAll(".gal-mdlc-"+el.target.styl+" .ftr .prv");
			if(prvEl.length>0) {
				prvEl[0].addEventListener("click", function(el) {
					window.setPrevImage(el.target.parentNode.parentNode.parentNode)
				});
				prvEl[0].cur=el.target.cur;
			}
		});
	}

	var mArr=["pri", "sec", "suc", "dng" , "wrn", "inf", "lgt", "drk"];
	for(var i=0;i<mArr.length;i++) {
		//Разделить между собой галлери
		var Lightbox=document.querySelectorAll(".modal-gal-"+mArr[i]);
		for(var j=0;j<Lightbox.length;j++) {
			imgs=Lightbox[j].querySelectorAll("span>img");
			for(var k=0;k<imgs.length;k++) {
				if((k+1)==imgs.length)
					imgs[k].nxt=imgs[0];
				else 
					imgs[k].nxt=imgs[k+1];

				if(k==0)
					imgs[k].prv=imgs[imgs.length-1];
				else
					imgs[k].prv=imgs[k-1];
				/*
				imgs[k].curNum=k;
				imgs[k].cnt=imgs.length;
				*/
			}
		}

		var Lightbox=document.querySelectorAll(".modal-gal-"+mArr[i]+">span>img");
		if(Lightbox.length>0) {
			for(var j=0;j<Lightbox.length;j++) {
				Lightbox[j].styl=mArr[i];
				window.addClickEvntModal(Lightbox[j]);
			}
		}
	}





	//Counters
	document.tmrObj={
		state:0,//0-stopped 1-started
		tm:new Date("2019-07-16 16:00"),//19:00-3hours GMT = 16:00

		updateTmr:function(id) {
			var el=document.getElementById(id);
			var signsAr=el.querySelectorAll("div>div>span");
			//signsAr[0].style.opacity
			//signsAr[0].style.opacity=0;
			//Часы
			signsAr[0].innerText="9";
			signsAr[1].innerText="8";
			//Минуты
			signsAr[2].innerText="7";
			signsAr[3].innerText="6";
			//Секунды
			signsAr[4].innerText="5";
			signsAr[5].innerText="4";
			
			//signsAr[0].style.opacity=1;
			//signsAr[0].style.transform='skewX(25deg)';
			//signsAr[0].style.transform='perspective( 100px ) rotateX( -90deg )';
			//signsAr[0].parentNode.insertAdjacentHTML("<span>8<span>");
			//console.log(document.tmrObj.tm-(new Date()));
			var sec=Math.floor((document.tmrObj.tm-(new Date()))/(1000));
			var min=Math.floor((document.tmrObj.tm-(new Date()))/(1000*60));
			var hours=Math.floor((document.tmrObj.tm-(new Date()))/(1000*60*60));
			var days=Math.floor((document.tmrObj.tm-(new Date())) / (1000*60*60*24));
			var months=Math.floor((document.tmrObj.tm-(new Date())) / (1000*60*60*24*12))-1;
			var years=Math.floor((document.tmrObj.tm-(new Date())) / (1000*60*60*24*365));
			console.log(
				//Math.floor((document.tmrObj.tm-(new Date())) / (1000*60*60*24))
				years
			);
		},

		onTimerStart:function(id) {
			setTimeout(document.tmrObj.updateTmr(id),100);
		},
		
		onTimerStop:function() {
			console.log('onTimerStop');
			console.log(document.tmrObj.tm);
		}
	};



	/*Slider*/
	document.slides={
		gal1:[
			{
				title:'title1',
				descr:'descr1',
				lnk:'<a href="#">Link1</a>',
				img:'images/01.jpg'
			},
			{
				title:'title2',
				descr:'descr2',
				lnk:'<a href="#">Link2</a>',
				img:'images/02.jpg'
			},
			{
				title:'title3',
				descr:'descr3',
				lnk:'<a href="#">Link3</a>',
				img:'images/03.jpg'
			},
			{
				title:'title4',
				descr:'descr4',
				lnk:'<a href="#">Link4</a>',
				img:'images/04.jpg'
			},
			{
				title:'title5',
				descr:'descr5',
				lnk:'<a href="#">Link5</a>',
				img:'images/01.jpg'
			},
			{
				title:'title6',
				descr:'descr6',
				lnk:'<a href="#">Link6</a>',
				img:'images/02.jpg'
			},
			{
				title:'title7',
				descr:'descr7',
				lnk:'<a href="#">Link7</a>',
				img:'images/03.jpg'
			},
			{
				title:'title8',
				descr:'descr8',
				lnk:'<a href="#">Link8</a>',
				img:'images/04.jpg'
			}
		],

		gal2:[
			{
				title:'title2',
				descr:'descr2',
				lnk:'<a href="#">Link2</a>',
				img:'images/02.jpg'
			},
			{
				title:'title1',
				descr:'descr1',
				lnk:'<a href="#">Link1</a>',
				img:'images/01.jpg'
			},
			{
				title:'title4',
				descr:'descr4',
				lnk:'<a href="#">Link4</a>',
				img:'images/04.jpg'
			},
			{
				title:'title3',
				descr:'descr3',
				lnk:'<a href="#">Link3</a>',
				img:'images/03.jpg'
			},
			{
				title:'title6',
				descr:'descr6',
				lnk:'<a href="#">Link6</a>',
				img:'images/02.jpg'
			},
			{
				title:'title5',
				descr:'descr5',
				lnk:'<a href="#">Link5</a>',
				img:'images/01.jpg'
			},
			{
				title:'title7',
				descr:'descr7',
				lnk:'<a href="#">Link7</a>',
				img:'images/03.jpg'
			},
			{
				title:'title3',
				descr:'descr3',
				lnk:'<a href="#">Link3</a>',
				img:'images/03.jpg'
			},
			{
				title:'title6',
				descr:'descr6',
				lnk:'<a href="#">Link6</a>',
				img:'images/02.jpg'
			},
			{
				title:'title5',
				descr:'descr5',
				lnk:'<a href="#">Link5</a>',
				img:'images/01.jpg'
			},
			{
				title:'title7',
				descr:'descr7',
				lnk:'<a href="#">Link7</a>',
				img:'images/03.jpg'
			}
		]

	}


	//Slide Click Function
	document.slidesClickFn=function(el) {
		var obj=el.currentTarget || el.target;
		var slide=obj.parentNode.parentNode.querySelectorAll('.sld>img');
		var imgClicked=obj.querySelectorAll('img');
		if(slide.length>0)
			slide[0].src=imgClicked[0].src;

		var actives=obj.parentNode.parentNode.querySelectorAll('.active');
		for(var i=0;i<actives.length;i++) 
			actives[i].classList.remove("active");
		obj.classList.add("active");

		var numL=obj.parentNode.style.marginLeft||0;
		if(numL!=0) 
			numL=Math.ceil(parseInt(numL.substr(0,numL.length-2))/100)*-1;
		numL++;
		
		if(obj.gal.num>1 && obj.gal.num<obj.gal.cnt) {
			if(obj.gal.num==numL+4) 
				//Move right
				setTimeout(function(){
					obj.parentNode.style.marginLeft='-'+((obj.gal.num-4)*100)+'px';
				},100);
			if(obj.gal.num==numL) 
				//Move left
				setTimeout(function(){
					obj.parentNode.style.marginLeft='-'+((obj.gal.num-2)*100)+'px';
				},100);
		}
	}



	//Init gals
	for(var itm in document.slides) {
		var arr=document.slides[itm];
		var gals=document.querySelectorAll('div[name="'+itm+'"]');
		if(gals.length>0) {

			var gal=gals[0];
			var strCnt="";
			for(var i=0;i<arr.length;i++) {
				strCnt+='\
				<div class="hldr">\
					<img src="'+arr[i].img+'">\
				</div>';
			}
			if(arr.length>0) {
				var slide=gal.querySelectorAll('.sld>img');
				if(slide.length>0)
					slide[0].src=arr[0].img;
			}

			var scrl=gal.querySelectorAll('.scrl');
			if(scrl.length>0) {
				scrl[0].innerHTML="";
				scrl[0].innerHTML=strCnt;
			}

			var hldrs=gal.querySelectorAll('.hldr');
			for(var j=0;j<hldrs.length;j++) {
				hldrs[j].gal={num:j+1, cnt:hldrs.length};
				hldrs[j].addEventListener('click',document.slidesClickFn);
			}
		}
	}


	


	//Sticky
	window.onscroll = function() {myFunction()};
	var header = document.getElementById("myHeader");
	if(header!=null) {
		var sticky = header.offsetTop;
		function myFunction() {
			if (window.pageYOffset >= sticky) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		} 
	}






	//Audio player
	var audio = document.querySelectorAll('#container');
	if(audio.length>0) {
		audio[0].addEventListener('click',function(){
			var isSupportOgg=(new Audio()).canPlayType("audio/ogg; codecs=vorbis");
			var isSupportMp3=(new Audio()).canPlayType("audio/mpeg;");

			var obj=new Audio('https://html5book.ru/examples/media/track.mp3').play();
			obj.pause();

			var snd = document.querySelectorAll('#sound');
			if(snd.length>0)
				snd[0].play();

		});
	}




	//video player
	//https://habr.com/company/microsoft/blog/127295/
}
