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
            _c('defs', [_c('path', {
                    attrs: {
                        'id': 'ic-c',
                        'd': 'M0 0h24v24H0V0z'
                    }
                })]),
            _c('clipPath', { attrs: { 'id': 'ic-b' } }, [_c('use', {
                    attrs: {
                        'xlink:href': '#ic-a',
                        'overflow': 'visible'
                    }
                })]),
            _c('clipPath', {
                attrs: {
                    'id': 'ic-d',
                    'clip-path': 'url(#ic-b)'
                }
            }, [_c('use', {
                    attrs: {
                        'xlink:href': '#ic-c',
                        'overflow': 'visible'
                    }
                })]),
            _c('path', {
                attrs: {
                    'd': 'M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16l5.31 1.42c.8.21 1.62-.26 1.84-1.06c.21-.8-.26-1.62-1.06-1.84l-5.31-1.42l-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32l-1.45-.39v5.17l1.6.43l5.31 1.43z',
                    'clip-path': 'url(#ic-d)'
                }
            })
        ]);
    }
}