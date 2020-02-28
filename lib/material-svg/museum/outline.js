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
            _c('path', { attrs: { 'd': 'M22 11V9L12 2L2 9v2h2v9H2v2h20v-2h-2v-9h2zm-4 9H6V9h12v11z' } }),
            _c('path', { attrs: { 'd': 'M10 14l2 3l2-3v4h2v-7h-2l-2 3l-2-3H8v7h2z' } })
        ]);
    }
}