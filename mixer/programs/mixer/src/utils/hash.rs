use anchor_lang::solana_program::hash::{hash, Hash};

pub fn gen_hash(secret:&[u8]) -> [u8;32] {
    let result: Hash = hash(secret); // returns solana_program::hash::Hash
    result.to_bytes()
}