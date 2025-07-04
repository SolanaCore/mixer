use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{TokenAccount, Mint, Token};
use crate::utils::{transfer_spl};
use crate::constants::{mixer_seed, sol_escrow_seeds, ANCHOR_DISCRIMINATOR_SIZE, WRAPPED_SOL_MINT};
use crate::error::SolanaCoreError;
 use crate::state::Commitment;

#[derive(Accounts)]
pub struct DepositSpl<'info> {
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
        init_if_needed,
        payer = signer,
        seeds = [b"token-escrow", commitment.key().as_ref()],
        bump,
        token::mint = token_mint,
        token::authority = commitment
    )]
    pub token_escrow: Account<'info, TokenAccount>,

    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = token_mint,
        associated_token::authority = signer,
    )]
    pub token_ata: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}


impl<'info> DepositSpl<'info> {
    pub fn deposit_spl(&mut self, hash:[u8;32], amount: u64, bump:u8) -> Result<()>{
        self.commitment.hash = hash;
        self.commitment.bump = bump;
        // self.commitment.used = false;
        assert!(amount > 0 , "{}" , SolanaCoreError::InvalidAmount);
        /*
        from: AccountInfo<'info>,
        to: AccountInfo<'info>,
        signer: &[&[&[u8]]],
        amount: u64,
        token_program: AccountInfo<'info>,
        */
transfer_spl(self.token_ata.to_account_info(), self.token_escrow.to_account_info(), &[], amount,self.signer.to_account_info(), self.token_program.to_account_info())
    }
}

