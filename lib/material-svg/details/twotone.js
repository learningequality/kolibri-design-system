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
                    'd': 'M6.38 6L12 16l5.63-10z'
                }
            }),
            _c('path', { attrs: { 'd': 'M3 4l9 16l9-16H3zm3.38 2h11.25L12 16L6.38 6z' } })
        ]);
    }
}