module.exports = function render() {
    with (this) {
        return _c('svg', {
            class: rtlClass,
            style: style,
            attrs: {
                'role': 'presentation',
                'focusable': 'false',
                'width': '24',
                'height': '24',
                'xmlns': 'http://www.w3.org/2000/svg',
                'viewBox': '0 0 24 24'
            }
        }, [_c('path', {
                attrs: {
                    'd': 'M6.5 17.5l8.25-5.5L6.5 6.5l1-1.5L18 12L7.5 19z',
                    'fill-rule': 'evenodd'
                }
            })]);
    }
}