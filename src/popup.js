$(function () {
    
    //const url = "https://rfsforchromeservice.apphb.com/fires";
    const url = "http://localhost/rfsforchrome.service/fires";
    
    $(window).load(function() {
        loadData()
    });

    function loadData() {
        $.ajax({
                type: 'GET',
                url: url,
                contentType: 'jsonp',
                dataType: 'jsonp',
                success: function( data ) {
                    parseXml(data);
                }
            });
    }


    function parseXml(data) {
        for (var i = 0; i < data.length; i++) {
            //$("#results").append(data[i].Title + " - ");
            var item = data[i];
            var markup = appendMarkup(item);
            $("#results").append(markup);
        };        
  		
    }

    function appendMarkup(item) {
        var category = item.Category.toLowerCase();
        var item =        
            '<div class="item">' +
                '<div class="box ' + category +'"></div>' +
                '<div class="title">' + item.Title +'</div>' +
                '<div class="status">' + item.Status +'</div>' +
            '</div>';
        return item;
    }




});
