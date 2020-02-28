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
            _c('circle', {
                attrs: {
                    'opacity': '.3',
                    'cx': '19.5',
                    'cy': '19.5',
                    'r': '1.5'
                }
            }),
            _c('path', {
                attrs: {
                    'opacity': '.3',
                    'd': 'M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73c0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '19.5',
                    'cy': '19.5',
                    'r': '1.5'
                }
            }),
            _c('path', { attrs: { 'd': 'M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73c0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z' } })
        ]);
    }
}