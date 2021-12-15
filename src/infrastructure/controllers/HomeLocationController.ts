import {left} from 'fp-ts/lib/Either';

export const UpdateHomeLocation = (params?: string[]) =>
  left('pending' + params?.join('-'));
