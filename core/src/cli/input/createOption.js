export default function createOption(type, short) {

  const option = new Object();

  option.type = type;
  option.short = short;

  return option;
}