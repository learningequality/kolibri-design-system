module.exports = function render() {
    with (this) {
        return _c('svg', {
            class: rtlClass,
            style: style,
            attrs: {
                'role': 'presentation',
                'focusable': 'false',
                'xmlns': 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                'width': '24',
                'height': '24',
                'viewBox': '0 0 24 24'
            }
        }, [
            _c('defs', [_c('path', {
                    attrs: {
                        'id': 'ic-a',
                        'd': 'M0 0h24v24H0V0z'
                    }
                })]),
            _c('clipPath', { attrs: { 'id': 'ic-b' } }, [_c('use', {
                    attrs: {
                        'xlink:href': '#ic-a',
                        'overflow': 'visible'
                    }
                })]),
            _c('path', {
                attrs: {
                    'clip-path': 'url(#ic-b)',
                    'd': 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4l1.9 1.9l5.3-5.3L17 7.3L10.3 14z'
                }
            })
        ]);
    }
}