import path from 'node:path';

export default function formatPath(launcherPath) {
  
  const pathSegments = launcherPath.split(path.sep);

  if (pathSegments.length <= 5) {
    return launcherPath;
  }

  const firstSegments = [
    pathSegments[0], 
    pathSegments[1]
  ];
  
  const lastSegments = [
    pathSegments.at(-2), 
    pathSegments.at(-1)
  ];

  const displaySegments = [
    ...firstSegments,
    '...',
    ...lastSegments,
  ];

  const displayPath = displaySegments.join(path.sep);

  return displayPath;
}
