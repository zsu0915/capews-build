$(document).ready(function () {
    $('.main-header').load("./header.html", function () {
        svg()
        menuHideAlert()
    });
    $('.main-sidebar').load("./sidebar.html", function () {
        svg()
        menuActive()
    });
    // $('.control-sidebar').load("./controlSidebar.html", function() {
    //     svg()
    // });
    svg()
    menuMobile();
    // checkboxNotAll();
    // main();
    groupClick();
});

// svg圖檔
function svg() {
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
}

function menuActive() {
    $('.sidebar-menu li a').click(function () {
        if (!$(this).closest('li').hasClass('active')) {
            $('.sidebar-menu li').removeClass('active');
            $(this).closest('li').addClass('active');
        }
    });
}

// mobile隱藏sidebar
function menuMobile() {
    if ($(window).width() < 1025) {
        $('body').removeClass('sidebar-collapse');
    }
}

// mobile展開sidebar時，隱藏告警事件&災害回報
function menuHideAlert() {
    if ($(window).width() < 1025) {
        $('.sidebar-toggle').click(function () {
            closeAlert();
        });
    }
}

// search keyup
function searchKeyup(value) {
    var searchIcon = $(value).closest('.input-group').find('.search-hasval');
    var searchNoval = $(value).closest('.input-group').find('.search-noval');
    var closeIcon = $(value).closest('.input-group').find('.search-close');
    var inputAppend = $(value).closest('.input-group').find('.input-group-append');

    if ($(window).width() < 1025) {
        // PC 搜尋結果& search icon顯示/隱藏
        if ($(value).val() !== '') {
            $(searchIcon).hide();
            $('.search-default').hide();
            $(closeIcon).show();
            $('.search-result').show();
        } else {
            $(searchIcon).show();
            $('.search-default').show();
            $(closeIcon).hide();
            $('.search-result').hide();
        }

        // mobile 搜尋結果顯示/隱藏
        if ($(window).width() < 1025) {
            if ($(value).val() !== '') {
                $('.search-wrap').addClass('open-resault');
                $('body').removeClass('sidebar-open');
            } else {
                $('.search-wrap').removeClass('open-resault');
            }
        }

        // clear icon隱藏/顯示
        if ($(inputAppend).hasClass('hide')) {
            $(inputAppend).removeClass('hide');
        }

        closeAlert();
    } else {
        if ($(value).val() !== '') {
            $(closeIcon).removeClass('hide');
            $(searchIcon).addClass('hide');
            $('.search-default').hide();
            $('.search-result').show();
        } else {
            $(closeIcon).addClass('hide');
            $(searchIcon).removeClass('hide');
            $('.search-default').show();
            $('.search-result').hide();
        }

    }
}

// search input click
function searchClick(value) {
    var searchNoval = $(value).closest('.input-group').find('.search-noval');

    if ($('#search').val() == '') {
        $(searchNoval).addClass('hide');
        $('.search-hasval').removeClass('hide');
        $('#search').attr('placeholder', '');
    }
}

// search icon click
function searchVal(value) {
    var searchVal = $('#search').val();
    var searchIcon = $(value);
    var closeIcon = $(value).closest('.input-group').find('.search-close');

    if (searchVal !== '') {
        $('.search-default').hide();
        $(closeIcon).removeClass('hide');
        $('.search-result').show();
        $(searchIcon).addClass('hide');
    } else {
        $('.search-default').show();
        $(closeIcon).addClass('hide');
        $('.search-result').hide();
        $(searchIcon).removeClass('hide');
    }
}

// search clear
function searchClear(value) {
    var input = $(value).closest('.input-group').find('input');
    var searchNoval = $(value).closest('.input-group').find('.search-noval');
    var closeIcon = $(value).closest('.input-group').find('.search-close');
    var inputAppend = $(value).closest('.input-group').find('.input-group-append');

    $(input).val('');
    $(searchNoval).removeClass('hide');
    $('.search-result').hide();
    $(closeIcon).addClass('hide');
    $('.search-default').show();
    $('#search').attr('placeholder', '請輸入關鍵字');
    if ($(window).width() < 1025) {
        $('.search-wrap').removeClass('open-resault');
    }
}

// search leave
function searchLeave(value) {
    var searchhasVal = $(value).closest('.input-group').find('.search-hasval');
    var searchNoval = $(value).closest('.input-group').find('.search-noval');

    if ($(window).width() > 1025) {
        if ($(value).val() == '') {
            $(searchNoval).removeClass('hide');
            $(searchhasVal).addClass('hide');
            $('#search').attr('placeholder', '請輸入關鍵字');
        }
    }
}

// mobile open Search
function openSearch() {
    $('.search-btn, .header-logo, .header-title, .sidebar-toggle').hide();
    $('.search-input, .search-btn-c').removeClass('hide');
    $('.input-group-append').addClass('hide');
    $('#search_hd').val('');
}

// mobile close Search
function closeSearch() {
    $('.search-btn, .header-logo, .header-title, .sidebar-toggle').show();
    $('.search-input, .search-btn-c').addClass('hide');
    if ($(window).width() < 1025) {
        $('.search-wrap').removeClass('open-resault');
    } else {
        $('.input-group-append').removeClass('hide');
    }
}

// Mobile告警事件開啟
function openAlert() {
    $('.dst-grid').addClass('active');
    $('.alert-btn-m').hide();
}

// Mobile告警事件開啟
function closeAlert() {
    $('.dst-grid').removeClass('active');
    $('.alert-btn-m').show();
}

