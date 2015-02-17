/**
 * Created by matthias on 1/4/15.
 */


(function() {
    $(window).on('load', function() {

        /* check for fulfilled dependencies
        - jquery
        - jquery cookie

         if(typeof(jQuery)=='undefined'){}

        */

        //  construct the html and append it somewhere?

        var html =+
             '<div id="<%MODALID%>" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
            +'<div class="modal-header">'
            +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
            +'<h4 class="modal-title"><%SCRIPT_TITLE%></h4>'
            +'</div><div class="modal-body">'
            +'<p><%SCRIPT_MESSAGE%></p>'
            +'</div><div class="modal-footer">'
            +'<a href="<%SCRIPT_BUTTON_URL%>" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate"><%SCRIPT_BUTTON_TEXT%></a>'
            +'</div></div></div>';

        $('body').append(html);

        // set the dates

        var startdate = new Date();
        startdate.setFullYear(2015,0,1); // replace
        var enddate=new Date();
        enddate.setFullYear(2016,0,1); // replace
        var today=new Date();

        // execute modal

        if (($.cookie('<%MODALCOOKIE%>') == null) && (enddate>today)) {
            $('#<%MODALID%>').modal('show'); // replace modal ID
            var expiryDate = new Date();
            var hours = <%HOURS%>; // replace hours

            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("<%MODALCOOKIE%>", "false", { path: '/', expires: expiryDate }); // replace modal ID
        }

    });
})();
