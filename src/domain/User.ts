import {HomeLocation} from './HomeLocation';

export type User = {
  readonly id: string;
  readonly username: string;
  readonly homeLocation?: HomeLocation;
};