// // user checkbox全選
// function checkAll(value) {
//     if ($(value).is(':checked'))
//         $(value).closest('.collaspe-item').find('.collaspe-list').find('.form-control').prop('checked', true);
//     else
//         $(value).closest('.collaspe-item').find('.collaspe-list').find('.form-control').prop('checked', false);
// }

// // user checkbox 取消全選
// function checkboxNotAll(value) {
//     var selectAll = $(value).closest('.collaspe-item').find('.collaspe-header').find('.form-control');
//     var isAll = true;
//     if ($(selectAll).is(':checked')) {
//         $(selectAll).prop('checked', false);
//     } else {
//         $(value).closest('.collaspe-list').find('.form-control').each(function () {
//             if (!$(this).prop('checked')) {
//                 isAll = false;
//             }
//         });
//         if (isAll) {
//             $(value).closest('.collaspe-item').find('.collaspe-header').find('.form-control').prop('checked', true);
//         }
//     }
// }


// // Map
// const defaultLongitude = 120.680906;	//系統預設坐標(台中文化資產園區)
// const defaultLatitude = 24.133073;
// let arrLocates = [
//     [25.036997, 121.499944],
//     [25.042938, 121.515028],
//     [24.133073, 120.680906]
// ];
// let arrLocatesName = ['龍山寺', '國立台灣博物館', '台中文化資產園區'];

// const mapBoxToken = 'pk.eyJ1IjoiaWFtaXJvbm1hbnlzIiwiYSI6ImNrMXZxOHhocDAzOGIzbm1rOTYwYmp6cngifQ.d_5_x3kFyggJrgYMC1qXQg';

// function main() {
//     // init map
//     const mymap = L.map('mapid').setView([defaultLatitude, defaultLongitude], 8);

//     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapBoxToken, {
//         maxZoom: 20,
//         id: 'mapbox.satellite',
//         accessToken: mapBoxToken
//     }).addTo(mymap);

//     let myIcon = L.icon({
//         iconUrl: './img/marker.svg',
//         iconSize: [60, 72],
//     });

//     // marker
//     arrLocates.forEach(function (element, index) {
//         let marker = L.marker(element, { icon: myIcon }).addTo(mymap);
//         let showIndex = index + 1;

//         // 預設打開popup ex: marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

//         var popup = L.popup({
//             className: 'map-pop'
//         })
//             .setLatLng(element)
//             .setContent('<div class="search-resault">' +
//                 '<div class="search-header">' +
//                 ' <div class="search-img"><img src="img/temple.png" /></div>' +
//                 '<div class="search-header-text">' +
//                 '<h2>資產名稱</h2>' +
//                 '<p>' + arrLocatesName[index] + '</p>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="list-group list-group-flush">' +
//                 '<a class="list-group-item">' +
//                 '<h3>中殿Camera1煙火一級(紅燈)</h3>' +
//                 '<p>人為災害</p>' +
//                 '<div class="search-stsbox">' +
//                 '<div class="search-date">2019/07/31  17:34</div>' +
//                 '<div class="search-status">未通報</div>' +
//                 '</div>' +
//                 '</a>' +
//                 '<a class="list-group-item">' +
//                 '<h3>中殿Camera1煙火一級(紅燈)</h3>' +
//                 '<p>人為災害</p>' +
//                 '<div class="search-stsbox">' +
//                 '<div class="search-date">2019/07/31  17:34</div>' +
//                 '<div class="search-status">未通報</div>' +
//                 '</div>' +
//                 '</a>' +
//                 '<a class="list-group-item">' +
//                 '<h3>中殿Camera1煙火一級(紅燈)</h3>' +
//                 '<p>人為災害</p>' +
//                 '<div class="search-stsbox">' +
//                 '<div class="search-date">2019/07/31  17:34</div>' +
//                 '<div class="search-status">未通報</div>' +
//                 '</div>' +
//                 '</a>' +
//                 '</div>' +
//                 '</div>');

//         marker.bindPopup(popup);
//     });

//     // popup 置中
//     mymap.on('popupopen', function (e) {
//         var px = mymap.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
//         px.y -= e.target._popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
//         mymap.panTo(mymap.unproject(px), { animate: true }); // pan to new center
//     });

//     // 開啟告警事件&災害回報，隱藏map popup
//     $(document).on('show.bs.collapse', '#alert, #bulletin', function () {
//         mymap.closePopup();
//     })
// }

function groupClick() {
    $('.leaflet-marker-icon').click(function () {
        // 開啟手機版map popup
        if (!$('.caption').hasClass('active')) {
            $('.caption').addClass('active')
        }
        if ($('.caption').hasClass('open')) {
            $('.caption').removeClass('open')
        }

        // 隱藏告警事件&災害回報
        $('#alert, #bulletin').collapse('hide');
    });


    // 點擊其他地方，隱藏手機版map popup
    $(document).click(function (event) {
        if (!$(event.target).is(".leaflet-marker-icon") && $(event.target).closest('.caption').length == 0 && !$(event.target).is(".closeCt-btn")) {
            $('.caption').removeClass('active open');
        }
    });

    // 展開手機版map popup
    $('.popup-click').not('.closeCt-btn').click(function (event) {
        if (!$(event.target).is(".closeCt-btn")) {
            $('.caption').addClass('open');
        }
    })
}

// 關閉手機版map popup
function closeCaption() {
    $('.caption').removeClass('active open');
}
