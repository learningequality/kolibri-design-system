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
                    'd': 'M17 9c0-2.76-2.24-5-5-5S7 6.24 7 9c0 2.85 2.92 7.21 5 9.88c2.12-2.69 5-7 5-9.88zM9.5 9a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 1-5 0z'
                }
            }),
            _c('path', { attrs: { 'd': 'M19 9c0-3.87-3.13-7-7-7S5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13zm-7-5c2.76 0 5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9c0-2.76 2.24-5 5-5z' } }),
            _c('circle', {
                attrs: {
                    'cx': '12',
                    'cy': '9',
                    'r': '2.5'
                }
            })
        ]);
    }
}