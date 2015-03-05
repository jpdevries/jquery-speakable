/*
 *  jquery-speakable - v0.0.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by JP DeVries @jpdevries
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

	"use strict";

		var pluginName = "speakable",
				defaults = {
				voice: null,
				lang:'en-US',
				msg:null,
                rate:null,
                pitch:null,
                volume:null,
				transcript:'',
				tidyTranscript:true,
				unspeakable:'[muted]',
				enunciate:'enunciate',
                onstart:function(){},
                onend:function(){},
                onerror:function(){},
                onpause:function(){},
                onresume:function(){},
                onmark:function(){},
                onboundary:function(){}      
		};

		function Plugin ( element, options ) {
				this.element = element;

				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		$.extend(Plugin.prototype, {
				init: function () {
                        if(!window.speechSynthesis) return;
						var _that = this;
						var _element = $(this.element);
				},
				speak: function () {
                    var voices = window.speechSynthesis.getVoices();
                    var _element = $(this.element);
                    var _settings = this.settings;

                    if(_element[0].dataset.voice) {_settings.voice = _element[0].dataset.voice;}
                    if(_element[0].dataset.lang) {_settings.lang = _element[0].dataset.lang;}
                    if(_element[0].dataset.transcript) {_settings.transcript = _element[0].dataset.transcript;}
                    if(_element[0].dataset.text) {_settings.text = _element[0].dataset.text;}
                    if(_element[0].dataset.rate) {_settings.rate = _element[0].dataset.rate;}
                    if(_element[0].dataset.pitch) {_settings.pitch = _element[0].dataset.pitch;}
                    if(_element[0].dataset.volume) {_settings.volume = _element[0].dataset.volume;}

                    var _voice = _settings.voice || null;        
                    var _ns = [];
                    var _transcript;
                    var _msg = (_settings.text || $(_element).data('text')) || null;
                    
                    function formulateSpokenMessage(_element) {
                        var _t = $(_element).clone();
                        if(!_settings.tidyTranscript) {return _t.text();}
                        if(_t.data(_settings.enunciate)) {return _t.data(_settings.enunciate);}
                        if(_settings.enunciate) {
                            _t.find('*[data-' + _settings.enunciate + ']').each(function(){
                                $(this).text($(this).attr('data-' + _settings.enunciate));
                            });
                        }
                        if(_settings.unspeakable) {_t.find(_settings.unspeakable).empty().remove();}
                        return _t.text();
                    }
                    
                    if(!_msg) {
                        if(document.getElementById(_settings.transcript)) {
                            _transcript = formulateSpokenMessage(document.getElementById(_settings.transcript));
                        } else if(_settings.transcript) {
                            _transcript = _settings.transcript;
                        } else { // we have nothing
                            _transcript = formulateSpokenMessage(_element);
                        }
                    } else {
                        _transcript = _msg;
                    }
                    
                    var msg = new SpeechSynthesisUtterance(); 
                    msg.text = _transcript;
                    msg.lang = _settings.lang;
                    if(_voice !== null) msg.voice = voices.filter(function(voice) { return voice.name === (_voice); })[0];
                    
                    if(_settings.rate !== null) {msg.rate = _settings.rate;}
                    if(_settings.pitch !== null) {msg.pitch = _settings.pitch;}
                    if(_settings.volume !== null) {msg.volume = _settings.volume;}
                    
                    if(typeof(_settings.onstart) === "function") {msg.onstart = _settings.onstart;}
                    if(typeof(_settings.onend) === "function") {msg.onend = _settings.onend;}
                    if(typeof(_settings.onerror) === "function") {msg.onerror = _settings.onerror;}
                    if(typeof(_settings.onpause) === "function") {msg.onpause = _settings.onpause;}
                    if(typeof(_settings.onresume) === "function") {msg.onresume = _settings.onresume;}
                    if(typeof(_settings.onmark) === "function") {msg.onmark = _settings.onmark;}
                    if(typeof(_settings.onboundary) === "function") {msg.onboundary = _settings.onboundary;}

                    window.speechSynthesis.speak(msg); 
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );