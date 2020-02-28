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
        }, [_c('path', { attrs: { 'd': 'M5 4h14v2H5zm0 10h4v6h6v-6h4l-7-7l-7 7zm8-2v6h-2v-6H9.83L12 9.83L14.17 12H13z' } })]);
    }
}