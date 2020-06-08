// import { mockauth } from '../_mocks_/firebase.mock.js';

import { logIn } from '../src/model/firebase.js';

describe('logIn', () => {
  it('debería poder iniciar sesion', () => logIn('acuario@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('acuario@gmail.com');
    }));
});
