jQuery(document).ready(function($){
	"use strict";

	function collapse_sidebar(){
		$('.has-sidebar').addClass('small-sidebar');
		$('.btn-sidebar-toggle').addClass('active');
	}

	function expand_sidebar(){
		$('.has-sidebar').removeClass('small-sidebar');
		$('.btn-sidebar-toggle').removeClass('active');
	}

	function setup_layout(){
		var window_height = $(window).height();
		var window_width = $(window).width();
		var header_wrapper_height = $('.header-wrapper').outerHeight();	
		var footer_wrapper_height = $('.footer-wrapper').outerHeight();			

		if ($('.site-wrapper > .footer-wrapper').length){
			var main_wrapper_height = window_height - footer_wrapper_height;		
			$('.main-wrapper').css('min-height', main_wrapper_height);
		}else{
			 var main_wrapper_height = window_height;
			$('.main-wrapper').css('min-height', main_wrapper_height);

			if ($('.main-wrapper > .footer-wrapper').length && $('.site-wrapper.fixed-header').length){
				var site_content_height = window_height - footer_wrapper_height;
				$('.site-content').css('min-height', site_content_height);
				$('.site-content').css('padding-top', header_wrapper_height);
			}else if($('.main-wrapper > .footer-wrapper').length && !$('.site-wrapper.fixed-header').length){
				var site_content_height = window_height - footer_wrapper_height -header_wrapper_height;
				$('.site-content').css('min-height', site_content_height);				
			}
		}

		
		
		// Collapse & Expand Sidebar via viewport 
		if(window_width < 1200){
			collapse_sidebar();
		}else{
			expand_sidebar();
		}
	}

	setup_layout();

	$('.btn-sidebar-toggle').click(function(e){
		e.preventDefault();
		if($('.has-sidebar').hasClass('small-sidebar')){
			expand_sidebar();
		}else{
			collapse_sidebar();
		}
	});

	// $('.status-select').select2();
	// $('.select-css select').select2('destroy');

	$(window).resize(function(){
		setup_layout();
		// $('.status-select').select2();
		// $('.select-css select').select2('destroy');
	});

	//Icheck Init
	// $('.label-icheck input').iCheck({
	//     checkboxClass: 'icheckbox_square-blue',
	//     radioClass: 'iradio_square-blue',
	//     increaseArea: '20%' // optional
  	// });

	//Scroll Init
  	// $(".scroll").niceScroll({
	// 	cursorwidth:'2',
	// 	cursorborder:'0',
	// 	cursorcolor:'rgba(0,0,0,0.2)',		
	// });

	// $(".nice-scroll").niceScroll({
	// 	cursorwidth:'6',
	// 	cursorborder:'0',
	// 	cursorcolor:'rgba(0,0,0,0.2)'
	// });

	// $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	// 	$(".nice-scroll").getNiceScroll().resize();
	// });

	//Datatable Init
	// $('.datatable').DataTable({
	// 	dom:'t<"hr">p<"text-right text-secondary"i>',
	// 	searching: false,
	// 	lengthChange: false,
	// 	oLanguage: {
	// 		oPaginate: {
	// 			sFirst: '<span class="oi oi-arrow-thick-left"></span>', // This is the link to the first page
	// 			sPrevious: '<span class="oi oi-caret-left"></span>', // This is the link to the previous page
	// 			sNext: '<span class="oi oi-caret-right"></span>', // This is the link to the next page
	// 			sLast: '<span class="oi oi-arrow-thick-right"></span>' // This is the link to the last page
	// 		},
	// 		sInfo: "件中_TOTAL_  _START_ 〜 _END_件",
	// 	},
	// 	columnDefs: [{
	//         targets: 'no-sorting',
	//         orderable: false
	//     }]
	// });

	// $('.datatable').each(function(index, element){	
	// 	var table = $(this).DataTable();
	// 	table.columns().iterator( 'column', function (ctx, idx) {
	// 	    $( table.column(idx).header() ).append('<span class="sort-icon"/>');
	// 	} );
	// });

	

   
})