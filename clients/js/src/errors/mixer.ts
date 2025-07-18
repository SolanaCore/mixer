/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  isProgramError,
  type Address,
  type SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM,
  type SolanaError,
} from 'gill';
import { MIXER_PROGRAM_ADDRESS } from '../programs';

/** InvalidSecret: The secret provided doesn't match with the hash present in the commitment pda */
export const MIXER_ERROR__INVALID_SECRET = 0x1770; // 6000
/** InvalidWithdrawAmount: The amount provided to withdraw exceeds the balance of the sol_escrow account */
export const MIXER_ERROR__INVALID_WITHDRAW_AMOUNT = 0x1771; // 6001
/** InvalidHash: Invalid hash */
export const MIXER_ERROR__INVALID_HASH = 0x1772; // 6002
/** InvalidAmount: The depoist amount can't be zero */
export const MIXER_ERROR__INVALID_AMOUNT = 0x1773; // 6003

export type MixerError =
  | typeof MIXER_ERROR__INVALID_AMOUNT
  | typeof MIXER_ERROR__INVALID_HASH
  | typeof MIXER_ERROR__INVALID_SECRET
  | typeof MIXER_ERROR__INVALID_WITHDRAW_AMOUNT;

let mixerErrorMessages: Record<MixerError, string> | undefined;
if (process.env.NODE_ENV !== 'production') {
  mixerErrorMessages = {
    [MIXER_ERROR__INVALID_AMOUNT]: `The depoist amount can't be zero`,
    [MIXER_ERROR__INVALID_HASH]: `Invalid hash`,
    [MIXER_ERROR__INVALID_SECRET]: `The secret provided doesn't match with the hash present in the commitment pda`,
    [MIXER_ERROR__INVALID_WITHDRAW_AMOUNT]: `The amount provided to withdraw exceeds the balance of the sol_escrow account`,
  };
}

export function getMixerErrorMessage(code: MixerError): string {
  if (process.env.NODE_ENV !== 'production') {
    return (mixerErrorMessages as Record<MixerError, string>)[code];
  }

  return 'Error message not available in production bundles.';
}

export function isMixerError<TProgramErrorCode extends MixerError>(
  error: unknown,
  transactionMessage: {
    instructions: Record<number, { programAddress: Address }>;
  },
  code?: TProgramErrorCode
): error is SolanaError<typeof SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM> &
  Readonly<{ context: Readonly<{ code: TProgramErrorCode }> }> {
  return isProgramError<TProgramErrorCode>(
    error,
    transactionMessage,
    MIXER_PROGRAM_ADDRESS,
    code
  );
}
