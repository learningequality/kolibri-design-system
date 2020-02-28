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
                    'd': 'M1 21h12v2H1zM5.245 8.07l2.83-2.827l14.14 14.142l-2.828 2.828zM12.317 1l5.657 5.656l-2.83 2.83l-5.654-5.66zM3.825 9.485l5.657 5.657l-2.828 2.828l-5.657-5.657z',
                    'clip-path': 'url(#ic-b)'
                }
            })
        ]);
    }
}