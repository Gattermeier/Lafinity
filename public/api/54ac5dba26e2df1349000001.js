/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54ac5dba26e2df1349000001" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">Lorem Ispsum</h4>'
        +'</div><div class="modal-body">Nulla sagittis odio quis est efficitur dignissim. Ut aliquam vitae urna ac vehicula. Aliquam commodo ultricies pellentesque. Integer pulvinar dolor eu neque vehicula, et porta tortor feugiat. Praesent mattis tristique mauris, sit amet mattis enim consectetur a. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac lorem ut justo tincidunt luctus.'
        +'</div><div class="modal-footer">'
        +'<a href="www.gattermeier.net" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">Lipsum</a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54ac5dba26e2df1349000001') == null) && (enddate>today)) {
            $('#54ac5dba26e2df1349000001').modal('show');
            var expiryDate = new Date();
            hours = 5;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("54ac5dba26e2df1349000001", "false", { path: '/', expires: expiryDate });
        }
    }


});