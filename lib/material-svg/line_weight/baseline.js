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
                        'd': 'M0 0h24v24H0z'
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
                    'd': 'M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z'
                }
            })
        ]);
    }
}