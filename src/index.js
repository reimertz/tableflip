(function(exports, html, body, script){
  'use strict';

  var _state = 0,
  _states = [{
    'text': '<face>(°□°)</face> ┬─┬'
  },{
    'text': '<face>(╯°□°)</face> ┬─┬'
  },{
    'text': '<face>(╯°□°)╯</face> ︵ ┻━┻'
  },{
    'text': 'Sending..'
  },{
    'text': 'Sent!'
  },{
    'text': 'Server error!'
  },{
    'text': 'Wrong Auth key!'
  }],
  _listeners = [],
  _tpDiv,
  _tpWrapper,
  _messageInput,
  _emailInput,
  _hasMessage = false,
  _validEmail = false,
  _data = {},
  _settings = {
    initialState : 0,
    tagId : 'table-flip',
    cssLocation: '<%= cssLocation %>'
  };

  function handleClick(event) {
    _state++;
    if(_state > 2 ) {return;}
    if(_state === 2) { doFlip(); }

    updateClassses(_state);
    setText(_states[_state].text);      
  }

  function onSubmit() {
    if(_hasMessage + _validEmail < 2) return;

    _data.fromEmail = _emailInput.value;
    _data.message = _messageInput.value;

    sendMail(_data);
  }

  function sendMail(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', <%= protocol %>'<%= mailServer %>/sendmail', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    setText(_states[3].text);

    xhr.onloadend = function (res) {
      if (res.target.status === 200) return onDone();
      if (res.target.status === 401) return onAuthFail();
      
      onFail();
    };
  }

  function onDone() {
    setText(_states[4].text);
    setTimeout(function(){
      onCancel();
    },4500);
  }

  function onAuthFail() {
    _tpDiv.classList.add('fail');
    setTimeout(function(){
      _tpDiv.classList.remove('fail');
    },100);
    setText(_states[6].text);
  }

  function onFail() {
    _tpDiv.classList.add('fail');
    setTimeout(function(){
      _tpDiv.classList.remove('fail');
    },100);
    setText(_states[5].text);
  }

  function onCancel() {
    body.classList.remove('do-flip');
    body.classList.add('reverse-flip');

    setTimeout(function(){
      body.classList.remove('reverse-flip');
    },1000);

    _tpDiv.classList.remove(_state);

    _state = 0;
    _emailInput.value = '';
    _messageInput.value = '';
    updateClassses(_state);
    setText(_states[_state].text);      
  }

  function initListeners(){
    _listeners.push(_tpDiv.
      getElementsByClassName('text')[0].addEventListener('click', function(event) {
        event.stopPropagation();

        handleClick(event);
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
    var link = document.createElement("link");
    link.href =  <%= protocol %> _settings.cssLocation;
    link.type = "text/css";
    link.rel = "stylesheet";

    document.getElementsByTagName("head")[0].appendChild(link);

    var wrapper = document.createElement('div');
    wrapper.innerHTML = getContainer(_settings.initialState);  

    (_settings.position.indexOf('top') > -1) 
      ? (html.insertBefore(wrapper.firstChild, html.firstChild) 
        && html.classList.add('tp-top')) 
      : html.insertBefore(wrapper.firstChild, html.nextSibling);

    _tpDiv = document.getElementById(_settings.tagId);
    _tpWrapper = document.getElementById(_settings.tagId).parentNode;
    _emailInput = document.getElementById('u_email');
    _messageInput = document.getElementById('u_message');

    if (_settings.position.indexOf('right') > -1) html.classList.add('tp-right');
    if (_settings.size.indexOf('large') > -1) html.classList.add('tp-large');
    if (_settings.size.indexOf('medium') > -1) html.classList.add('tp-medium');
  }

  function doFlip() {
    body.classList.add('do-flip');
  }

  function updateClassses(s) {
    _tpDiv.classList.remove(s-1);
    _tpDiv.classList.add(s);
  }

  function setText(text) {
    _tpDiv
      .getElementsByClassName('text')[0].innerHTML = text;
  }

  function getContainer(s) {
    if (s.length > _states.length) return;

    if (_settings.message) {
      var message = (_settings.message.length > 65) 
        ?  _settings.message.substring(0, 63) + '..'
        :  _settings.message;
    } 
    else {
      var message = 'Ouch, you table flipped the homepage. Let them know why!';
    }

    return  '<div class="table-flip-wrapper">' +
              '<div id="table-flip" class="' + s + '">' +
                '<div class="text">' + _states[s].text + '</div>' +
                '<div class="form">' +
                  '<div class="message">' + message + '</div>'+
                  '<div class="u_message"><textarea id="u_message" rows="4" placeholder="Enter your message"></textarea></div>' +
                  '<div class="email"><input type="email" id="u_email" placeholder="Enter your email"></div>'+
                  '<button type="submit">Cancel</button>' +
                  '<button type="submit">Send</button>' +
                '</div>'+
                '<a href="http://tableflip.co" target="_blank">tableflip.co</a>'+
              '</div>' + 
            '</div>';
  };

  var tableFlip = {
    init: function () {
      if(!html) throw new Error("Error loading TableFlip.js: Could not append to <HMTL>.'");
      if(!script) throw new Error("Error loading TableFlip.js attributes..'");

      _settings.position = script.getAttribute('position') || '';
      _settings.size = script.getAttribute('size') || '';
      _settings.message = script.getAttribute('message') || null;

      _data.toEmail = script.getAttribute('email');
      if(!validEmail(_data.toEmail)) throw new Error("tableflip.co Error: No Valid email!");

      _data.authKey = script.getAttribute('auth-key') || '';
      if(!_data.authKey) throw new Error("tableflip.co Error: No authKey!");

      _data.url = location.href;

      initVisualz();
      initListeners();
    }
  }
  
  exports.tableFlip = tableFlip;
  exports.tableFlip.init();

})(window, document.getElementsByTagName("html")[0], document.getElementsByTagName('body')[0], document.currentScript);


