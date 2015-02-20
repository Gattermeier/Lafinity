// Dependency Tests

if (!window.jQuery) {
    console.log('ops, no jquery..')
    // load jquery here..
} else {
    var jq = jQuery.noConflict();
}


// Will be true if bootstrap 3 is loaded, false if bootstrap 2 or no bootstrap
// this needs jquery..
var bootstrap3_enabled = (typeof jq().emulateTransitionEnd == 'function');
if (!(bootstrap3_enabled)) {
    // Will be true if bootstrap is loaded, false otherwise
    var bootstrap_enabled = (typeof jq().modal == 'function');
}



// http://loopj.com/2010/06/12/simple-way-to-extract-get-params-from-a-javascript-script-tag/
// Extract "GET" parameters from a JS include querystring
function getParams(script_name) {
  // Find all script tags
  var scripts = document.getElementsByTagName("script");

  // Look through them trying to find ourselves
  for(var i=0; i<scripts.length; i++) {
    if(scripts[i].src.indexOf("/" + script_name) > -1) {
      // Get an array of key=value strings of params
      var pa = scripts[i].src.split("?").pop().split("&");

      // Split each key=value into array, the construct js object
      var p = {};
      for(var j=0; j<pa.length; j++) {
        var kv = pa[j].split("=");
        p[kv[0]] = kv[1];
      }
      return p;
    }
  }

  // No scripts match
  return {};
}

var param = getParams('lafinity');
console.log(param);


if (param.lf_id) {
    var script_element = document.createElement('script');
    script_element.src = 'http://lafinity.mod.bz/s/api/'+param.lf_id+'?callback=callback';
    document.getElementsByTagName('head')[0].appendChild(script_element);
}

function callback (json) {
  // Do something with the JSON response
  console.log(json);
    jq.each( json, function( i, item ) {
        console.log(i);
        console.log(item);
        //$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });

  console.log(json.title);

  lafinityModal(json);

}

function lafinityModal(json) {
  var html=
        '<div id='+json._id+' class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<'+json.script_title_tag+' class="modal-title">'+json.script_title+'</'+json.script_title_tag+'>'
        +'</div><div class="modal-body">';

        if (json.script_image_position === 'top') {
            html += '<img src="'+json.script_image_url+'" class="img-responsive"  style="width:100%;">'+json.script_message;
        } else {
            html += json.script_message+'<p><img src="'+json.script_image_url+'" class="img-responsive" style="width:100%;"></p>';
        }


        html += '</div><div class="modal-footer">'
        +'<a href="'+json.script_link_httptype+json.script_button_url+'" class="btn eoy-donate '
            +json.script_button_align+' '
            +json.script_button_color+' '
            +json.script_button_font+'" style="" target="_blank" class="eoy-donate">'+json.script_button_text+"</a>"
        +'</div></div></div>';





    jq('body').append(html);
    jq('#'+json._id).modal('show');
    /*jq('body').append(html).done(trigger());

    function trigger() {
        jq('#'+json._id).modal('show');
    }*/


    //function eoymodal() {
    //
    //    var enddate=new Date();
    //    enddate.setFullYear(2016,0,1);
    //
    //    var today = new Date();
    //    if ((active === true) && ($.cookie(json._id) == null) && (enddate>today)) {
    //        $('#'+json._id).modal('show');
    //        var expiryDate = new Date();
    //        hours = json.script_cookie_expiration;
    //        // set cookie
    //        expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
    //        $.cookie(json._id, "false", { path: '/', expires: expiryDate });
    //    }
}

