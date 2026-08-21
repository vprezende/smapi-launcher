import * as nodeEmoji from 'node-emoji';

export default function emoji(name) {

  const emojis = new Object();

  emojis.check = '\u2714';
  emojis.warning = '\u{25B2}';
  emojis.cross = '\u2716';

  emojis.file_folder = '\u{1F5C0}';
  emojis.bullet = '\u{2022}';

  const emojiChar = emojis[name] ?? nodeEmoji.get(name);
  
  return emojiChar;
}
