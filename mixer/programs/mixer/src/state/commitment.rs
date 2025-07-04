use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace, PartialEq, Eq)]
pub struct Commitment {
    pub hash: [u8; 32],
    pub bump: u8,
}