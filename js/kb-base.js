// Global touch events

var on = 'ontouchend' in window,
    downEvent = (on) ? 'touchstart' : 'mousedown',
    upEvent = (on) ? 'touchend' : 'mouseup';

