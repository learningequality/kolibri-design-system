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
            _c('path', { attrs: { 'd': 'M20 1H8v17.99h12V1zm-6 2c1.1 0 2 .89 2 2s-.9 2-2 2s-2-.89-2-2s.9-2 2-2zm0 13.5c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z' } }),
            _c('circle', {
                attrs: {
                    'cx': '14',
                    'cy': '12.5',
                    'r': '2.5'
                }
            }),
            _c('path', { attrs: { 'd': 'M6 5H4v18h12v-2H6z' } })
        ]);
    }
}