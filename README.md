# RedPowerPE
Port of RedPower 2 for Minecraft 1.4.7 to Minecraft PE running on Inner Core modloader.

## How to play?
1. Install Horizon app from the [apk](https://gitlab.com/zhekasmirnov/horizon-cloud-config/-/raw/master/horizon/app-x64-release.apk?inline=false)
2. Open app and install the Inner Core pack
3. Install the mod via the Mod Manager, or download it from the [GitHub release](https://github.com/MineExplorer/RedPowerPE/releases) and extract it into the Inner Core mods folder.

## Development
The project uses a built-in modding toolchain optimized for TypeScript development.

### Requirements
1. [Visual Studio Code IDE](https://code.visualstudio.com/)
2. [Python 3.7](https://www.python.org/downloads/) or higher
3. [Node.js 14.17](https://nodejs.org/en/download/current) or higher
4. TypeScript compiler v5 (run `npm install -g typescript@5`), v6 and v7 are not supported!
5. [Android Debug Bridge (adb)](https://developer.android.com/tools/releases/platform-tools)
    - Extract files from `platform-tools` to `/toolchain/adb` in repo root or add ADB to your Path environment variables

### Building
1. Clone repository
2. Execute the `Download Declarations` task in VS Code (Ctrl+Shift+B)
3. Build project using the `Build Everything` task
4. You're ready to work! Use the `Build and Push Everything` task to test your changes on a phone or emulator.

## Note
It's unofficial port. All rights for textures from RedPower 2 used in the project belong to Eloraam, creator of the original mod.
