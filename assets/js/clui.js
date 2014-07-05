/**
 * Main JS file for CLUI
 */
(function ($){
	"use strict";

	// Build gallery in post
	$.fn.cluiPostGallery = function(){
		var
		gallery = this,
		galleryWidth = gallery.parent().width(),
		col = (gallery.attr('data-col') != '') ? gallery.attr('data-col') : '3',
		group = (gallery.attr('data-group') != '') ? gallery.attr('data-group') : '0',
		imgSum = gallery.find('img').length,
		imgSize = galleryWidth/col;
	
		gallery.css({'width':galleryWidth+'px','height':Math.ceil(imgSum/col)*imgSize+'px'});
		
		if(imgSum > 0){
			gallery.find('img').each(function(){
				var $img = $(this);
				var src = $img.attr('src');
				var title = $img.attr('alt');
				gallery.append($('<div class="clui-gallery-img"><a class="clui-gallery-'+group+'" href="'+src+'" title="'+title+'">&nbsp;</a></div>').css({'background':'url('+src+') center center', 'background-size':'cover', 'width':imgSize+'px', 'height':imgSize+'px', 'float':'left'}));
				$img.remove();
			});
		};
		$('div.clui-gallery-img').css({'width':imgSize+'px','height':imgSize+'px'});
		$('a.clui-gallery-'+group).css({'display':'block','width':imgSize+'px','height':imgSize+'px'});
	};
	var coutCover = 0;
	// Postcover on homepage
	$.fn.cluiPostCover = function(){
		var 
		$tagHolder = this.find('.post-header .post-meta a:not(.hide)'),
		$picHolder = this.find('div.atcl-pic'),
		$titleHolder = this.find('.post-title a'),
		$urlHolder = this.find('.post-title'),
		postUrl = ($urlHolder.attr('data-url') != null) ? $urlHolder.attr('data-url') : '#',
		postCoverImg = this.find('img[alt="post-cover-img"]'),
		postCoverIcon = this.find('i[class="post-cover-icon"]'),
		postCoverIconName = (postCoverIcon.attr('data-icon') != null) ? postCoverIcon.attr('data-icon') : 'fa-bookmark',
		postCoverIconColor = (postCoverIcon.attr('data-color') != null) ? postCoverIcon.attr('data-color') : '',
		postCoverIconBgColor = (postCoverIcon.attr('data-bg-color') != null) ? postCoverIcon.attr('data-bg-color') : '#E6E6E6';
		
		$tagHolder.addClass('post-tag');
		
		$picHolder.find('h4').css({'width':$picHolder.width()+12+'px'});
		
		$(window).resize(function(){
			$picHolder.find('h4').css({'width':$picHolder.width()+12+'px'});
		});
		
		if(postCoverImg.attr('src') == null){
			$picHolder.css({
				'background':postCoverIconBgColor
			}).prepend($('<a href="'+postUrl+'" class="atcl-pic-holder"><i class="fa '+postCoverIconName+' fa-lg fa-5x"></i></a>').css({'color':postCoverIconColor,'height':$picHolder.height()+'px','line-height':$picHolder.height()+'px'}));
		}else{
			$picHolder.css({
				'background':'url('+postCoverImg.attr('src')+') center center',
				'background-size':'cover'
			});
		}
		
		postCoverImg.remove();
		postCoverIcon.remove();
	}

	/*globals jQuery, document */
	$(document).ready(function(){
		
		// insert Tag name into post navbar
		if($('.post-tag').text() != ''){
			$('.navbar-brand-sub').text('/ '+$('.clui-post-tag').text());
		};
	
		// add Cover to each article in homepage
		$('article').each(function(){
			$(this).cluiPostCover();
			coutCover +=1;
		});
	
		// jscroll
		if(coutCover > 5){
		$('.main-content .posts-holder').jscroll({
			loadingHtml: '<div class="col-md-12 text-center" style="padding:12px 0"><i class="fa fa-cog fa-spin fa-lg"></i></div>',
			nextSelector: 'a.older-posts',
			contentSelector: 'div.posts-holder',
			callback: function(){
				// move each article to .post-holder
				
				$(this).find('article').each(function(){
					$(this).cluiPostCover();
					$(this).insertAfter($(this).parent().parent().siblings().filter('article').last());
					$(this).find('div.atcl-pic h4').css({'width':$(this).width()+12+'px'});
				});
			}
		});
		}
	
		// build gallery in post
		// Lightbox with colorbox
		if($('.clui-gallery').length > 0){
			$('.clui-gallery').each(function(){
				var $box = $(this);
				$box.cluiPostGallery();
				$box.find('a').colorbox({rel:'clui-gallery-'+$(this).attr('group'), transition:"fade"});
				$(window).resize(function(){
					$box.cluiPostGallery();
				});
			});
		}
	
		$('.jscroll-loading').remove();
		
		$('#back-home').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
		});				
		// hide #back-top first
		$("#back-top").hide();
		
		// fade in #back-top
		$(function () {
			$(window).scroll(function () {	
				if ($(this).scrollTop() > 100) {					
					$('#back-top').removeClass('hide').fadeIn();
				} else {
					$('#back-top').fadeOut();
				}
			});

			// scroll body to 0px on click
			$('#back-top a').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		});
		$('pre').each(function(i, e) {hljs.highlightBlock(e)});
		
		var winHeight = $(window).height(), 
			docHeight = $(document).height(),
			progressBar = $('progress'),
			max, value;

		  /* Set the max scrollable area */
		max = docHeight - winHeight;
		progressBar.attr('max', max);
		if(max < 100)
			progressBar.attr('value', 100);

		$(document).on('scroll', function(){
			value = $(window).scrollTop();
			if(max < 100)
			progressBar.attr('value', 100);
			else
			progressBar.attr('value', value);
		});
	});
})( jQuery );
