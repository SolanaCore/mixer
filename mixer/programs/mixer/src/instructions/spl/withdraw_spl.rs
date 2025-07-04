use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{TokenAccount, Mint, Token};

use crate::constants::{sol_escrow_seeds, mixer_seed};
use crate::utils::transfer_spl;
use crate::state::Commitment;
use crate::error::SolanaCoreError;

#[derive(Accounts)]
pub struct WithdrawSpl<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = [mixer_seed.as_bytes(), token_mint.key().as_ref()],
        bump = commitment.bump,
    )]
    pub commitment: Box<Account<'info, Commitment>>,

    #[account(
        init_if_needed,
        payer = signer,
        token::mint = token_mint,
        token::authority = commitment,
    )]
    pub token_escrow: Account<'info, TokenAccount>,

    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = token_ata.mint == token_mint.key(),
    )]
    pub token_ata: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associate_token_program: Program<'info, AssociatedToken>,
}

impl<'info> WithdrawSpl<'info> {
    pub fn withdraw_spl(&mut self, hash: [u8; 32], amount: u64) -> Result<()> {
        // Validate hash
        require!(self.commitment.hash == hash, SolanaCoreError::InvalidHash);

        // Check if escrow has enough SPL tokens
        let escrow_balance = self.token_escrow.amount;
        require!(escrow_balance >= amount, SolanaCoreError::InvalidWithdrawAmount);

        // Derive signer seeds properly
        let token_mint_key = self.token_mint.key();
        let signer: &[&[u8]] = &[
            mixer_seed.as_bytes(),
            token_mint_key.as_ref(),
            &[self.commitment.bump],
        ];
        let signer_seeds: &[&[&[u8]]] = &[signer];

        // Transfer tokens
        transfer_spl(
            self.token_escrow.to_account_info(),
            self.token_ata.to_account_info(),
            signer_seeds,
            amount,
            self.signer.to_account_info(),
            self.token_program.to_account_info(),
        )
    }
}
