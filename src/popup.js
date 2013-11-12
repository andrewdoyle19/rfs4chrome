$(function () {
    document.domain = "http://www.rfs.nsw.gov.au";
    var url = "http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml";
    var req = new XMLHttpRequest();
    req.open("GET", 'url', true);
    req.onload = parseXml(req);

    function parseXml(data) {
        alert("blah");
    }



});
