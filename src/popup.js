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
                    parseResult(data);
                }                
            });
    }


    function parseResult (data) {
        for (var i = 0; i < data.length; i++) {
            //$("#results").append(data[i].Title + " - ");
            var item = data[i];
            var markup = appendMarkup(item,i);
            $("#results").append(markup);
        };        
  		
    }

    function appendMarkup(item, i) {
        var category = item.Category.toLowerCase();
        var displayCategory = getDisplayCategory(category)
        var item =        
            '<div class="item'+ i +'">' +
                '<div class="box ' + category +'"><img src="images/flames-' + category +'.png"/></div>' +                 
                '<div class="title">' + item.Title +'</div>' +
                '<div class="status">Status: ' + item.Status +'</div>' +
            '</div>';
        return item;
    }

    function getDisplayCategory(item){
        if(item === "advice")
        {
            return "Advice";
        }
        if(item === "watchandact")
        {
            return "Watch and Act";        
        }
        if(item === "emergencywarning")
        {
            return "Emergency Warning";        
        }
        if(item === "notapplicable")
        {
            return "Not Applicable";
        }
        return item;
    }




});
