Usage:
  smapi-launcher -p <path> -o <name>
  smapi-launcher patch -p <path>
  smapi-launcher unpatch -p <path>

Commands:
  patch           Apply essential performance (.NET GC) and compatibility patches.
  unpatch         Revert applied performance (.NET GC) and compatibility patches.

Options:
  -p, --path      Path to the Stardew Valley folder.
  -o, --output    Name of the generated launcher.
  -v, --version   Show version number.
  -h, --help      Show this usage information.

Examples:
  smapi-launcher -p /path/to/Stardew Valley -o LaunchSMAPI
  smapi-launcher patch -p /path/to/Stardew Valley
  smapi-launcher unpatch -p /path/to/Stardew Valley