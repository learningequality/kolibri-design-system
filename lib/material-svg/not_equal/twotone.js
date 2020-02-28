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
            _c('path', { attrs: { 'd': 'M19 9.998H5v-2h14zm0 6H5v-2h14z' } }),
            _c('path', { attrs: { 'd': 'M14.08 4.605l1.84.79l-6 14l-1.84-.79z' } })
        ]);
    }
}