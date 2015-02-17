/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54ce44eae63d370000000001" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">Welcome</h4>'
        +'</div><div class="modal-body">This is a message'
        +'</div><div class="modal-footer">'
        +'<a href="www.gattermeier.net" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">Donate </a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54ce44eae63d370000000001') == null) && (enddate>today)) {
            $('#54ce44eae63d370000000001').modal('show');
            var expiryDate = new Date();
            hours = 0;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("54ce44eae63d370000000001", "false", { path: '/', expires: expiryDate });
        }
    }


});