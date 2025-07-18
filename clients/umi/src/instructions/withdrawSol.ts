/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bytes,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type WithdrawSolInstructionAccounts = {
  signer: Signer;
  commitment?: PublicKey | Pda;
  solEscrow?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type WithdrawSolInstructionData = {
  discriminator: Uint8Array;
  hash: Array<number>;
  amount: bigint;
};

export type WithdrawSolInstructionDataArgs = {
  hash: Array<number>;
  amount: number | bigint;
};

export function getWithdrawSolInstructionDataSerializer(): Serializer<
  WithdrawSolInstructionDataArgs,
  WithdrawSolInstructionData
> {
  return mapSerializer<
    WithdrawSolInstructionDataArgs,
    any,
    WithdrawSolInstructionData
  >(
    struct<WithdrawSolInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['hash', array(u8(), { size: 32 })],
        ['amount', u64()],
      ],
      { description: 'WithdrawSolInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([145, 131, 74, 136, 65, 137, 42, 38]),
    })
  ) as Serializer<WithdrawSolInstructionDataArgs, WithdrawSolInstructionData>;
}

// Args.
export type WithdrawSolInstructionArgs = WithdrawSolInstructionDataArgs;

// Instruction.
export function withdrawSol(
  context: Pick<Context, 'eddsa' | 'programs'>,
  input: WithdrawSolInstructionAccounts & WithdrawSolInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mixer',
    'Aijc1oXBzSRJKWRYrtj6e8osBASNDkkgREziGGWYvK9p'
  );

  // Accounts.
  const resolvedAccounts = {
    signer: {
      index: 0,
      isWritable: true as boolean,
      value: input.signer ?? null,
    },
    commitment: {
      index: 1,
      isWritable: true as boolean,
      value: input.commitment ?? null,
    },
    solEscrow: {
      index: 2,
      isWritable: true as boolean,
      value: input.solEscrow ?? null,
    },
    systemProgram: {
      index: 3,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: WithdrawSolInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.commitment.value) {
    resolvedAccounts.commitment.value = context.eddsa.findPda(programId, [
      bytes().serialize(new Uint8Array([109, 105, 120, 101, 114])),
      bytes().serialize(
        new Uint8Array([
          83, 111, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
          49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
          49, 49, 49, 49, 49, 49, 49, 49, 50,
        ])
      ),
    ]);
  }
  if (!resolvedAccounts.solEscrow.value) {
    resolvedAccounts.solEscrow.value = context.eddsa.findPda(programId, [
      bytes().serialize(
        new Uint8Array([115, 111, 108, 95, 101, 115, 99, 114, 111, 119])
      ),
      publicKeySerializer().serialize(
        expectPublicKey(resolvedAccounts.commitment.value)
      ),
    ]);
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'systemProgram',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getWithdrawSolInstructionDataSerializer().serialize(
    resolvedArgs as WithdrawSolInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
