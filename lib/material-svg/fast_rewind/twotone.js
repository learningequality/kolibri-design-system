module.exports = function render() {
    with (this) {
        return _c('svg', {
            class: rtlClass,
            style: style,
            attrs: {
                'role': 'presentation',
                'focusable': 'false',
                'xmlns': 'http://www.w3.org/2000/svg',
                'width': '24',
                'height': '24',
                'viewBox': '0 0 24 24'
            }
        }, [
            _c('path', {
                attrs: {
                    'opacity': '.3',
                    'd': 'M9 14.14V9.86L5.97 12zm9 0V9.86L14.97 12z'
                }
            }),
            _c('path', { attrs: { 'd': 'M11 6l-8.5 6l8.5 6V6zm-2 8.14L5.97 12L9 9.86v4.28zM20 6l-8.5 6l8.5 6V6zm-2 8.14L14.97 12L18 9.86v4.28z' } })
        ]);
    }
}