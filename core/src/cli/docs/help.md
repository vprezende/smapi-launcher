Usage:
  smapi_launcher -p <path> -o <name>
  smapi_launcher patch -p <path>
  smapi_launcher unpatch -p <path>

Commands:
  patch           Apply essential performance (.NET GC) and compatibility patches.
  unpatch         Revert applied performance and compatibility patches.

Options:
  -p, --path      Path to the Stardew Valley folder.
  -o, --output    Name of the generated launcher.
  -h, --help      Show this usage information.

Examples:
  smapi_launcher -p /path/to/Stardew Valley -o LaunchSMAPI
  smapi_launcher patch -p /path/to/Stardew Valley
  smapi_launcher unpatch -p /path/to/Stardew Valley
