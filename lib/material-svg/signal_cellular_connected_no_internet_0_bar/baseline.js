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
                    'd': 'M22 8V2L2 22h16V8z'
                }
            }),
            _c('path', { attrs: { 'd': 'M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z' } })
        ]);
    }
}