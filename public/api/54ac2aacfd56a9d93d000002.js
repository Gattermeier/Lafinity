/**
 * Created by matthias on 1/5/15.
 */
$(function(){

    var active = true;

    var html=
        '<div id="54ac2aacfd56a9d93d000002" class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<h4 class="modal-title">Lorem Ipsum</h4>'
        +'</div><div class="modal-body">Pellentesque viverra at est sed sagittis. Nunc maximus purus id dui placerat semper. Etiam posuere fermentum metus quis porttitor. Sed non risus id dolor porttitor ornare. Etiam vulputate odio eget auctor molestie. Donec ullamcorper lobortis quam et sodales. Donec at magna accumsan, finibus nulla non, maximus diam. Quisque fringilla aliquet dolor, vel ultrices augue consectetur at. Cras vitae aliquam leo. Suspendisse lacinia egestas semper. Suspendisse ultricies turpis quis lacus efficitur aliquet.'
        +'</div><div class="modal-footer">'
        +'<a href="www.gattermeier.net" class="btn btn-block eoy-donate" style="" target="_blank" class="eoy-donate">Lispum!</a>'
        +'</div></div></div>';

    $('body').append(html).done(eoymodal());


    function eoymodal() {

        var enddate=new Date();
        enddate.setFullYear(2016,0,1);

        var today = new Date();
        if ((active === true) && ($.cookie('54ac2aacfd56a9d93d000002') == null) && (enddate>today)) {
            $('#<%MODALID%>').modal('show');
            var expiryDate = new Date();
            hours = 0;
            // set cookie
            expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
            $.cookie("<%MODALCOOKIE%>", "false", { path: '/', expires: expiryDate });
        }
    }


});