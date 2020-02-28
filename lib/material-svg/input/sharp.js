module.exports = function render() {
    with (this) {
        return _c('svg', {
            class: rtlClass,
            style: style,
            attrs: {
                'role': 'presentation',
                'focusable': 'false',
                'width': '24',
                'height': '24',
                'xmlns': 'http://www.w3.org/2000/svg',
                'viewBox': '0 0 24 24'
            }
        }, [
            _c('path', { attrs: { 'd': 'M23 3.01H1V9h2V4.99h18v14.03H3V15H1v5.99h22z' } }),
            _c('path', { attrs: { 'd': 'M11 16l4-4l-4-4v3H1v2h10z' } })
        ]);
    }
}