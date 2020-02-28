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
                    'cx': '12',
                    'cy': '17',
                    'r': '4'
                }
            }),
            _c('path', { attrs: { 'd': 'M12 10.07c1.95 0 3.72.79 5 2.07l5-5C19.44 4.59 15.9 3 12 3S4.56 4.59 2 7.15l5 5a7.06 7.06 0 0 1 5-2.08z' } })
        ]);
    }
}