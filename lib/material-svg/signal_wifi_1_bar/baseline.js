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
                    'fill-opacity': '.3',
                    'd': 'M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49l.01.01l.01-.01z'
                }
            }),
            _c('path', { attrs: { 'd': 'M6.67 14.86L12 21.49v.01l.01-.01l5.33-6.63C17.06 14.65 15.03 13 12 13s-5.06 1.65-5.33 1.86z' } })
        ]);
    }
}