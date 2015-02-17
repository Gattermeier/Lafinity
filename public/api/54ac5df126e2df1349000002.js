/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54ac5df126e2df1349000002" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">Nulla ac augue vel justo efficitur accumsan.</h4>'
        +'</div><div class="modal-body">Pellentesque eget faucibus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sed augue bibendum eros imperdiet egestas vitae vitae velit. Cras maximus est eu libero pellentesque, id lacinia odio pharetra. Ut feugiat viverra augue et sodales. Vestibulum venenatis est cursus tempor aliquam. Nulla ac augue vel justo efficitur accumsan.'
        +'</div><div class="modal-footer">'
        +'<a href="" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">Lipsum!</a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54ac5df126e2df1349000002') == null) && (enddate>today)) {
            $('#<%MODALID%>').modal('show');
            var expiryDate = new Date();
            hours = 0;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("<%MODALCOOKIE%>", "false", { path: '/', expires: expiryDate });
        }
    }


});