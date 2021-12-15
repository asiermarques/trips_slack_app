import {User} from '../domain/User';
import {Country} from '../domain/Country';
import {right, Either} from 'fp-ts/lib/Either';

export default (
  user: User,
  cityName: string,
  country: Country
): Either<Error, User> =>
  right({
    id: user.id,
    username: user.username,
    homeLocation: {
      cityName: cityName,
      country: country,
    },
  });
