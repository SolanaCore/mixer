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

export const DEPOSIT_SPL_DISCRIMINATOR = new Uint8Array([
  224, 0, 198, 175, 198, 47, 105, 204,
]);

export function getDepositSplDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(DEPOSIT_SPL_DISCRIMINATOR);
}

export type DepositSplInstruction<
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
  TAccountAssociatedTokenProgram extends
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
        ? WritableAccount<TAccountTokenEscrow>
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
      TAccountAssociatedTokenProgram extends string
        ? ReadonlyAccount<TAccountAssociatedTokenProgram>
        : TAccountAssociatedTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type DepositSplInstructionData = {
  discriminator: ReadonlyUint8Array;
  hash: ReadonlyUint8Array;
  amount: bigint;
};

export type DepositSplInstructionDataArgs = {
  hash: ReadonlyUint8Array;
  amount: number | bigint;
};

export function getDepositSplInstructionDataEncoder(): Encoder<DepositSplInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['hash', fixEncoderSize(getBytesEncoder(), 32)],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: DEPOSIT_SPL_DISCRIMINATOR })
  );
}

export function getDepositSplInstructionDataDecoder(): Decoder<DepositSplInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['hash', fixDecoderSize(getBytesDecoder(), 32)],
    ['amount', getU64Decoder()],
  ]);
}

export function getDepositSplInstructionDataCodec(): Codec<
  DepositSplInstructionDataArgs,
  DepositSplInstructionData
> {
  return combineCodec(
    getDepositSplInstructionDataEncoder(),
    getDepositSplInstructionDataDecoder()
  );
}

export type DepositSplAsyncInput<
  TAccountSigner extends string = string,
  TAccountCommitment extends string = string,
  TAccountTokenEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountTokenAta extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
> = {
  signer: TransactionSigner<TAccountSigner>;
  commitment?: Address<TAccountCommitment>;
  tokenEscrow?: Address<TAccountTokenEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  tokenAta?: Address<TAccountTokenAta>;
  systemProgram?: Address<TAccountSystemProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
  associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>;
  hash: DepositSplInstructionDataArgs['hash'];
  amount: DepositSplInstructionDataArgs['amount'];
};

export async function getDepositSplInstructionAsync<
  TAccountSigner extends string,
  TAccountCommitment extends string,
  TAccountTokenEscrow extends string,
  TAccountTokenMint extends string,
  TAccountTokenAta extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TProgramAddress extends Address = typeof MIXER_PROGRAM_ADDRESS,
>(
  input: DepositSplAsyncInput<
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  DepositSplInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
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
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
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
        getBytesEncoder().encode(
          new Uint8Array([
            83, 111, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
            49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
            49, 49, 49, 49, 49, 49, 49, 49, 50,
          ])
        ),
      ],
    });
  }
  if (!accounts.tokenEscrow.value) {
    accounts.tokenEscrow.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([
            116, 111, 107, 101, 110, 45, 101, 115, 99, 114, 111, 119,
          ])
        ),
        getAddressEncoder().encode(expectAddress(accounts.commitment.value)),
      ],
    });
  }
  if (!accounts.tokenAta.value) {
    accounts.tokenAta.value = await getProgramDerivedAddress({
      programAddress:
        'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>,
      seeds: [
        getAddressEncoder().encode(expectAddress(accounts.signer.value)),
        getBytesEncoder().encode(
          new Uint8Array([
            6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235,
            121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133,
            126, 255, 0, 169,
          ])
        ),
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
  if (!accounts.associatedTokenProgram.value) {
    accounts.associatedTokenProgram.value =
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
      getAccountMeta(accounts.associatedTokenProgram),
    ],
    programAddress,
    data: getDepositSplInstructionDataEncoder().encode(
      args as DepositSplInstructionDataArgs
    ),
  } as DepositSplInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
  >;

  return instruction;
}

export type DepositSplInput<
  TAccountSigner extends string = string,
  TAccountCommitment extends string = string,
  TAccountTokenEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountTokenAta extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
> = {
  signer: TransactionSigner<TAccountSigner>;
  commitment: Address<TAccountCommitment>;
  tokenEscrow: Address<TAccountTokenEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  tokenAta: Address<TAccountTokenAta>;
  systemProgram?: Address<TAccountSystemProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
  associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>;
  hash: DepositSplInstructionDataArgs['hash'];
  amount: DepositSplInstructionDataArgs['amount'];
};

export function getDepositSplInstruction<
  TAccountSigner extends string,
  TAccountCommitment extends string,
  TAccountTokenEscrow extends string,
  TAccountTokenMint extends string,
  TAccountTokenAta extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TProgramAddress extends Address = typeof MIXER_PROGRAM_ADDRESS,
>(
  input: DepositSplInput<
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): DepositSplInstruction<
  TProgramAddress,
  TAccountSigner,
  TAccountCommitment,
  TAccountTokenEscrow,
  TAccountTokenMint,
  TAccountTokenAta,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountAssociatedTokenProgram
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
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
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
  if (!accounts.associatedTokenProgram.value) {
    accounts.associatedTokenProgram.value =
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
      getAccountMeta(accounts.associatedTokenProgram),
    ],
    programAddress,
    data: getDepositSplInstructionDataEncoder().encode(
      args as DepositSplInstructionDataArgs
    ),
  } as DepositSplInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountCommitment,
    TAccountTokenEscrow,
    TAccountTokenMint,
    TAccountTokenAta,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
  >;

  return instruction;
}

export type ParsedDepositSplInstruction<
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
    associatedTokenProgram: TAccountMetas[7];
  };
  data: DepositSplInstructionData;
};

export function parseDepositSplInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDepositSplInstruction<TProgram, TAccountMetas> {
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
      associatedTokenProgram: getNextAccount(),
    },
    data: getDepositSplInstructionDataDecoder().decode(instruction.data),
  };
}
