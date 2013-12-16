$(function () {
    
    //const url = "https://rfsforchromeservice.apphb.com/fires";
    const url = "http://localhost/rfsforchrome.service/fires";

    window.setTimeout(loadData, 500);

    function loadData() {
        $.ajax({
                type: 'GET',
                url: url,
                contentType: 'jsonp',
                dataType: 'jsonp',
                crossDomain: true,
                success: function( data ) {
                    parseResult(data);
                    $("#loading-wrapper").hide();
                },
                error: function(xhr, status, error) {
                    $("#loading-wrapper").hide();
                    $(".errorMessage").show();
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
        bindClickExpand();         		
    }

    function appendMarkup(item, i) {
        var category = item.Category.toLowerCase();
        var displayCategory = getDisplayCategory(category)
        var item =        
            '<div class="item_'+ i +'">' +
                '<div class="box ' + category +'"><img src="images/flames-' + category +'.png"/></div>'+ 
                '<div class="left">' +                                
                    '<div class="title">' + item.Title +'</div>' +
                    '<div class="status">Status: ' + item.Status +'</div>' +  
                '</div>' +
                '<div class="right">' +                                 
                    '<div class="expand" target="'+ i +'" >' +
                         '<img id="img_detail_'+ i + '" src="images/down-arrow-grey.png"/>' +
                    '</div>'+
                '</div>' +
            '</div>' +
            '<div id="detail_'+ i + '" class="hidden">' + 
                '<ul>' +
                    '<li class="category">Category: ' + displayCategory + '</li>' +
                    '<li class="location">Location: ' + item.Location + '</li>' +
                    '<li class="council">Council: ' + item.CouncilArea + '</li>' +
                    '<li class="Size">Type: ' + item.Type + '</li>' +
                    '<li class="Size">Size: ' + item.Size + '</li>' +
                    '<li class="lastUpdated">Last Updated: ' + item.LastUpdatedAsString + '</li>' +
                    '<li><a href="'+ item.Link +'" target="_blank">Rural Fire Service Website</a></li>' +
                '</ul>' +
            '</div>';

        return item;
    }

    function bindClickExpand() {
        $('.expand').click(function(){
            var itemid = '#detail_' +$(this).attr('target');
            var button = '#img_detail_' +$(this).attr('target');
            
            if($('.active').length === 0) {
                $(itemid).slideDown();
                $(itemid).addClass('active'); 
                $(button).attr('src', 'images/up-arrow-grey.png');          
            } else if (itemid == "#"+$('.active').attr('id')) {
                $('.active').slideUp();
                $(itemid).removeClass('active');
                $(button).attr('src', 'images/down-arrow-grey.png');
            } else {
                $("[id^=img_detail]").attr('src', 'images/down-arrow-grey.png');
                $('.active').slideUp(function() {
                    $(this).removeClass('active');
                    $(button).attr('src', 'images/down-arrow-grey.png');
                    if ($(".targetDiv:animated").length === 0){
                        $(itemid).slideDown();
                        $(itemid).addClass('active');
                        $(button).attr('src', 'images/up-arrow-grey.png');
                    }
                });
            }
        }); 
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
