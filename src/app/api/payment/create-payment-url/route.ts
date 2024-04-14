import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment';
import config from '@/configs/vnpay.json';
import * as crypto from 'crypto';
import querystring from 'query-string';

export async function POST(request: NextRequest, res: NextResponse) {
    try {
        const { data } = await request.json();

        let date = new Date();
        const createdAt = moment(date).format('YYYYMMDDHHmmss');
        const ipAdd = request.headers.get('x-forwarded-for') || '::1';
        let vnp_TmnCode = config['vnp_TmnCode'];
        let vnp_HashSecret = config['vnp_HashSecret'];
        let vnp_Url = config['vnp_Url'];
        let vnp_ReturnUrl = config['vnp_ReturnUrl'];
        let orderId = data.orderId;
        let amount = data.amount * 100;
        let currCode = 'VND';
        let vnp_Params: Record<string, any> = {};

        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount;
        vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl + `/${orderId}`;
        vnp_Params['vnp_IpAddr'] = ipAdd;
        vnp_Params['vnp_CreateDate'] = createdAt;

        vnp_Params = Object.keys(vnp_Params)
            .sort()
            .reduce((acc: any, key: string) => {
                acc[key] = vnp_Params[key];
                return acc;
            }, {});

        vnp_Params = sortObject(vnp_Params);

        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', vnp_HashSecret);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnp_Url += '?' + querystring.stringify(vnp_Params, { encode: false });

        return NextResponse.json({
            isSuccess: true,
            data: vnp_Url,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isSuccess: false,
            message: 'error',
            data: undefined,
        });
    }
}

function sortObject(obj: Record<string, any>) {
    let sorted: Record<string, any> = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+'
        );
    }
    return sorted;
}
