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
                    'fill-rule': 'nonzero',
                    'd': 'M18.501 3.5l-15 15.001l1.996 1.996l15-15z'
                }
            }),
            _c('circle', {
                attrs: {
                    'opacity': '.3',
                    'cx': '7',
                    'cy': '7',
                    'r': '1',
                    'fill-rule': 'evenodd'
                }
            }),
            _c('circle', {
                attrs: {
                    'opacity': '.3',
                    'cx': '17',
                    'cy': '17',
                    'r': '1',
                    'fill-rule': 'evenodd'
                }
            }),
            _c('path', {
                attrs: {
                    'd': 'M17.003 14a3 3 0 1 1-.006 6a3 3 0 0 1 .006-6zM17 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM7.003 4a3 3 0 1 1-.006 6a3 3 0 0 1 .006-6zM7 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2z',
                    'fill-rule': 'nonzero'
                }
            })
        ]);
    }
}