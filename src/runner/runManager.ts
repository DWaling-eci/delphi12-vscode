import { loadConfigFileJson } from '../client/configFile';
import { ProcessExecution, Task, tasks, TaskScope, window } from 'vscode';
import { getDelphiBinDirectory } from '../utils/constantUtils';
import { getRunScriptUri, initRunScript, resolveProjectPaths } from './scripts';

export class RunManager {
    /**
     * Runs the current project if config file has been set.
     *
     * @returns undefined
     */
    public async run() {
        const scriptUri = getRunScriptUri();
        if (!scriptUri) {
            window.showWarningMessage('Delphi: Open a folder to run a project');
            return;
        }
        const json = await loadConfigFileJson();
        if (json === false) {
            window.showWarningMessage('Delphi: No config file have been set');
            return;
        }
        const binDir = getDelphiBinDirectory();
        if (!binDir) {
            window.showErrorMessage('Delphi: No Delphi installation found to build the project');
            return;
        }
        if (!(await initRunScript())) return; // Always run the current script version

        const { projectDir, dproj, exePath } = resolveProjectPaths(json.settings);
        // Values are passed as separate arguments (no shell) so paths can't inject commands.
        const compileProcess = new ProcessExecution(
            'powershell.exe',
            [
                '-NoProfile',
                '-ExecutionPolicy',
                'Bypass',
                '-File',
                scriptUri.fsPath,
                '-BinDir',
                binDir,
                '-Project',
                dproj,
                '-ExePath',
                exePath,
                '-Run',
            ],
            {
                cwd: projectDir,
            }
        );

        const task = new Task(
            {
                type: 'Run',
            },
            TaskScope.Workspace,
            'Delphi: Run',
            'Delphi',
            compileProcess
        );

        const execution = await tasks.executeTask(task);

        const listener = tasks.onDidEndTaskProcess((e) => {
            if (e.execution === execution) {
                listener.dispose();
                if (e.exitCode === 0) {
                    window.showInformationMessage('Delphi: Exited successfully!');
                } else {
                    window.showErrorMessage('Delphi: Error running!');
                }
            }
        });
    }
}
