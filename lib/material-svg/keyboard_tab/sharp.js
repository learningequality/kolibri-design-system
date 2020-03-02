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
        }, [_c('path', { attrs: { 'd': 'M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6l-6-6l-1.41 1.41zM20 6v12h2V6h-2z' } })]);
    }
}