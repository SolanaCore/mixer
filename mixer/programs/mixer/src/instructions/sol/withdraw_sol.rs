use anchor_lang::prelude::*;
use crate::utils::{gen_hash, transfer_sol};
#[allow(unused_imports)]
use crate::constants::{mixer_seed, sol_escrow_seeds, WRAPPED_SOL_MINT};
use crate::error::SolanaCoreError;
use crate::state::Commitment;

#[derive(Accounts)]
pub struct WithdrawSol<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = [mixer_seed.as_bytes(), WRAPPED_SOL_MINT.as_ref()],
        bump = commitment.bump,
    )]
    pub commitment: Box<Account<'info, Commitment>>,

    #[account(
        mut,
        seeds = [sol_escrow_seeds.as_bytes(), commitment.key().as_ref()],
        bump,
    )]
    pub sol_escrow: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> WithdrawSol<'info> {
    pub fn withdraw_sol(&mut self, hash: [u8; 32], amount: u64) -> Result<()> {
        // Validate commitment hash
        require!(self.commitment.hash == hash, SolanaCoreError::InvalidHash);

        // Check lamport balance
        let sol_balance = **self.sol_escrow.to_account_info().lamports.borrow();
        require!(sol_balance >= amount, SolanaCoreError::InvalidWithdrawAmount);

        // Construct signer seeds
        let signer: &[&[u8]] = &[
            mixer_seed.as_bytes(),
            WRAPPED_SOL_MINT.as_ref(),
            &[self.commitment.bump],
        ];
        let signer_seeds: &[&[&[u8]]] = &[signer];

        // Perform the transfer
        transfer_sol(
            self.sol_escrow.to_account_info(),
            self.signer.to_account_info(),
            signer_seeds,
            amount,
        )
    }
}
