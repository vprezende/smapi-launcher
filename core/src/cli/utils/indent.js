export default function indent(text, count) {

  let textContent = text;
  let indentSize = count;

  if (!count) {
    textContent = '';
    indentSize = text;
  }

  const spaceChar = ' ';
  const indentationPrefix = spaceChar.repeat(indentSize);

  const indentedText = `${indentationPrefix}${textContent}`;

  return indentedText;
}