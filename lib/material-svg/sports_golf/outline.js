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
            _c('path', { attrs: { 'd': 'M12 16c3.87 0 7-3.13 7-7s-3.13-7-7-7s-7 3.13-7 7s3.13 7 7 7zm0-12c2.76 0 5 2.24 5 5s-2.24 5-5 5s-5-2.24-5-5s2.24-5 5-5z' } }),
            _c('circle', {
                attrs: {
                    'cx': '10',
                    'cy': '8',
                    'r': '1'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '14',
                    'cy': '8',
                    'r': '1'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '12',
                    'cy': '6',
                    'r': '1'
                }
            }),
            _c('path', { attrs: { 'd': 'M7 19h2c1.1 0 2 .9 2 2v1h2v-1c0-1.1.9-2 2-2h2v-2H7v2z' } })
        ]);
    }
}