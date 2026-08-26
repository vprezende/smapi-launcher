<div align="center">
  <h1>Welcome to SMAPI Launcher 👋</h1>

  [![version][version-badge]][github-repo]
  [![npm][npm-badge]][npm]
  [![node][node-badge]][node]
  [![maintained][maintained-badge]][github-repo]
  [![license][license-badge]][license]
  [![discord][discord-badge]][discord]
</div>

[version-badge]: https://img.shields.io/badge/version-v1.0.2-blue.svg

[npm-badge]: https://img.shields.io/badge/npm-v11.19.0-blue.svg
[node-badge]: https://img.shields.io/badge/node-v24.20.0-blue.svg

[maintained-badge]: https://img.shields.io/badge/maintained-yes-green.svg

[github-profile]: https://github.com/vprezende
[github-repo]: https://github.com/vprezende/smapi-launcher
[github-issues]: https://github.com/vprezende/smapi-launcher/issues

[license-badge]: https://img.shields.io/npm/l/smapi-launcher.svg?color=yellow
[discord-badge]: https://img.shields.io/badge/Discord-@vinigator-5865F2?logo=discord&logoColor=white

[npm]: https://www.npmjs.com/package/smapi-launcher
[node]: https://nodejs.org
[license]: https://github.com/vprezende/smapi-launcher/blob/main/LICENSE
[discord]: https://discord.com/users/561688008894447628

> A fast CLI tool built to create native silent launchers and apply essential patches for 
> SMAPI (Stardew Valley).

---

## 🎮 What is SMAPI Launcher?

**SMAPI Launcher** is a fast CLI tool built to create native silent launchers and apply essential patches for 
SMAPI (Stardew Valley).

- **Silent Executable Launcher:** Generates native executables compiled with `CREATE_NO_WINDOW` and conditional 
`windows_subsystem = "windows"`, running SMAPI without opening black command prompt/terminal windows.
  
- **Performance Optimizations:** Easily apply or revert .NET runtime configuration(`runtimeconfig.json`) optimizations 
with Concurrent Garbage Collector to eliminate stuttering and ensure smooth gameplay.
  
- **Compatibility Patches:** Easily apply or revert essential patches to ensure stable game compatibility, 
including Linux multiplayer (`libGalaxy64.so`) support.

---

## 📦 Installation

Install **SMAPI Launcher** globally using your preferred package manager:

```bash
npm install -g smapi-launcher
```

```bash
yarn global add smapi-launcher
```

Or run directly without installation using **npx**:

```bash
npx smapi-launcher --help
```

---

## 🚀 Usage

1. Generate a silent launcher executable:

```bash
smapi-launcher -p /path/to/Stardew\ Valley -o LaunchSMAPI
```

2. Apply essential performance and compatibility patches:

```bash
smapi-launcher patch -p /path/to/Stardew\ Valley
```

3. Revert applied patches:

```bash
smapi-launcher unpatch -p /path/to/Stardew\ Valley
```

4. Display version information:

```bash
smapi-launcher --version
```

5. Display usage information:

```bash
smapi-launcher --help
```

---

## ⚡ Commands

<table>
  <thead>
    <tr>
      <th align="left">Command</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>patch</code>
      </td>
      <td>
        Apply essential performance (.NET GC) and compatibility patches.
      </td>
    </tr>
    <tr>
      <td>
        <code>unpatch</code>
      </td>
      <td>
        Revert applied performance (.NET GC) and compatibility patches.
      </td>
    </tr>
  </tbody>
</table>

---

## ⚙️ Options

<table>
  <thead>
    <tr>
      <th align="left">Option</th>
      <th align="left">Short</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code> --path &lt;dir&gt; </code>
      </td>
      <td>
        <code> -p </code>
      </td>
      <td>Path to the Stardew Valley folder.</td>
    </tr>
    <tr>
      <td>
        <code> --output &lt;name&gt; </code>
      </td>
      <td>
        <code> -o </code>
      </td>
      <td>Name of the generated launcher.</td>
    </tr>
    <tr>
      <td>
        <code> --version </code>
      </td>
      <td>
        <code> -v </code>
      </td>
      <td>Show version number.</td>
    </tr>
    <tr>
      <td>
        <code> --help </code>
      </td>
      <td>
        <code> -h </code>
      </td>
      <td>Show this usage information.</td>
    </tr>
  </tbody>
</table>

---

## 🤝 How to Contribute

Contributions are welcome! If you would like to contribute to the project, report bugs, or
submit new features, check out the GitHub repository:

**[GitHub Repository][github-repo]**

---

## 💬 Community

Have questions, suggestions, or need help with SMAPI Launcher? Join the discussions and open
issues on GitHub:

**[GitHub Issues][github-issues]**

---

## Author

👤 **Vinicius Rezende**

- GitHub: [@vprezende][github-profile]
- Discord: [@vinigator][discord]

---

## ☕ Support

If you find **SMAPI Launcher** helpful, consider supporting the development! Your support helps maintain the project, fuels my late-night coding sessions, and makes up for the countless nights of sleep lost while building it. 👇

<a href="https://www.buymeacoffee.com/vprezende" target="_blank">
  <img src="https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-yellow.svg" alt="Buy Me A Coffee" width="150" height="35">
</a>

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE][license] file for more details.
