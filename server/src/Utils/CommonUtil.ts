import { Response } from 'express';

export interface IResponse<PayloadType> {
    success: boolean;
    payload?: PayloadType;
    message: string;
}

export const success = <T>(payload?: T, message?: string): SuccessReturn<T> => {
    return {
        success: true,
        payload,
        message,
    };
};

export const failure = (message?: string, error?: unknown): FailReturn => {
    return {
        success: false,
        message,
        error,
    };
};

export const successResponse = <T>(
    res: Response,
    payload?: T,
    message?: string
): Response => {
    return res.status(200).json(success(payload, message));
};

export const failResponse = (res: Response, message?: string): Response => {
    return res.status(400).json(failure(message));
};

export interface SuccessReturn<T> {
    success: true;
    payload?: T;
    message?: string;
}

export interface FailReturn {
    success: false;
    payload?: unknown;
    message?: string;
    error?: unknown;
}
