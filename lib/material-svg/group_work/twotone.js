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
            _c('path', {
                attrs: {
                    'opacity': '.3',
                    'd': 'M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8zM8 16c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm4-6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm4 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z'
                }
            }),
            _c('path', { attrs: { 'd': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z' } }),
            _c('circle', {
                attrs: {
                    'cx': '8',
                    'cy': '14',
                    'r': '2'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '12',
                    'cy': '8',
                    'r': '2'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '16',
                    'cy': '14',
                    'r': '2'
                }
            })
        ]);
    }
}