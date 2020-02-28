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
                    'd': 'M2 22h20V2z'
                }
            }),
            _c('path', { attrs: { 'd': 'M17 7L2 22h15z' } })
        ]);
    }
}