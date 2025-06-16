#![cfg(feature = "test-sbf")]

use {
    anchor_lang::{solana_program::instruction::Instruction, InstructionData, ToAccountMetas},
    mollusk_svm::{result::Check, Mollusk},
};

#[test]
fn test_initialize() {
    let program_id = mixer::id();

    let mollusk = Mollusk::new(&program_id, "mixer");

    let instruction = Instruction::new_with_bytes(
        program_id,
        &mixer::instruction::Initialize {}.data(),
        mixer::accounts::Initialize {}.to_account_metas(None),
    );

    mollusk.process_and_validate_instruction(&instruction, &[], &[Check::success()]);
}
