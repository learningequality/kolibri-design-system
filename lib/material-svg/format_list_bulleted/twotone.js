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
            _c('path', { attrs: { 'd': 'M7 5h14v2H7z' } }),
            _c('circle', {
                attrs: {
                    'cx': '4',
                    'cy': '6',
                    'r': '1.5'
                }
            }),
            _c('path', { attrs: { 'd': 'M7 11h14v2H7zm0 6h14v2H7zm-3 2.5c.82 0 1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.68-1.5 1.5s.68 1.5 1.5 1.5z' } }),
            _c('circle', {
                attrs: {
                    'cx': '4',
                    'cy': '12',
                    'r': '1.5'
                }
            })
        ]);
    }
}