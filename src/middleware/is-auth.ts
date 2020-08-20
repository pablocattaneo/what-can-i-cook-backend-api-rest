import { Response, NextFunction } from 'express';

/* eslint-disable no-useless-escape */
import  * as jwt from'jsonwebtoken';

export function IsAuth(req: any, res: Response, next: NextFunction): void {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new Error('Not authenticated.');
  }
  const token = authHeader.split(' ')[1];
  try {
    const validToken: any = jwt.verify(token, "P2bQM9L2r4b$}3<X)_cU_+F7-:}'Y-]e(gPH::?^*YW,x5<3*Zrfy=zZ^.K!aJ,6!S&UJ;fTCmnz}.>\,^mtK8d{jw8a88z`yARW@b78K8+TxNg6{Eg?wPXZ3%:fjZY3;V[dX#Y7t\K9]sXXXud+mFjqtM#[q\(UL#.c-L@M99wfJ2RsaSj\Q7x/Gwnmnk+c6-Jb.n-&:J'jzS:fGDa*e6aw;W(u$!R6~cbed}tWw7.[g]yTzx@56Hhz}2{L`6%;");
    req.userId = validToken.userId;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
  next();
}
