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
        }, [_c('path', { attrs: { 'd': 'M17.03 5L3 5.01v13.98l14.03.01L22 12l-4.97-7z' } })]);
    }
}