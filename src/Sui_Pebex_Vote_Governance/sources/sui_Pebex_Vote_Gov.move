address 0x0 {
    module Sui_Pebex_Vote_Governance {
        use std::string::{Self, String};
        use std::vector;
        use sui::object::{Self, UID};
        use sui::transfer;
        use sui::tx_context::{Self, TxContext};

        struct pauta has key {
            id: UID,
            text: String,
        }

        public fun criar_pauta(text: String, ctx: &mut TxContext): pauta {
            pauta {
                id: object::new(ctx),
                text,
            }
        }

        public fun enviar_pauta(dest: address, p: pauta) {
            transfer::transfer(p, dest);
        }

        public fun enviar_pauta_para_lista(destinos: vector<address>, text: String, ctx: &mut TxContext) {
            let tamanho = vector::length(&destinos);
            let mut i = 0;
            while (i < tamanho) {
                let dest = *vector::borrow(&destinos, i);
                let p = criar_pauta(text.clone(), ctx);
                enviar_pauta(dest, p);
                i = i + 1;
            }
        }
    }
}