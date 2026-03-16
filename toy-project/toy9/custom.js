$(function() {
  // $('.accordion-item .content').eq(0).show();
  $('.accordion-item .title').click(function(){
    $(this).next().stop().slideToggle();
    $(this).toggleClass('active')
  });
  $('.accordion-item .content').click(function() {
    $(this).stop().slideUp(300);
  });
});