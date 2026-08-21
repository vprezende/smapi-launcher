<div align="center">
  <img src=".github/assets/banner.png" alt="SMAPI Launcher">
  <br>
  <h1>SMAPI Launcher</h1>
  <br>
  <p>A fast CLI tool to create native silent launchers and apply essential patches for SMAPI (Stardew Valley).</p>
</div>

---

## 🚀 Tech Stack

SMAPI Launcher is built with performance, simplicity, and modern native application standards in mind:

<ul>
  <li>
    <img src="https://cdn.simpleicons.org/rust/CE412B" width="16"> <strong>Language:</strong> High-performance, memory-safe native Win32 Rust launcher source code using <code>std::process::Command</code>.
  </li>
  <li>
    <img src="https://cdn.simpleicons.org/nodedotjs/5FA04E" width="16"> 
    <strong>Node.js:</strong> Fast, cross-platform CLI orchestrator.
  </li>
  <li>
    <img src="https://cdn.simpleicons.org/javascript/F7DF1E" width="16"> 
    <strong>Node Native Utils:</strong> Leveraging <code>node:util</code> (parseArgs) for zero-overhead CLI argument parsing.
  </li>
  <li>
    <img src="https://cdn.simpleicons.org/markdown/0891B2" width="16"> 
    <strong>Markdown:</strong> Used to manage clean CLI help docs and usage guides.
  </li>
  <li>
    <img src="https://cdn.simpleicons.org/yarn/2C8EBB" width="16"> 
    <strong>Yarn:</strong> Fast, reliable dependency and package management.
  </li>
</ul>

---

## ✨ Features

- **Silent Executable Launcher:** Generates native executables compiled with `CREATE_NO_WINDOW` and conditional `windows_subsystem = "windows"`, running SMAPI without opening black command prompt/terminal windows.

- **Performance Optimizations:** Easily apply or revert .NET runtime configuration (`runtimeconfig.json`) optimizations with Concurrent Garbage Collector to eliminate stuttering and ensure smooth gameplay.

- **Compatibility Patches:** Easily apply or revert essential patches to ensure stable game compatibility, including Linux multiplayer (`libGalaxy64.so`) support.

---

## 💻 Building from Source (Developers)

If you want to contribute or build the launcher locally from source:

### Prerequisites

- ⚙️ Runtime: [Node.js](https://nodejs.org/)
- 📦 Package Manager: [Yarn](https://yarnpkg.com/)
- 🦀 Toolchain: [Rust](https://rustup.rs/)
- 🛠️ Compiler: [MinGW-w64](https://www.mingw-w64.org/)

> [!NOTE]
> - **NPM Users:** The Rust toolchain and MinGW-w64 are not required when installing globally via 
> NPM (`npm install -g smapi-launcher`), as the package ships with the pre-compiled binary (`launcher.bin`).
> - **Windows Developers:** Compiles natively without requiring MinGW-w64.
> - **Linux Compatibility:** The `patch` utility (`sudo apt-get install patch`) is required only when 
> applying or reverting the multiplayer compatibility patch (`libGalaxy64.so`).

### Development Steps

1. Clone the repository:

```bash
git clone https://github.com/vprezende/smapi-launcher.git
```

2. Navigate to the project directory:

```bash
cd smapi-launcher
```

2. Install dependencies:

```bash
yarn install
```

3. Synchronize local environment versions:

```bash
yarn sync
```

4. Compile the native binary:

```bash
yarn build
```

5. Test the local CLI:

```bash
yarn smapi-launcher --help
```

---

## 📦 Installation

Install **SMAPI Launcher** globally using your preferred package manager (pre-compiled native binaries included):

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

## 🤝 How to Contribute

Contributions are welcome! If you would like to contribute to the project, follow the steps below:

1. Fork the project.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

---

## ☕ Support

If you find **SMAPI Launcher** helpful, consider supporting the development! Your support helps maintain the project, fuels my late-night coding sessions, and makes up for the countless nights of sleep lost while building it. 👇

<a href="https://www.buymeacoffee.com/vprezende" target="_blank">
  <img src="https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-yellow.svg" alt="Buy Me A Coffee" width="150" height="35">
</a>

---

## 🙏 Acknowledgements

- **Stardew Valley:** A heart-full thank you to Eric Barone ([@ConcernedApe](https://twitter.com/ConcernedApe)) for this masterpiece of a game.
- **SMAPI:** A huge thank you to [@Pathoschild](https://github.com/Pathoschild) for enabling the amazing Stardew Valley modding ecosystem.
- **Banner:** Special thanks to [@Beatzoid](https://www.reddit.com/user/Bratzoid/) for creating and sharing this incredible pixel artwork.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
