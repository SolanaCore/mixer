/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from 'gill';
import { MIXER_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export const WITHDRAW_SPL_DISCRIMINATOR = new Uint8Array([
  181, 154, 94, 86, 62, 115, 6, 186,
]);

export function getWithdrawSplDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    WITHDRAW_SPL_DISCRIMINATOR
  );
}

export type WithdrawSplInstruction<
  TProgram extends string = typeof MIXER_PROGRAM_ADDRESS,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountCommitment extends string | IAccountMeta<string> = string,
  TAccountTokenEscrow extends string | IAccountMeta<string> = string,
  TAccountTokenMint extends string | IAccountMeta<string> = string,
  TAccountTokenAta extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountAssociateTokenProgram extends
    | string
    | IAccountMeta<string> = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner> &
            IAccountSignerMeta<TAccountSigner>
        : TAccountSigner,
      TAccountCommitment extends string
        ? WritableAccount<TAccountCommitment>
        : TAccountCommitment,
      TAccountTokenEscrow extends string
        ? WritableSignerAccount<TAccountTokenEscrow> &
            IAccountSignerMeta<TAccountTokenEscrow>
        : TAccountTokenEscrow,
      TAccountTokenMint extends string
        ? ReadonlyAccount<TAccountTokenMint>
        : TAccountTokenMint,
      TAccountTokenAta extends string
        ? WritableAccount<TAccountTokenAta>
        : TAccountTokenAta,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountAssociateTokenProgram extends string
        ? ReadonlyAccount<TAccountAssociateTokenProgram>
        : TAccountAssociateTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type WithdrawSplInstructionData = {
  discriminator: ReadonlyUint8Array;
  hash: ReadonlyUint8Array;
  amount: bigint;
};

export type WithdrawSplInstructionDataArgs = {
  hash: ReadonlyUint8Array;
  amount: number | bigint;
};

export function getWithdrawSplInstructionDataEncoder(): Encoder<WithdrawSplInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['hash', fixEncoderSize(getBytesEncoder(), 32)],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: WITHDRAW_SPL_DISCRIMINATOR })
  );
}

export function getWithdrawSplInstructionDataDecoder(): Decoder<WithdrawSplInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['hash', fixDecoderSize(getBytesDecoder(), 32)],
    ['amount', getU64Decoder()],
  ]);
}

export function getWithdrawSplInstructionDataCodec(): Codec<
  WithdrawSplInstructionDataArgs,
  WithdrawSplInstructionData
> {
  return combineCodec(
    getWithdrawSplInstructionDataEncoder(),
    getWithdrawSplInstructionDataDecoder()
  );
}

export type WithdrawSplAsyncInput<
  TAccountSigner extends string = string,
  TAccountCommitment extends string = string,
  TAccountTokenEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountTokenAta extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAssociateTokenProgram extends string = string,
> = {
  signer: TransactionSigner<TAccountSigner>;
  commitment?: Address<TAccountCommitment>;
  tokenEscrow: TransactionSigner<TAccountTokenEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  tokenAta: Address<TAccountTokenAta>;
  systemProgram?: Address<TAccountSystemProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
  associateTokenProgram?: Address<TAccountAssociateTokenProgram>;
  hash: WithdrawSplInstructionDataArgs['hash'];
  amount: WithdrawSplInstructionDataArgs['amount'];
};

export async function getWithdrawSplInstructionAsync<
  TAccountSigner extends string,
  TAccountCommitment extends string,
  TAccountTokenEscrow extends string,
  TAccountTokenMint extends string,
  TAccountTokenAta extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAssociateTokenProgram extends string,
  TProgramAddress extends Address = typeof MIXER_PROGRAM_ADDRESS,
