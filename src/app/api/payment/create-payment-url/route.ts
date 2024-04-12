import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment';
import config from '@/configs/vnpay.json';
import * as crypto from 'crypto';
export async function POST(request: NextRequest, res: NextResponse) {
    try {
        const req = await request.json();

        const createdAt = moment(Date.now()).format('YYYYMMDDHHmmss');
        const ipAdd = request.headers.get('x-forwarded-for') || '127.0.0.1';
        let tmnCode = config['vnp_TmnCode'];
        let secretKey = config['vnp_HashSecret'];
        let vnpUrl = config['vnp_Url'];
        let returnUrl = config['vnp_ReturnUrl'];
        let orderId = req.orderId;
        let amount = req.amount;
        //  let bankCode = req.bankCode;

        let locale = req.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }

        let currCode = 'VND';
        let vnp_Params = {} as any;
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAdd;
        vnp_Params['vnp_CreateDate'] = createdAt;

        // if (bankCode !== null && bankCode !== '') {
        //     vnp_Params['vnp_BankCode'] = bankCode;
        // } else {
        //     vnp_Params['vnp_BankCode'] = 'NCB';
        // }

        vnp_Params = vnp_Params.keys.sort().reduce((acc: any, key: string) => {
            acc[key] = vnp_Params[key];
            return acc;
        }, {});

        const queryString = new URLSearchParams(vnp_Params).toString();
        const signed = crypto
            .createHmac('SHA256', secretKey)
            .update(queryString)
            .digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + queryString;

        return NextResponse.json({
            isSuccess: true,
            data: vnpUrl,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isSuccess: false,
            message: error,
            data: undefined,
        });
    }
}
