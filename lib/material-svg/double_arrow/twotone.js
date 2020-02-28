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
            _c('path', { attrs: { 'd': 'M15.5 5H11l5 7l-5 7h4.5l5-7z' } }),
            _c('path', { attrs: { 'd': 'M8.5 5H4l5 7l-5 7h4.5l5-7z' } })
        ]);
    }
}