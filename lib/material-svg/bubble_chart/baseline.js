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
                    'cx': '7.2',
                    'cy': '14.4',
                    'r': '3.2'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '14.8',
                    'cy': '18',
                    'r': '2'
                }
            }),
            _c('circle', {
                attrs: {
                    'cx': '15.2',
                    'cy': '8.8',
                    'r': '4.8'
                }
            })
        ]);
    }
}