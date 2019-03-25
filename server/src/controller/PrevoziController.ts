import {NextFunction, Request, Response} from 'express';
const CNTR = "PrevoziController";

module.exports.void = function (req: Request, res: Response, next: NextFunction) {
    serverConsoleLog(req.baseUrl);
};

function serverConsoleLog (msg: String) {
  console.log(this.CNTR + ": msg");
};