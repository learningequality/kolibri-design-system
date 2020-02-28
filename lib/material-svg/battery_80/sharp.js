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
                    'fill-opacity': '.3',
                    'd': 'M17 4h-3V2h-4v2H7v5h10V4z'
                }
            }),
            _c('path', { attrs: { 'd': 'M7 9v13h10V9H7z' } })
        ]);
    }
}