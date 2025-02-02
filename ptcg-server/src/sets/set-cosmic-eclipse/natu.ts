import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, GameMessage, GameError, CardList, OrderCardsPrompt, SelectPrompt } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

export class Natu extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = CardType.PSYCHIC;
  public hp: number = 60;
  public weakness = [{ type: CardType.LIGHTNING }];
  public resistance = [{ type: CardType.FIGHTING, value: -20 }];
  public retreat = [CardType.COLORLESS];

  public attacks = [{
    name: 'Future Sight',
    cost: [CardType.PSYCHIC],
    damage: 0,
    text: 'Look at the top 4 cards of either player\'s deck and put them back in any order.'
  }];

  public set: string = 'CEC';
  public name: string = 'Natu';
  public fullName: string = 'Natu CEC';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '78';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      const options: { message: GameMessage, action: () => void }[] = [
        {
          message: GameMessage.ORDER_YOUR_DECK,
          action: () => {

            if (player.deck.cards.length === 0) {
              throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
            }

            const deckTop = new CardList();
            player.deck.moveTo(deckTop, 4);

            return store.prompt(state, new OrderCardsPrompt(
              player.id,
              GameMessage.CHOOSE_CARDS_ORDER,
              deckTop,
              { allowCancel: false },
            ), order => {
              if (order === null) {
                return state;
              }

              deckTop.applyOrder(order);
              deckTop.moveToTopOfDestination(player.deck);

            });

          }
        },
        {
          message: GameMessage.ORDER_OPPONENT_DECK,
          action: () => {
            if (opponent.deck.cards.length === 0) {
              throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
            }

            const deckTop = new CardList();
            opponent.deck.moveTo(deckTop, 4);

            return store.prompt(state, new OrderCardsPrompt(
              player.id,
              GameMessage.CHOOSE_CARDS_ORDER,
              deckTop,
              { allowCancel: false },
            ), order => {
              if (order === null) {
                return state;
              }

              deckTop.applyOrder(order);
              deckTop.moveToTopOfDestination(opponent.deck);

            });

          }
        }
      ];

      return store.prompt(state, new SelectPrompt(
        player.id,
        GameMessage.CHOOSE_OPTION,
        options.map(opt => opt.message),
        { allowCancel: false }
      ), choice => {
        const option = options[choice];
        option.action();
      });
    }

    return state;
  }
}