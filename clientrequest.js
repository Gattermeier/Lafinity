

// read URL parameters into array
var qd = {}
location.search.substr(1).split("&").forEach(function(item) {
    (item.split("=")[0] in qd) ? qd[item.split("=")[0]].push(item.split("=")[1]) : qd[item.split("=")[0]] = [item.split("=")[1],]
    })

if (qd.test) {
    proceed(qd.test);
    }
    
function proceed(value){
   $( "body" ).append( "<p>this is a test: "+value+"</p>" );
   
   //http://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
   var obj = { one:1, two:2, three:3, four:4, five:5 }; // use lodash or underscore instead of jQuery? Also: this isn't a real JSON obj?
   $.each(obj, function(i, val) {
        //$("#" + i).append(document.createTextNode(" - " + val));
        $( "body" ).append("<p>"+val+"</p>")
    });
}
// this would only work if we could read the parameter from the script reference.
//http://stackoverflow.com/questions/2190801/passing-parameters-to-javascript-files

if (qd.id) {
    var script_element = document.createElement('script');
    script_element.src = 'http://localhost:3000/s/api/'+qd.id+'?callback=callback';
    document.getElementsByTagName('head')[0].appendChild(script_element);
}

function callback (json) {
  // Do something with the JSON response
  console.log(json);
  $.each( json, function( i, item ) {
        console.log(i);
        console.log(item);
        //$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });
  console.log(json.title);
  
};

/*

// Create a new script element
var script_element = document.createElement('script');

// Set its source to the JSONP API
script_element.src = 'http://localhost:3000/s/api/54ca61ed873c570000000001?callback=callback';

// Stick the script element in the page <head>
document.getElementsByTagName('head')[0].appendChild(script_element);
*/
/*

var lafinityAPIurl = "http://127.0.0.1:3000/s/api/54ca61ed873c570000000001?callback=callback";
$.getJSON( lafinityAPIurl, {
//    dataType: 'jsonp'
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        console.log(i);
        console.log(item);
        //$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });
    });
*/