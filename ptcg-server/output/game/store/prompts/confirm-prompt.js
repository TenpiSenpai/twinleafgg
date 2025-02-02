"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPrompt = void 0;
const prompt_1 = require("./prompt");
class ConfirmPrompt extends prompt_1.Prompt {
    constructor(playerId, message) {
        super(playerId);
        this.message = message;
        this.type = 'Confirm';
    }
}
exports.ConfirmPrompt = ConfirmPrompt;
