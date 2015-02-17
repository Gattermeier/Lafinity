/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54a73929a70a7d0000000001" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">You can support us</h4>'
        +'</div><div class="modal-body">Only with support of donors like you can we make a difference'
        +'</div><div class="modal-footer">'
        +'<a href="http://www.gattermeier.net/donate" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">Donate</a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54a73929a70a7d0000000001') == null) && (enddate>today)) {
            $('#54a73929a70a7d0000000001').modal('show');
            var expiryDate = new Date();
            hours = ;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("54a73929a70a7d0000000001", "false", { path: '/', expires: expiryDate });
        }
    }


});