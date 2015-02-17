/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54ac5ea326e2df1349000003" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">Etiam vitae mollis nunc.</h4>'
        +'</div><div class="modal-body">Nulla placerat placerat arcu, eget auctor tellus ullamcorper sed. Donec et odio ac enim mattis mattis ut eu dolor. Ut vitae pretium est. Pellentesque pellentesque mollis risus, placerat egestas leo dictum nec.'
        +'</div><div class="modal-footer">'
        +'<a href="www.gattermeier.net" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">Lipsum!</a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54ac5ea326e2df1349000003') == null) && (enddate>today)) {
            $('#<%MODALID%>').modal('show');
            var expiryDate = new Date();
            hours = 10;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("<%MODALCOOKIE%>", "false", { path: '/', expires: expiryDate });
        }
    }


});