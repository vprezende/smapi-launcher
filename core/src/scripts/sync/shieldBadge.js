export default function shieldBadge(name, version, color) {

  const baseUrl = 'https://img.shields.io/badge';

  const badgeName = name;
  const badgeVersion = version;
  const badgeColor = color;

  const badgeParts = [
    badgeName, 
    badgeVersion, 
    badgeColor
  ];

  const badgeLabel = badgeParts.join('-');

  const badgeFile = `${badgeLabel}.svg`;
  const badgeUrl = `${baseUrl}/${badgeFile}`;

  const badgeSuffix = 'badge';

  const nameParts = [badgeName, badgeSuffix];
  
  const badgeKey = nameParts.join('-');

  const badgeLine = `[${badgeKey}]: ${badgeUrl}`;

  return badgeLine;
}