>(
  input: WithdrawSplAsyncInput<
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociateTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  WithdrawSplInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociateTokenProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? MIXER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    signer: { value: input.signer ?? null, isWritable: true },
    commitment: { value: input.commitment ?? null, isWritable: true },
    tokenEscrow: { value: input.tokenEscrow ?? null, isWritable: true },
    tokenMint: { value: input.tokenMint ?? null, isWritable: false },
    tokenAta: { value: input.tokenAta ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    associateTokenProgram: {
      value: input.associateTokenProgram ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.commitment.value) {
    accounts.commitment.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(new Uint8Array([109, 105, 120, 101, 114])),
        getAddressEncoder().encode(expectAddress(accounts.tokenMint.value)),
      ],
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.associateTokenProgram.value) {
    accounts.associateTokenProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.commitment),
      getAccountMeta(accounts.tokenEscrow),
      getAccountMeta(accounts.tokenMint),
      getAccountMeta(accounts.tokenAta),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.associateTokenProgram),
    ],
    programAddress,
    data: getWithdrawSplInstructionDataEncoder().encode(
      args as WithdrawSplInstructionDataArgs
    ),
  } as WithdrawSplInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociateTokenProgram
  >;

  return instruction;
}

export type WithdrawSplInput<
  TAccountSigner extends string = string,
  TAccountCommitment extends string = string,
  TAccountTokenEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountTokenAta extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAssociateTokenProgram extends string = string,
> = {
  signer: TransactionSigner<TAccountSigner>;
  commitment: Address<TAccountCommitment>;
  tokenEscrow: TransactionSigner<TAccountTokenEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  tokenAta: Address<TAccountTokenAta>;
  systemProgram?: Address<TAccountSystemProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
  associateTokenProgram?: Address<TAccountAssociateTokenProgram>;
  hash: WithdrawSplInstructionDataArgs['hash'];
  amount: WithdrawSplInstructionDataArgs['amount'];
};

export function getWithdrawSplInstruction<
  TAccountSigner extends string,
  TAccountCommitment extends string,
  TAccountTokenEscrow extends string,
  TAccountTokenMint extends string,
  TAccountTokenAta extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAssociateTokenProgram extends string,
  TProgramAddress extends Address = typeof MIXER_PROGRAM_ADDRESS,
>(
  input: WithdrawSplInput<
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociateTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): WithdrawSplInstruction<
  TProgramAddress,
  TAccountSigner,
  TAccountCommitment,
  TAccountTokenEscrow,
  TAccountTokenMint,
  TAccountTokenAta,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountAssociateTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? MIXER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    signer: { value: input.signer ?? null, isWritable: true },
    commitment: { value: input.commitment ?? null, isWritable: true },
    tokenEscrow: { value: input.tokenEscrow ?? null, isWritable: true },
    tokenMint: { value: input.tokenMint ?? null, isWritable: false },
    tokenAta: { value: input.tokenAta ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    associateTokenProgram: {
      value: input.associateTokenProgram ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.associateTokenProgram.value) {
    accounts.associateTokenProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.commitment),
      getAccountMeta(accounts.tokenEscrow),
      getAccountMeta(accounts.tokenMint),
      getAccountMeta(accounts.tokenAta),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.associateTokenProgram),
    ],
    programAddress,
    data: getWithdrawSplInstructionDataEncoder().encode(
      args as WithdrawSplInstructionDataArgs
    ),
  } as WithdrawSplInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociateTokenProgram
  >;

  return instruction;
}

export type ParsedWithdrawSplInstruction<
  TProgram extends string = typeof MIXER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    signer: TAccountMetas[0];
    commitment: TAccountMetas[1];
    tokenEscrow: TAccountMetas[2];
    tokenMint: TAccountMetas[3];
    tokenAta: TAccountMetas[4];
    systemProgram: TAccountMetas[5];
    tokenProgram: TAccountMetas[6];
    associateTokenProgram: TAccountMetas[7];
  };
  data: WithdrawSplInstructionData;
};

export function parseWithdrawSplInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedWithdrawSplInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      signer: getNextAccount(),
      commitment: getNextAccount(),
      tokenEscrow: getNextAccount(),
      tokenMint: getNextAccount(),
      tokenAta: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      associateTokenProgram: getNextAccount(),
    },
    data: getWithdrawSplInstructionDataDecoder().decode(instruction.data),
  };
}
