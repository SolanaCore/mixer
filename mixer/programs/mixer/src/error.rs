use anchor_lang::prelude::*;

#[error_code]
pub enum SolanaCoreError {
    #[msg("The secret provided doesn't match with the hash present in the commitment pda")]
    InvalidSecret,
    #[msg("The amount provided to withdraw exceeds the balance of the sol_escrow account")]
    InvalidWithdrawAmount,
    #[msg("Invalid hash")]
    InvalidHash,
    #[msg("The depoist amount can't be zero")]
    InvalidAmount,
}