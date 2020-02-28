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
                    'opacity': '.3',
                    'd': 'M12 7.77L5.61 18h12.78z'
                }
            }),
            _c('path', { attrs: { 'd': 'M12 4L2 20h20L12 4zm0 3.77L18.39 18H5.61L12 7.77z' } })
        ]);
    }
}