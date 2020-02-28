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
        }, [_c('path', { attrs: { 'd': 'M21 3H3v18h18V3zM10 17l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' } })]);
    }
}