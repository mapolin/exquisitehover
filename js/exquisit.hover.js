"use strict";

/* Setup basic hover effects */
function Full() {
    this.hoverIn = function() {
        var hoverObject = this.element.find('.hover');
        if( !hoverObject.is(':animated') ) {
            hoverObject.show().height(0).animate({
                'height': this.element.outerHeight()
            }, this.animSpeed);
        }
    };
    this.hoverOut = function() {
        var hoverObject = this.element.find('.hover');
        hoverObject.animate({
            'height': 0
        }, this.animSpeed);
    };
}
function Half() {
    this.hoverIn = function() {
        var hoverObject = this.element.find('.hover');
        if( !hoverObject.is(':animated') ) {
            hoverObject.show().height(0).animate({
                'height': this.element.outerHeight()/2
            }, this.animSpeed);
        }
    };
    this.hoverOut = function() {
        var hoverObject = this.element.find('.hover');
        hoverObject.animate({
            'height': 0
        }, this.animSpeed);
    };
}
function ShowFromBottom() {
    this.hoverIn = function() {
        var hoverObject = this.element.find('.hover');
        if( !hoverObject.is(':animated') ) {
            hoverObject.data( 'originalPosition', hoverObject.css('bottom') ).animate({
                'bottom': 0
            }, this.animSpeed);
        }
    };
    this.hoverOut = function() {
        var hoverObject = this.element.find('.hover');
        hoverObject.animate({
            'bottom': hoverObject.data('originalPosition')
        }, this.animSpeed);
    };
}
/* End of basic hover effects */

/* Exquisit Hover class */
function ExquisitHover(element, settings) {
    this.element = element;
    this.type = settings.type;
    this.animSpeed = settings.animSpeed;

    this.init();
}
ExquisitHover.prototype.init = function() {
    var _self = this;

    this.addType({
        name: 'full',
        execute: Full
    });
    this.addType({
       name: 'half',
        execute: Half
    });
    this.addType({
        name: 'showFromBottom',
        execute: ShowFromBottom
    });
    this.element.on({
        mouseenter: function() {
            _self[_self.type]['hoverIn'].call(_self);
        },
        mouseleave: function() {
            _self[_self.type]['hoverOut'].call(_self);
        }
    });
};
ExquisitHover.prototype.addType = function(type) {
    ExquisitHover.prototype[type.name] = new type.execute;
};

/* Setup the jQuery Plugin */
(function ($) {

    $.fn.Exquisit = function(options) {
        var defaults = {
            type: 'full',
            animSpeed: 'fast'
        };

        var settings = $.extend({}, defaults, options);
        return this.each(function() {
            var mh = new ExquisitHover($(this), settings);
            $(this).data('ExquisitHover', mh);
        });
    };

})(jQuery);