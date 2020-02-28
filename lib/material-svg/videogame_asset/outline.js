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
            _c('path', { attrs: { 'd': 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z' } }),
            _c('circle', {
                attrs: {
                    'cx': '14.5',
                    'cy': '13.5',
                    'r': '1.5'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '18.5',
                    'cy': '10.5',
                    'r': '1.5'
                }
            })
        ]);
    }
}