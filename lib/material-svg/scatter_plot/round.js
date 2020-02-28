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
                    'cx': '7',
                    'cy': '14',
                    'r': '3'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '11',
                    'cy': '6',
                    'r': '3'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '16.6',
                    'cy': '17.6',
                    'r': '3'
                }
            })
        ]);
    }
}