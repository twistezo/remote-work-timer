## Remote work timer

### Description

Countdown timer to measure work time

### Features

- custom `TemplateManager` to manage active tab component states
- auto updated annual chart with some work statistics
- time data and settings are stored in files
- fake time data generator for testing purposes
- can be cross platform by `Electron`
- colors inspired by Dracula theme

### Tools

JavaScript ES6, Bootstrap 4, Electron 6, Electron-Forge 5 (as build tool)

### Build, run

To build use `yarn` instead of `npm`.

To run use `npm run` with one of the following:

- `start` to run
- `package` to pack for development
- `make` to pack for production

Possible `make` targets (set in `package.json`):

- `zip` - archive
- `squirrel` - Windows installer
- `appx` - Windows store app
- `wix` - Windows MSI file
- `deb`, `rpm`, `flatpak`, `snap` - Linux

### Screenshots

<table>
    <tr>
        <td>
            <img src="https://i.imgur.com/rV4ObT9.png" width="500">
        </td>
        <td>
            <img src="https://i.imgur.com/amdsFAd.png" width="500">
        </td>
    </tr>
    </tr>
    <tr>
        <td>
            <img src="https://i.imgur.com/ATvy2re.png" width="500">
        </td>
        <td>
            <img src="https://i.imgur.com/UCE6j4r.png" width="500">
        </td>
    </tr>
</table>
