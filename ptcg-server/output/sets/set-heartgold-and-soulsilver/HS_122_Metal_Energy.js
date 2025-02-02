"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalEnergy = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
class MetalEnergy extends energy_card_1.EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [card_types_1.CardType.METAL];
        this.set = 'HS';
        this.regulationMark = 'ENERGY';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '122';
        this.name = 'Metal Energy';
        this.fullName = 'Metal Energy HS';
    }
}
exports.MetalEnergy = MetalEnergy;
