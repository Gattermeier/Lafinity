/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54ac01802f1e3ef735000001" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">Hello</h4>'
        +'</div><div class="modal-body">ergwergwerg'
        +'</div><div class="modal-footer">'
        +'<a href="wergwer" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">testwergewrgsdafasdgfasdf</a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54ac01802f1e3ef735000001') == null) && (enddate>today)) {
            $('#<%MODALID%>').modal('show');
            var expiryDate = new Date();
            hours = 0;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("<%MODALCOOKIE%>", "false", { path: '/', expires: expiryDate });
        }
    }


});