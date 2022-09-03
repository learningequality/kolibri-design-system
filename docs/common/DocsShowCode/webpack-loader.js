var TAG_PATTERN = new RegExp(`<DocsShowCode(.*?)>(.*?)</DocsShowCode>`, 'gms');

function escape(unsafe) {
  return (unsafe || '')
    .replace(/&/gm, '&amp;')
    .replace(/</gm, '&lt;')
    .replace(/>/gm, '&gt;');
}

module.exports = function(content) {
  return content.replace(TAG_PATTERN, function(_, attributes, innerText) {
    return `<DocsShowCode${attributes}>${escape(innerText)}</DocsShowCode>`;
  });
};
