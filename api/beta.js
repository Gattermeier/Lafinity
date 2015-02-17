/**
 * Created by matthias on 1/4/15.
 */
$(function(){

    var active = true;

    $.ajax({
        url: 'http://www.adl.org/assets/ajax/ajax-modal.html',
        type: 'GET',
        async: false,
        success: function(data) {
            //$('.qr-code').hide();
            $('.ajax-modal').append(data);
            eoymodal();
        }
    });


    function eoymodal() {
        // define an enddate for this script
        var enddate=new Date();
        enddate.setFullYear(2015,0,1);

        // define a date when to switch behaviour
        var switchdate=new Date();
        switchdate.setFullYear(2014,11,30);

        var today = new Date();
        if (active === true) {
            if (switchdate>today) {
                // until today is switchdate do this
                switch (Math.floor(Math.random()*3)) {
                    case 0:
                        console.log(0);
                        $('.eoy-donate-img').attr('src',"http://support.adl.org/images/14/adl_lightbox-2014-a-530-mg.jpg");
                        $('.eoy-donate').attr("href", "https://secure2.convio.net/adl/site/SPageNavigator/EOY/2014/BPI/donate.html?s_src=ADL-DonationLightbox&s_subsrc=AntiHate-theme")
                        break;
                    case 1:
                        console.log(1);
                        $('.eoy-donate-img').attr('src',"http://support.adl.org/images/14/adl_lightbox-2014-b-530-mg.jpg");
                        $('.eoy-donate').attr("href", "https://secure2.convio.net/adl/site/SPageNavigator/EOY/2014/BPI/donate.html?s_src=ADL-DonationLightbox&s_subsrc=AntiSemitism-theme")
                        break;
                    case 2:
                        console.log(2);
                        $('.eoy-donate-img').attr('src',"http://support.adl.org/images/14/adl_lightbox-2014-c-530-mg.jpg");
                        $('.eoy-donate').attr("href", "https://secure2.convio.net/adl/site/SPageNavigator/EOY/2014/BPI/donate.html?s_src=ADL-DonationLightbox&s_subsrc=Cyberhate-theme")
                        break;
                    default:
                        console.log("default");
                        $('.eoy-donate-img').attr('src',"http://support.adl.org/images/14/adl_lightbox-eoy.jpg");
                        $('.eoy-donate').attr("href", "https://secure2.convio.net/adl/site/SPageNavigator/EOY/2014/BPI/donate.html?s_src=ADL-DonationLightbox&s_subsrc=EOY-default")
                }
            } else {
                // after passing switchdate do this
                $('.eoy-donate-img').attr('src',"http://support.adl.org/images/14/adl_lightbox-eoy.jpg");
                $('.eoy-donate').attr("href", "https://secure2.convio.net/adl/site/SPageNavigator/EOY/2014/BPI/donate.html?s_src=ADL-DonationLightbox&s_subsrc=EOYlast2days")
            }

            // If the cookie does not exist show modal & set a cookie with expiration time
            if (($.cookie('%COOKIE%') == null) && (enddate>today)) {
                $(%MODALID%).modal('show');
                var expiryDate = new Date();
                // console.log(switchdate);
                // console.log(today);
                if (switchdate>today) {
                    // until today is switchdate set cookie expiration to number of hours
                    var hours = 6; // 11
                    // console.log(hours);
                } else {
                    // after passing switchdate set cookie expiration to new frequency
                    var hours = 1; // 1
                    // console.log(hours);
                }
                // set cookie
                expiryDate.setTime(expiryDate.getTime() + (hours * 3600 * 1000));
                $.cookie(%COOKIE%, "false", { path: '/', expires: expiryDate });
            }
        }
    }


});
