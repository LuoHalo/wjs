/**
 * Created by Administrator on 2016/10/11.
 */

'use strict';
$(function () {
    //获取屏幕的宽度
    function resize(){
        var windowWidth = $(window).width();
        //判断屏幕属于大还是小
        var isSmallScreen = windowWidth < 768;
        //console.log(11);
        //根据大小为界面上的每一张轮播图设置背景
        //$('#main_ad > .carousel-inner > .item') 获取到以恶搞DON 数组
        $('#main_ad > .carousel-inner > .item').each(function (i,item) {
            var $item=$(item); // 因为拿到的是DOM对象，需要转换
            var imgSrc=$item.data(isSmallScreen? 'image-xs':'image-lg');
            $item.css('backgroundImage','url("' + imgSrc + '")');
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt="" />')
            }else{
                $item.empty();
            }
        });
        // tab栏宽度适应
        var $tabs = $('.nav-tabs');
        $tabs.each(function(i, item) {
            var $tab = $(this);
            var width = 30;
            $tab.children().each(function(ci, citem) {
                width += $(citem).width();
            });
            if (width > $(window).width()) {
                $tab.css('width', width);
                $tab.parent().css('overflow-x', 'scroll');
            } else {
                $tab.css('width', 'auto');
                $tab.parent().css('overflow-x', 'hidden');
            }
        });
        
        //a点击注册事件
        var $newTitle=$('.news-title');
        $('#news .nav-pills a').on('click', function () {
            //获取当前点击事件
            var $this=$(this);
            //获取对应title的值
            var title = $this.data('title');
            //设置到相应位置
            $newTitle.text(title);
        });

        //获取界面的轮播图容器
        var $carousels = $('.carousel');
        //注册滑动事件
        var startX,endX;
        var offset = 50;
        $carousels.on('touchstart', function (e) {
            //第一次点击的点坐标X
            startX=e.originalEvent.touches[0].clientX;
            //console.log(startX);
        });

        $carousels.on('touchmove', function (e) {
            endX=e.originalEvent.touches[0].clientX
            //console.log(endX);
        });
        $carousels.on('touchend', function (e) {
            //console.log(endX);
            var distance=Math.abs(startX-endX);
            if(distance > offset) {
                //有方向变化
                //console.log(startX > endX ? '1' : '2 ');
                //根据获得到的方向选择上一张或者下一张
                $(this).carousel(startX > endX ? 'next':'prev')
            }
        });
        //1.获取手指在轮播图元素上的一个滑动方向（左右）

        //2.根据获得的方向选择上一张或者上一张

    }
   $(window).on('resize',resize).trigger('resize');
    // 提示框效果
    $('[data-toggle="tooltip"]').tooltip();
});
