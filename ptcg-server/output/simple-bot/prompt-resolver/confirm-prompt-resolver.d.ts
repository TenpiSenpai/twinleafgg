import { Player, State, Action, Prompt } from '../../game';
import { PromptResolver } from './prompt-resolver';
export declare class ConfirmPromptResolver extends PromptResolver {
    resolvePrompt(state: State, player: Player, prompt: Prompt<any>): Action | undefined;
}
