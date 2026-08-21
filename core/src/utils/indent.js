export default function indent(text, count) {

  let textContent = text;
  let indentSize = count;

  if (!count) {
    textContent = '';
    indentSize = text;
  }

  if (typeof textContent === 'function') {
    
    const indentedContent = textContent(indentSize);

    return indentedContent;
  }

  const spaceChar = ' ';
  const indentationPrefix = spaceChar.repeat(indentSize);

  const indentedText = `${indentationPrefix}${textContent}`;

  return indentedText;
}
