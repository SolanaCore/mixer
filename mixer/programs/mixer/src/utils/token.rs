use anchor_lang::prelude::*;
use anchor_lang::system_program::transfer;
use anchor_spl::token::{
        mint_to, Mint, MintTo, Token, TokenAccount,
        transfer as spl_transfer,
        Transfer as SplTransfer,
};

use anchor_lang::solana_program::{
    program::invoke_signed,
    system_instruction,
};

pub fn transfer_spl<'info>(
    from: AccountInfo<'info>,
    to: AccountInfo<'info>,
    signer: &[&[&[u8]]],
    amount: u64,
    authority: AccountInfo<'info>,
    token_program: AccountInfo<'info>,
) -> Result<()> {
    let cpi_ctx = CpiContext::new_with_signer(
        token_program,
        SplTransfer {
            from,
            to,
            authority
        },
        signer,
    );
    spl_transfer(cpi_ctx, amount)?;
    Ok(())
}


pub fn transfer_sol<'info>(
    from: AccountInfo<'info>,
    to: AccountInfo<'info>,
    signer_seeds: &[&[&[u8]]],
    amount: u64,
) -> Result<()> {
    let ix = system_instruction::transfer(&from.key(), &to.key(), amount);
    invoke_signed(&ix, &[from.clone(), to.clone()], signer_seeds)?;
    Ok(())
}