# delphi README

Delphi extension to allow developer tooling for Delphi in VSCode.

If you have a *licensed install* of Embarcadero Delphi, this extension can be very useful should you need the help of a simple IDE to diagnose issues in dedicated build environments (e.g.: a VM used by your build pipelines), which typically do not need a full RAD Studio setup. Embarcadero allows you to copy the required binaries for the CLI utilities, for checking and compiling a project, to a build environment, and the extension configuration allows you to point to a non-standard Delphi bin path.

> [!NOTE]
> You will need a valid licensed Delphi install to copy the build tools from when setting up a dedicated build machine. This use scenario is covered and cited in Embarcadero documentation, however the required binaries are not openly distributed separately.

## Features

- Building and running projects
- Syntax highlighting
- LSP Integration
- Snippets

## Requirements

- Delphi 11 Alexandria or Delphi 12 Athens installed (tested with Delphi 12)
  - The newest installation under `Program Files (x86)\Embarcadero\Studio` that contains `DelphiLSP.exe` is used, unless `delphi.bin` is set
- VS Code 1.91 or later
- A trusted workspace (the extension is disabled in Restricted Mode because it starts DelphiLSP and runs build scripts)
- Project LSP config generated with Delphi
  - In Delphi: Tools > Options > User Interface > Editor > Language (pick Delphi from the dropdown ) > Code Insight and turn on ‘Generate LSP Config’, and close and reopen your project.
- For building and running: the project's `.dproj` next to its `.dpr`, and Windows PowerShell
  - `Delphi: Run current project` writes `.vscode/delphi/scripts/run.ps1` and builds the `.dproj` with MSBuild using the RAD Studio environment (`rsvars.bat`)

## Extension Settings

* `delphi.bin` Path to delphi `bin` folder (must contain `DelphiLSP.exe`). Defaults to newest installation.
* `delphi.configFile` File URI of current LSP config (`<delphiProjectName>.delphilsp.json`)
* `delphi.serverType` Defines the operation mode
* `delphi.agentCount` Defines the number of sub processes (agents) when serverType is controller. If agentCount > 1 then one process will be dedicated to Error Insight
* `delphi.logModes` Bit mask defining logging modes [1 (RawInputMessage), 2 (RawOutputMessage), 4 (Queue), 8 (Processor), 16 (Server), 32 (AgentFacade), 64 (DCC related), 128 (LSP Inspector traces)]


## Release Notes

Check out [CHANGELOG](./CHANGELOG.md).

## Some credits

- [delphi-vscode](https://github.com/Adventune/delphi-vscode)
  - This is an updated fork of the original extension built by @Adventune.
- [Pascal for VSCode](https://github.com/alefragnani/vscode-language-pascal/blob/master/snippets/pascal.json)
  - Copied syntax & snippets from here.
- [DelphiLSP for VSCode](https://marketplace.visualstudio.com/items?itemName=EmbarcaderoTechnologies.delphilsp)
  - "Reverse engineered" (opened the extension with 7-Zip) some of the code for handling the custom notifications that are needed to be sent to the LSP.

> [!NOTE]
> From the original author: This extension was only built to meet my own demand, and published on the off-chance that it might help someone else. There is now over 5K installations however, and I assume most needs are not met for Delphi development at the current state of the extension. Thus, **I encourage you to open a PR for any features you might miss**. I will happily review and add any improvements or features.