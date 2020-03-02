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
            _c('path', { attrs: { 'd': 'M17 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-3.26 0l1.26.84V7z' } }),
            _c('path', { attrs: { 'd': 'M10 3v1.51l2 1.33V5h9v14h-4v2h6V3z' } }),
            _c('path', { attrs: { 'd': 'M8.17 5.7L15 10.25V21H1V10.48L8.17 5.7zM10 19h3v-7.84L8.17 8.09L3 11.38V19h3v-6h4v6z' } })
        ]);
    }
}