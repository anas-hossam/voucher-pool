import { BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validateEmail } from '../helpers/utils';

export const validateCustomer = () =>
(req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body && (!req.body.name || typeof req.body.name !== 'string')) {
            throw new BadRequestException('name is missing/not string');
        }

        if (req.body && (!req.body.email || validateEmail(req.body.email) === null)) {
            throw new BadRequestException('email is missing/not valid email');
        }

        next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export const validateVoucher = () =>
(req: Request, res: Response, next: NextFunction) => {
    try {
        if (
            req.body &&
            (!req.body.code || typeof req.body.code !== 'string' || req.body.code.length < 8)
        ) {
            throw new BadRequestException('code is missing/not string/code length is less than 8 chars');
        }

        if (req.body && (!req.body.expirationDate || isNaN(Date.parse(req.body.expirationDate)))) {
            throw new BadRequestException('expirationDate is missing/not valid date');
        }

        next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
