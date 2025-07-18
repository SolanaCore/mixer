/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  containsBytes,
  fixEncoderSize,
  getBytesEncoder,
  type Address,
  type ReadonlyUint8Array,
} from 'gill';
import {
  type ParsedDepositSolInstruction,
  type ParsedDepositSplInstruction,
  type ParsedWithdrawSolInstruction,
  type ParsedWithdrawSplInstruction,
} from '../instructions';

export const MIXER_PROGRAM_ADDRESS =
  'Aijc1oXBzSRJKWRYrtj6e8osBASNDkkgREziGGWYvK9p' as Address<'Aijc1oXBzSRJKWRYrtj6e8osBASNDkkgREziGGWYvK9p'>;

export enum MixerAccount {
  Commitment,
}

export function identifyMixerAccount(
  account: { data: ReadonlyUint8Array } | ReadonlyUint8Array
): MixerAccount {
  const data = 'data' in account ? account.data : account;
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([61, 112, 129, 128, 24, 147, 77, 87])
      ),
      0
    )
  ) {
    return MixerAccount.Commitment;
  }
  throw new Error(
    'The provided account could not be identified as a mixer account.'
  );
}

export enum MixerInstruction {
  DepositSol,
  DepositSpl,
  WithdrawSol,
  WithdrawSpl,
}

export function identifyMixerInstruction(
  instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array
): MixerInstruction {
  const data = 'data' in instruction ? instruction.data : instruction;
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([108, 81, 78, 117, 125, 155, 56, 200])
      ),
      0
    )
  ) {
    return MixerInstruction.DepositSol;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([224, 0, 198, 175, 198, 47, 105, 204])
      ),
      0
    )
  ) {
    return MixerInstruction.DepositSpl;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([145, 131, 74, 136, 65, 137, 42, 38])
      ),
      0
    )
  ) {
    return MixerInstruction.WithdrawSol;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([181, 154, 94, 86, 62, 115, 6, 186])
      ),
      0
    )
  ) {
    return MixerInstruction.WithdrawSpl;
  }
  throw new Error(
    'The provided instruction could not be identified as a mixer instruction.'
  );
}

export type ParsedMixerInstruction<
  TProgram extends string = 'Aijc1oXBzSRJKWRYrtj6e8osBASNDkkgREziGGWYvK9p',
> =
  | ({
      instructionType: MixerInstruction.DepositSol;
    } & ParsedDepositSolInstruction<TProgram>)
  | ({
      instructionType: MixerInstruction.DepositSpl;
    } & ParsedDepositSplInstruction<TProgram>)
  | ({
      instructionType: MixerInstruction.WithdrawSol;
    } & ParsedWithdrawSolInstruction<TProgram>)
  | ({
      instructionType: MixerInstruction.WithdrawSpl;
    } & ParsedWithdrawSplInstruction<TProgram>);
