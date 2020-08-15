// 获取元素

var getElem = function( selector ){
  return document.querySelector(selector);
}
var getAllElem = function( selector ){
  return document.querySelectorAll(selector);
}
// 获取元素的样式
var getCls = function ( element ) {
  return element.getAttribute('class');
}
// 设置元素的样式
var setCls = function( element ,cls){
  return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function( element , cls ){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) === -1){
      setCls(element,baseCls+' '+cls); // 注意空格
  }
  return ;
}
// 为元素删减样式
var delCls = function( element , cls){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) > -1){ // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
      setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
  }
  return ;
}

//第一步：初始化样式 把全部的样式设置成init
setTimeout(function(){playScreenAnimateDone('.screen-1');},300)
var screenAnimateElements = {

  '.screen-1' : [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
  ],
  '.screen-2' : [
    '.screen-2__heading',
    '.screen-2__subheading',
    '.screen-2__phone',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3' : [
    '.screen-3__heading',
    '.screen-3__phone',
    '.screen-3__subheading',
    '.screen-3__features',
  ],
  '.screen-4' : [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',
  ],
  '.screen-5' : [
     '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5__bg',
  ]
};
//设置屏内元素为初始状态
var setScreenAnimateInit = function( screenCls ){
  var screen = document.querySelector(screenCls); // 获取当前屏的元素
  var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
  for(var i=0;i<animateElements.length;i++){
            var element = document.querySelector(animateElements[i]);
            var baseCls = element.getAttribute('class');
            element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
        }
}
// 设置播放屏内的元素动画
var playScreenAnimateDone = function(screenCls){
        var screen = document.querySelector(screenCls); // 获取当前屏的元素
        var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
  for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
      }
}

window.onload = function(){
  console.log('onload');
for(k in screenAnimateElements){
  setScreenAnimateInit(k);
}
}
// 第二步：滚动到哪里就播放到哪里
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');

var switchNavItemsActive = function( idx ){//导航条提示功能

  for( i =0;i<navItems.length;i++){
    delCls(navItems[i],'header__nav-item_status_active');
  }
  addCls(navItems[idx],'header__nav-item_status_active');
}

window.onscroll = function(){
  var top = document.documentElement.scrollTop;
  //这里不能用document.body.scrollTop
// 页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement。
// 页面没有DTD，即没指定DOCTYPE时，使用document.body。
  if( top > 80 ){
      addCls( getElem('.header'),'header_status_black' );
      addCls( getElem('.outline'),'outline_status_in' );
  }else{
      delCls( getElem('.header'),'header_status_black' );
      delCls( getElem('.outline'),'outline_status_in' );
      switchNavItemsActive(0);
  }
  if(top > 1){
    playScreenAnimateDone('.screen-1');
    switchNavItemsActive(0);
  }
  if(top > 800*1 -150){
    playScreenAnimateDone('.screen-2');
    switchNavItemsActive(1);
  }
  if(top > 800*2-150){
    playScreenAnimateDone('.screen-3');
    switchNavItemsActive(2);
  }
  if(top > 800*3-150){
    playScreenAnimateDone('.screen-4');
    switchNavItemsActive(3);
  }
  if(top > 800*4-200){
    playScreenAnimateDone('.screen-5');
    switchNavItemsActive(4);
  }}
//导航条的双向定位
var setNavJump = function(i,lib){
  var item = lib[i];
  item.onclick = function(){
    document.documentElement.scrollTop = i*800;
  }
}
for(var i=0;i<navItems.length;i++){
  setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
  setNavJump(i,outlineItems);
}