function nextInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var total = 0;

$( document ).ready( function() {

    $.getJSON("/data.json", function(data) {
        console.log(data)
        total = data.items.length;
        for (var i = 0; i < total; i++) {
            var url = data.items[i].thumbnail_url;
            var id = data.items[i].video_id;
            $('#images div').append('<img src="' + url + '" data-id="'+ id +'"/>')
        }
      });

    $( '#play' ).on( 'click', function() {

        $('.videoContainer iframe').remove();
        $( '#images > div' ).show();
	
      	var $images = $( '#images div' );
      
      	/**
         * @internal
         *
         * Choosing a random image from all available. When the spinning
         * animation is finished we remove it from it is and then prepend to
         * the Images container.
         *
         * Since the animation goes from the first image to the first image
         * we have the visual illusion of randomness ;)
         */
         var chosen = $images.find( 'img' ).eq( Math.floor( Math.random() * total ) );

         var selector = $( '#images > div' );
         selector.addClass( 'spinning' )
         chosen.on( 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
            chosen.remove().prependTo( $images );
            selector.removeClass( 'spinning' )
            var id = $(chosen).attr("data-id");
            selector.delay(800).fadeOut(500, function() { 
                $(this).hide(); 
                $('#play').text("Watch another random conference");
                $('.videoContainer').append('<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/'+id+'?autoplay=1" frameborder="0" allowfullscreen/>')
            });
        });

     });
});
