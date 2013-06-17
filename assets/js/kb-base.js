// Global touch events

var on = 'ontouchend' in window,
    downEvent = (on) ? 'touchstart ' : 'mousedown ',
    moveEvent = (on) ? 'touchmove ' : 'mousemove ',
    upEvent = (on) ? 'touchend ' : 'mouseup ';

