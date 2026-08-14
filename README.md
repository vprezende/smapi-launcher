<div align="center">
  <img src=".github/assets/banner.png" alt="SMAPI Launcher">

  <br>

  <h1>SMAPI Launcher</h1>

  <br>

  <p>A fast and lightweight CLI tool to generate native silent executable launchers for SMAPI (Stardew Valley).</p>
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
    <strong>Markdown & YAML Frontmatter:</strong> Maintaining clean, decoupled configuration and help templates.
  </li>
  <li>
    <img src="https://cdn.simpleicons.org/yarn/2C8EBB" width="16"> 
    <strong>Yarn:</strong> Fast, reliable dependency and package management.
  </li>
</ul>

## ✨ Features

- **Silent Executable Launcher:** Generates native executables compiled with `CREATE_NO_WINDOW` and conditional `windows_subsystem = "windows"`, running SMAPI without opening black command prompt/terminal windows.
- **Decoupled Developer & User Pipelines:** Clean separation between the developer compilation pipeline (`yarn build`) and the user CLI generator (`smapi-launcher`).
- **Decoupled Configuration:** Reads CLI flags and help screens dynamically from structured Markdown and YAML files.
- **Formatted Terminal Output:** Clean colored terminal feedback with status icons, custom emoji helpers, and path summaries.

## 🛠️ Getting Started

### Prerequisites

- ⚙️ Runtime: [Node.js](https://nodejs.org/)
- 📦 Package Manager: [Yarn](https://yarnpkg.com/)
- 🦀 Toolchain: [Rust](https://rustup.rs/)

> [!NOTE]
> When installed globally via NPM (`npm install -g smapi-launcher`), the Rust toolchain is not required, as the package ships with the pre-compiled binary (`launcher.bin`).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vprezende/smapi-launcher.git
```

2. Navigate to the project directory:

```bash
cd smapi-launcher
```

3. Install dependencies:

```bash
yarn install
```

4. Display usage information:

```bash
yarn smapi-launcher --help
```

5. Compile the binary template (Developers only):

```bash
yarn build
```

6. Generate a launcher executable:

```bash
yarn smapi-launcher -p /path/to/Stardew\ Valley -o LaunchSMAPI
```

## 🤝 How to Contribute

Contributions are welcome! If you would like to contribute to the project, follow the steps below:

1. Fork the project.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## ☕ Support

If you find **SMAPI Launcher** helpful, consider supporting the development! Your support helps maintain the project, fuels my late-night coding sessions, and makes up for the countless nights of sleep lost while building it. 👇

<a href="https://www.buymeacoffee.com/vprezende" target="_blank">
  <img src="https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-yellow.svg" alt="Buy Me A Coffee" width="150" height="35">
</a>

## 🙏 Acknowledgements

- **Banner:** Pixel artwork created by [@Beatzoid](https://www.reddit.com/user/Bratzoid/)

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
