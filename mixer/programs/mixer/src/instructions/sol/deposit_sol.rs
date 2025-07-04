use anchor_lang::prelude::*;
use crate::utils::{gen_hash, transfer_sol};
use crate::constants::{mixer_seed, sol_escrow_seeds, WRAPPED_SOL_MINT, ANCHOR_DISCRIMINATOR_SIZE};
use crate::error::SolanaCoreError;
use crate::state::Commitment;

#[derive(Accounts)]
pub struct DepositSol<'info>{
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init_if_needed, 
        payer = signer,
        space = Commitment::INIT_SPACE + ANCHOR_DISCRIMINATOR_SIZE,
        seeds = [mixer_seed.as_bytes(), WRAPPED_SOL_MINT.as_bytes()],
        bump,
    )]
    pub commitment: Box<Account<'info, Commitment>>,

    #[account(
        seeds = [sol_escrow_seeds.as_bytes(), commitment.key().as_ref()],
        bump,
    )]
    pub sol_escrow: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> DepositSol<'info> {
    pub fn deposit_sol(&mut self, hash:[u8;32], amount:u64, bump:u8) -> Result<()>{
        self.commitment.hash = hash;
        self.commitment.bump = bump;
        // self.commitment.used = false;

        assert!(amount > 0 , "{}" , SolanaCoreError::InvalidAmount);

        /*
        from: AccountInfo<'info>,
        to: AccountInfo<'info>,
        signer: &[&[&[u8]]],
        amount: u64,
        */
    transfer_sol(self.signer.to_account_info(), self.sol_escrow.to_account_info(), &[], amount)
    }
}

