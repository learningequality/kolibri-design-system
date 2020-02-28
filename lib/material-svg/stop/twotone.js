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
                    'd': 'M8 8h8v8H8z'
                }
            }),
            _c('path', { attrs: { 'd': 'M6 18h12V6H6v12zM8 8h8v8H8V8z' } })
        ]);
    }
}