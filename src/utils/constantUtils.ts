import { existsSync } from 'fs';
import * as path from 'path';
import { window, workspace } from 'vscode';
import { getDefaultDelphiBinPath, LSP_BIN } from '../constants';
import { toFsPath } from './fileUtils';

/**
 * Get the Delphi `bin` directory. Uses the delphi.bin setting when it contains DelphiLSP,
 * otherwise the newest installation.
 *
 * @returns bin directory, or undefined if no usable installation was found
 */
export function getDelphiBinDirectory(): string | undefined {
    const setting = workspace.getConfiguration('delphi').get<string>('bin')?.trim();
    if (setting) {
        const configured = toFsPath(setting);
        if (existsSync(path.join(configured, LSP_BIN))) {
            return configured;
        }
        window.showWarningMessage(
            `Delphi: ${LSP_BIN} was not found in the configured "delphi.bin" folder "${configured}". Using the newest installation instead.`
        );
    }
    return getDefaultDelphiBinPath();
}
