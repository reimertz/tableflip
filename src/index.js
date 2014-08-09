(function(exports, htmlTag){
  var _cssAnimation = {},
      _state = 0,
      _states = [{
        'text': "(° °）┬─┬"
      },{
        'text': "(°□°）┬─┬"
      },{
        'text': "(╯°□°) ┬─┬"
      },{
        'text': "(╯°□°)╯︵ ┻━┻"
      }],
      _settings = {
        initialState : 0,
        tagId : 'table-flip',
        cssLocation: '//rawgit.com/reimertz/tableflip.js/master/dist/tableflip.min.css' //tableflip.min.css
      };

    handleClick = function() {
      _state++;
      if(_state >3 ) return;
      if(_state == 3) doFlip();

      updateClassses(_state);
      setText(_states[_state].text);      
    };

    doFlip = function() {
      document.getElementsByTagName('body')[0].classList.add('do-flip');
    }

    updateClassses = function() {
      document.getElementById(_settings.tagId).classList.remove('table-flip-' + (_state-1));
      document.getElementById(_settings.tagId).classList.add('table-flip-' + _state);
    };

    setText = function(text) {
      document.getElementById(_settings.tagId).innerHTML = text;
    };

    getContainer = function(s) {
      if (s.length > _states.length) return;

      return  '<div id="table-flip" class="table-flip-' + s + '">'
              + _states[s].text
              + '</div>';
    };

  var tableFlip = {
    init: function () {

      if (htmlTag) {

        var link = document.createElement("link");
        link.href =  ((location.protocol == 'https:') ? location.protocol : 'http:') + _settings.cssLocation;
        link.type = "text/css";
        link.rel = "stylesheet";

        document.getElementsByTagName("head")[0].appendChild(link);

        var wrapper = document.createElement('div')
        wrapper.innerHTML = getContainer(_settings.initialState);

        htmlTag.appendChild(wrapper.firstChild);

        document.getElementById(_settings.tagId).addEventListener('click', function() {
          handleClick();
        });
      } 
      else {
        console.log('Error loading TableFlip.js: Could not append to <HMTL>.');
      }
    }
  }
  
  exports.tableFlip = tableFlip;
  exports.tableFlip.init();

})(window, document.getElementsByTagName("html")[0]);


