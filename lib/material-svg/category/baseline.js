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
            _c('path', { attrs: { 'd': 'M12 2l-5.5 9h11z' } }),
            _c('circle', {
                attrs: {
                    'cx': '17.5',
                    'cy': '17.5',
                    'r': '4.5'
                }
            }),
            _c('path', { attrs: { 'd': 'M3 13.5h8v8H3z' } })
        ]);
    }
}