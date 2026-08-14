import * as nodeEmoji from 'node-emoji';

export default function emoji(name) {

  const emojis = {
    check: '\u2714',
    file_folder: '\u{1F5C0}'
  };

  const emojiChar = emojis[name] ?? nodeEmoji.get(name);
  
  return emojiChar;
}
