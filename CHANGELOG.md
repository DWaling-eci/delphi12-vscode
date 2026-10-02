# Change Log

All notable changes to the "delphi" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Delphi 12 Athens support
- Workspace Trust declaration: the extension is disabled in untrusted workspaces

### Changed

- Updated to `vscode-languageclient` 10 and current build tooling; removed the unused `applicationinsights` dependency
- The run command now uses a single static `.vscode/delphi/scripts/run.ps1` with parameters; old `run.bat` and `<project>_run.ps1` files are no longer used and can be deleted

### Fixed

- Extension failed to activate when no RAD Studio installation was found; it now shows an error instead
- Installation detection skips version folders without `DelphiLSP.exe`
- `delphi.bin` setting was ignored
- Projects outside the `C:` drive could not be loaded
- Building `.dpk` and dotted project names (e.g. `My.App.dpr`) resolved the wrong `.dproj`/executable
- Leaked task listener on every run

### Security

- Project paths from `.delphilsp.json` are no longer interpolated into generated scripts, preventing command injection

## [1.0.1]

### Added

- LSP Support
- Syntax highlighting
- Code building and runnign
- Snippets