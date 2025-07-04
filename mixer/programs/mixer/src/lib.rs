pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;
pub mod utils;
use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("Aijc1oXBzSRJKWRYrtj6e8osBASNDkkgREziGGWYvK9p");

#[program]
pub mod mixer {
    use super::*;

    pub fn deposit_sol( ctx: Context<DepositSol>, hash: [u8; 32], amount: u64) -> Result<()> {
        let bump: u8 = ctx.bumps.commitment;
        &mut ctx.accounts.deposit_sol(hash, amount, bump);
        Ok(())
    }

    pub fn withdraw_sol( ctx: Context<WithdrawSol>, hash: [u8; 32], amount: u64) -> Result<()> {
        &mut ctx.accounts.withdraw_sol(hash, amount);
        Ok(())
    }

    pub fn deposit_spl( ctx: Context<DepositSpl>, hash: [u8; 32], amount: u64) -> Result<()> {
        let bump: u8 = ctx.bumps.commitment;
        &mut ctx.accounts.deposit_spl(hash, amount, bump);
        Ok(())
    }

    pub fn withdraw_spl( ctx: Context<WithdrawSpl>, hash: [u8; 32], amount: u64) -> Result<()> {
        &mut ctx.accounts.withdraw_spl(hash, amount);
        Ok(())
    }
}
