Usage:
  smapi_launcher -p <path> -o <name>
  smapi_launcher patch -p <path>
  smapi_launcher unpatch -p <path>

Commands:
  patch           Apply .NET Garbage Collection performance patch to reduce stuttering.
  unpatch         Remove .NET Garbage Collection performance patch.

Options:
  -p, --path      Path to the Stardew Valley folder.
  -o, --output    Name of the generated launcher.
  -h, --help      Show this usage information.

Examples:
  smapi_launcher -p /path/to/Stardew Valley -o LaunchSMAPI
  smapi_launcher patch -p /path/to/Stardew Valley
  smapi_launcher unpatch -p /path/to/Stardew Valley
