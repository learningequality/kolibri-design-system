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
                    'd': 'M16 14.14V9.86L12.97 12z'
                }
            }),
            _c('path', { attrs: { 'd': 'M6 6h2v12H6zm12 12V6l-8.5 6l8.5 6zm-2-3.86L12.97 12L16 9.86v4.28z' } })
        ]);
    }
}