/* 
* @preserve tableflip.js 0.0.1
* http://tableflip.co
* (c) 2014 Pierre Reimertz
* may be freely distributed under the MIT license.
*/


  
  


(function(exports, html, body, script){
  'use strict';

  var _state = 0,
  _states = [
    '<face>(╯°□°)</face> ┬─┬',
    '<face>(╯°□°)╯</face> ︵ ┻━┻',
    'Sending..',
    'Sent!',
    'Server error!',
    'Wrong Auth key!',
  ],
  _listeners = [],
  _tpDiv,
  _tpWrapper,
  _messageInput,
  _emailInput,
  _hasMessage = false,
  _validEmail = false,
  _data = {},
  _defaults = { 
    tagId : 'tf'
  };

  function handleClick() {
    _state++;
    if(_state > 1 ) return;
    if(_state === 1) doFlip();

    updateClassses(_state);
    setText(_states[_state]);      
  }

  function onSubmit() {
    if(_hasMessage + _validEmail < 2) return;

    _data.fromEmail = _emailInput.value;
    _data.message = _messageInput.value;

    sendMail(_data);
  }

  function sendMail(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '//mailserver.tableflip.co/sendmail', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    setText(_states[2]);

    xhr.onloadend = function (res) {
      if (res.target.status === 200) return onDone();
      if (res.target.status === 401) return onAuthFail();
      
      onFail();
    };
  }

  function onDone() {
    setText(_states[3]);
    setTimeout(function(){
      onCancel();
    },4500);
  }

  function onAuthFail() {
    _tpDiv.classList.add('fail');
    setTimeout(function(){
      _tpDiv.classList.remove('fail');
    },100);
    setText(_states[5]);
  }

  function onFail() {
    _tpDiv.classList.add('fail');
    setTimeout(function(){
      _tpDiv.classList.remove('fail');
    },100);
    setText(_states[4]);
  }

  function onCancel() {
    html.classList.remove('do-flip');
    html.classList.add('reverse-flip');

    setTimeout(function(){
      html.classList.remove('reverse-flip');
    },1000);

    _tpDiv.classList.remove(_state);

    _state = 0;
    _emailInput.value = '';
    _messageInput.value = '';
    updateClassses(_state);
    setText(_states[_state]);      
  }

  function initListeners(){
    _listeners.push(_tpDiv.
      getElementsByClassName('text')[0].addEventListener('click', function(e) {
        e.stopPropagation();

        handleClick();
      }));

    _listeners.push(_tpDiv.
      getElementsByTagName('button')[0].addEventListener('click', function(e) {
        e.stopPropagation();
        onCancel();
      }));

    _listeners.push(_tpDiv.
      getElementsByTagName('button')[1].addEventListener('click', function(e) {
        e.stopPropagation();
        onSubmit();
      }));

    _listeners.push(_emailInput.addEventListener('keyup', function(e) {
      _validEmail = validEmail(e.currentTarget.value);

      _tpDiv.classList.toggle('valid-email', _validEmail);

    }));

    _listeners.push(_messageInput.addEventListener('keyup', function(e) {
      _hasMessage = !!(e.currentTarget.value.length > 1);

      _tpDiv.classList.toggle('has-message', _hasMessage);

    }));
  
  }
  function validEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function initVisualz(){
    var style = document.createElement("style");
    style.innerHTML = '.do-flip body,.reverse-flip body{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}.reverse-flip body{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}.tf-overlay{background:#000;bottom:0;color:rgba(251,45,129,.2);font-size:0;height:0;left:0;opacity:0;position:fixed;text-align:center;-webkit-transition:all .5s;transition:all .5s;width:0;z-index:1336}.do-flip .tf-overlay{width:100%;height:100%;opacity:1;font-size:5em}.tf-top .tf-overlay{bottom:inherit;top:0}.tf-right .tf-overlay{left:inherit;right:0}.do-flip body{-webkit-animation-name:bodyTableFlip;animation-name:bodyTableFlip}.do-flip.tf-top body{-webkit-animation-name:bodyTableFlipTop;animation-name:bodyTableFlipTop}.do-flip.tf-right body{-webkit-animation-name:bodyTableFlipRight;animation-name:bodyTableFlipRight}.do-flip.tf-right.tf-top body{-webkit-animation-name:bodyTableFlipTopRight;animation-name:bodyTableFlipTopRight}.reverse-flip body{-webkit-animation-name:bodyTableReverseFlip;animation-name:bodyTableReverseFlip}.reverse-flip.tf-top body{-webkit-animation-name:bodyTableFlipReverseTop;animation-name:bodyTableFlipReverseTop}.reverse-flip.tf-right body{-webkit-animation-name:bodyTableReverseFlipRight;animation-name:bodyTableReverseFlipRight}.reverse-flip.tf-right.tf-top body{-webkit-animation-name:bodyTableReverseFlipTopRight;animation-name:bodyTableReverseFlipTopRight}@-webkit-keyframes bodyTableFlipTopRight{0%{opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}100%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}}@keyframes bodyTableFlipTopRight{0%{opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}100%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}}@-webkit-keyframes bodyTableReverseFlipTopRight{0%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}100%{opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}}@keyframes bodyTableReverseFlipTopRight{0%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}100%{opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}}@-webkit-keyframes bodyTableFlipTop{0%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}100%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}}@keyframes bodyTableFlipTop{0%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}100%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}}@-webkit-keyframes bodyTableFlipReverseTop{0%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}100%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}}@keyframes bodyTableFlipReverseTop{0%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}100%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}}@-webkit-keyframes bodyTableFlipRight{0%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}100%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}}@keyframes bodyTableFlipRight{0%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}100%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}}@-webkit-keyframes bodyTableReverseFlipRight{0%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}100%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}}@keyframes bodyTableReverseFlipRight{0%{opacity:0;-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,-1,90deg);transform:rotate3d(0,0,-1,90deg)}100%{opacity:1;-webkit-transform-origin:left bottom;transform-origin:left bottom}}@-webkit-keyframes bodyTableFlip{0%{background-color:inherit;opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}100%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}}@keyframes bodyTableFlip{0%{background-color:inherit;opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}100%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}}@-webkit-keyframes bodyTableReverseFlip{0%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}100%{background-color:inherit;opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}}@keyframes bodyTableReverseFlip{0%{opacity:0;-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg)}100%{background-color:inherit;opacity:1;-webkit-transform-origin:right bottom;transform-origin:right bottom}}@-webkit-keyframes disco{0%{color:#fb2d81}50%{color:#fff}100%{color:#fb2d81}}@keyframes disco{0%{color:#fb2d81}50%{color:#fff}100%{color:#fb2d81}}#tf .form{display:none;font-size:0;height:0;opacity:0;position:relative;-webkit-transition:500ms;transition:500ms}#tf[class*="1"].valid-email input{color:#00ffad!important}#tf[class*="1"].valid-email.has-message:not(.fail) button:last-of-type{background:#ffc107;color:#000;cursor:pointer;opacity:1}#tf[class*="1"].valid-email.has-message:not(.fail) button:last-of-type:hover{color:#fff}#tf[class*="1"] .form{display:inline-block;height:auto;opacity:1;position:relative;width:100%}#tf[class*="1"] .form .message{background:#4dbfbf;font-size:17px;letter-spacing:2px;line-height:30px;padding:10px;text-align:center}#tf[class*="1"] .form .email input,#tf[class*="1"] .form .u_message textarea{letter-spacing:2px;margin:0;padding:30px 0;text-align:center}#tf[class*="1"] .form .email{background:#4847b7}#tf[class*="1"] .form .email input{color:#ff8383}#tf[class*="1"] .form .email input:focus{background:#393992}#tf[class*="1"] .form .u_message{background:#ff7959}#tf[class*="1"] .form .u_message textarea:focus{background:#8c1a00}#tf[class*="1"] .form button:focus,#tf[class*="1"] .form input:focus,#tf[class*="1"] .form textarea:focus{outline-width:0}#tf[class*="1"] .form input,#tf[class*="1"] .form textarea{background:0 0;border:none;color:#fff;font-size:16px;resize:none;text-align:center;width:100%}#tf[class*="1"] .form input::-webkit-input-placeholder,#tf[class*="1"] .form textarea::-webkit-input-placeholder{color:#fff;letter-spacing:2px}#tf[class*="1"] .form input:-moz-placeholder,#tf[class*="1"] .form textarea:-moz-placeholder{color:#fff;letter-spacing:2px}#tf[class*="1"] .form input::-moz-placeholder,#tf[class*="1"] .form textarea::-moz-placeholder{color:#fff;letter-spacing:2px}#tf[class*="1"] .form input:-ms-input-placeholder,#tf[class*="1"] .form textarea:-ms-input-placeholder{color:#fff;letter-spacing:2px}#tf[class*="1"] .form button{border:none;color:#fff;font-size:14px;font-weight:700;margin:0;padding:15px 0;text-transform:uppercase;-webkit-transition:200ms;transition:200ms;width:50%}#tf[class*="1"] .form button:first-of-type{cursor:pointer;background:#000}#tf[class*="1"] .form button:first-of-type:hover{color:#ffc107}#tf[class*="1"] .form button:last-of-type{background:#ffc107;color:#000;opacity:.5}.tf-wrapper{position:absolute;z-index:1337;left:15px;margin-top:-35px!important}@media (max-width:600px){.tf-wrapper{margin-top:0!important;left:0!important;right:0!important;position:relative}.tf-top .tf-wrapper{top:0!important;margin-top:0!important;bottom:0!important}}.tf-right .tf-wrapper{left:inherit;right:15px}.tf-top .tf-wrapper{top:15px;margin-top:-10px!important}.tf-top.tf-large .tf-wrapper,.tf-top.tf-medium .tf-wrapper{margin-top:0}.tf-large .tf-wrapper{margin-top:-55px}.tf-medium .tf-wrapper{margin-top:-45px}.tf-top .tf-wrapper #tf{bottom:initial;top:0}.tf-top .tf-wrapper #tf[class*="2"]{bottom:50%;top:initial}.tf-right .tf-wrapper #tf{left:initial;right:0}.tf-right .tf-wrapper #tf[class*="1"]{left:initial;right:50%}.tf-medium .tf-wrapper #tf{font-size:14px;padding:8px}.tf-large .tf-wrapper #tf{font-size:16px;padding:10px}.tf-wrapper #tf{background:#000;border-radius:5px;bottom:0;color:#fff;display:inline-block;font-family:helvetica;font-size:12px;left:0;padding:6px;position:relative;-webkit-transition:all 300ms;transition:all 300ms;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle}@media (max-width:600px){.tf-wrapper #tf{width:100%;border-radius:0;padding:20px 0;text-align:center}.tf-medium .tf-wrapper #tf{font-size:20px}.tf-large .tf-wrapper #tf{font-size:25px}}.tf-wrapper #tf a{color:#fff;display:none;font-size:10px;margin-top:10px;opacity:0;position:relative;text-align:left;text-decoration:none;width:100%}.tf-wrapper #tf:hover{color:#fb2d81}.tf-wrapper #tf .text{cursor:pointer}.tf-wrapper #tf[class*="0"] face{color:#4dbfbf}.tf-wrapper #tf[class*="1"]{color:#fff;font-size:25px;height:470px;left:50%;margin:-240px -140px -200px;position:fixed;top:50%;-webkit-transition:all 300ms;transition:all 300ms;width:250px;z-index:100}.tf-wrapper #tf[class*="1"] a{opacity:1;color:#fff;display:inline-block}.tf-wrapper #tf[class*="1"].fail .text{-webkit-animation:none;animation:none}.tf-wrapper #tf[class*="1"] .text{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-iteration-count:7;animation-iteration-count:7;-webkit-animation-name:disco;animation-name:disco;background:#fb2d81;color:#fff;padding:20px 0;text-align:center}';
    style.type = "text/css";
    style.rel = "stylesheet";

    document.getElementsByTagName("head")[0].appendChild(style);

    var wrapper = document.createElement('div');
    wrapper.innerHTML = getContainer();  

    (_defaults.position.indexOf('top') > -1) 
      ? (html.insertBefore(wrapper.firstChild, html.firstChild) 
        && html.classList.add('tf-top')) 
      : html.insertBefore(wrapper.firstChild, html.nextSibling);

    html.insertBefore(wrapper.lastChild, html.nextSibling);

    _tpDiv = document.getElementById(_defaults.tagId);
    _tpWrapper = document.getElementById(_defaults.tagId).parentNode;
    _emailInput = document.getElementById('u_email');
    _messageInput = document.getElementById('u_message');

    if (_defaults.position.indexOf('right') > -1) html.classList.add('tf-right');
    if (_defaults.size.indexOf('large') > -1) html.classList.add('tf-large');
    if (_defaults.size.indexOf('medium') > -1) html.classList.add('tf-medium');
  }

  function doFlip() {
    html.classList.add('do-flip');
  }

  function updateClassses(s) {
    _tpDiv.classList.remove(s-1);
    _tpDiv.classList.add(s);
  }

  function setText(text) {
    _tpDiv
      .getElementsByClassName('text')[0].innerHTML = text;
  }

  function getContainer() {
    if (_defaults.message) {
      var message = (_defaults.message.length > 65) 
        ?  _defaults.message.substring(0, 63) + '..'
        :  _defaults.message;
    } 
    else {
      var message = 'Ouch, you table flipped the homepage. Let them know why!';
    }
    return '<div class=tf-wrapper><div id=tf class=0><div class=text>'+ _states[0] +'</div><div class=form><div class=message>'+ message +'</div><div class=u_message><textarea id=u_message rows=4 placeholder="Why you flipped?"></textarea></div><div class=email><input type=email id=u_email placeholder="Enter your email"></div><button>Cancel</button><button>Send</button></div><a href=http://tableflip.co target=_blank>tableflip.co</a></div></div><div class=tf-overlay>(╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯ (╯°□°)╯</div>';
  };

  var tableFlip = {
    init: function (options) {
      if(!html || !body) return new Error("tableflip.js Error: Could not append itself.");
      if(!options) return new Error("tableflip.js Error: init() neeed options argument.");

      _defaults.position = options.position  || '';
      _defaults.size =  options.size || '';
      _defaults.message = options.message || null;

      _data.toEmail = options.email || '';
      if(!validEmail(_data.toEmail)) return new Error("tableflip.js Error: No Valid email!");

      _data.authKey =  options.key;
      if(!_data.authKey) return new Error("tableflip.js Error: No authKey!");

      _data.url = location.href;

      initVisualz();
      initListeners();
    }
  }
  
  exports.tableFlip = tableFlip;
  var currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  
  if(currentScript) {
    var o = {};
    Array.prototype.slice.call(currentScript.attributes).forEach(function(item){
      o[item.name] = item.value;
    })
    if(o.email && o.key) exports.tableFlip.init(o);
  } 

})(window, document.getElementsByTagName("html")[0], document.getElementsByTagName('body')[0]);


