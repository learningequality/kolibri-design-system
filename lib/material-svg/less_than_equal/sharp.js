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
        }, [
            _c('path', {
                attrs: {
                    'd': 'M17.5 15.5L9.25 10l8.25-5.5l-1-1.5L6 10l10.5 7z',
                    'fill-rule': 'evenodd'
                }
            }),
            _c('path', {
                attrs: {
                    'fill-rule': 'nonzero',
                    'd': 'M18 20.998H6v-2h12z'
                }
            })
        ]);
    }
}