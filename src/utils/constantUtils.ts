import { existsSync } from 'fs';
import * as path from 'path';
import { Uri, window, workspace } from 'vscode';
import { getDefaultDelphiBinPath, LSP_BIN } from '../constants';

/**
 * Get the Delphi `bin` directory. Uses the delphi.bin setting when it contains DelphiLSP,
 * otherwise the newest installation.
 *
 * @returns bin directory, or undefined if no usable installation was found
 */
export function getDelphiBinDirectory(): string | undefined {
    let configured = workspace.getConfiguration('delphi').get<string>('bin')?.trim();
    if (configured) {
        if (configured.startsWith('file:')) {
            configured = Uri.parse(configured).fsPath;
        }
        if (existsSync(path.join(configured, LSP_BIN))) {
            return configured;
        }
        window.showWarningMessage(
            `Delphi: ${LSP_BIN} was not found in the configured "delphi.bin" folder "${configured}". Using the newest installation instead.`
        );
    }
    return getDefaultDelphiBinPath();
}
