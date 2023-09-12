'use client';
import Input from '@/components/Common/Input';
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    Avatar,
    Button,
} from '@material-tailwind/react';

type Props = {};

const Table = (props: Props) => {
    const TABLE_HEAD = ['Transaction', 'Amount', 'Date', 'Status', 'Account'];

    const TABLE_ROWS = [
        {
            img: '/img/logos/logo-spotify.svg',
            name: 'Spotify',
            amount: '$2,500',
            date: 'Wed 3:00pm',
            status: 'paid',
            account: 'visa',
            accountNumber: '1234',
            expiry: '06/2026',
        },
        {
            img: '/img/logos/logo-amazon.svg',
            name: 'Amazon',
            amount: '$5,000',
            date: 'Wed 1:00pm',
            status: 'paid',
            account: 'master-card',
            accountNumber: '1234',
            expiry: '06/2026',
        },
        {
            img: '/img/logos/logo-pinterest.svg',
            name: 'Pinterest',
            amount: '$3,400',
            date: 'Mon 7:40pm',
            status: 'pending',
            account: 'master-card',
            accountNumber: '1234',
            expiry: '06/2026',
        },
        {
            img: '/img/logos/logo-google.svg',
            name: 'Google',
            amount: '$1,000',
            date: 'Wed 5:00pm',
            status: 'paid',
            account: 'visa',
            accountNumber: '1234',
            expiry: '06/2026',
        },
        {
            img: '/img/logos/logo-netflix.svg',
            name: 'netflix',
            amount: '$14,000',
            date: 'Wed 3:30am',
            status: 'cancelled',
            account: 'visa',
            accountNumber: '1234',
            expiry: '06/2026',
        },
    ];

    return (
        <Card className="h-full w-full" shadow>
            <CardHeader
                shadow={false}
                className="flex justify-between items-center flex-row p-6"
            >
                <div className="w-fit md:w-60 ">
                    <Input onChange={() => {}} />
                </div>
                <Button className="bg-green-600 py-3 text-sm">
                    Thêm sản phẩm
                </Button>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-center">
                    <thead>
                        <tr className="flex flex-row">
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-blue-gray-100 flex-1 border-b py-4"
                                >
                                    <p className="font-normal leading-none text-md">
                                        {head}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            (
                                {
                                    img,
                                    name,
                                    amount,
                                    date,
                                    status,
                                    account,
                                    accountNumber,
                                    expiry,
                                },
                                index
                            ) => {
                                const isLast = index === TABLE_ROWS.length - 1;

                                return <tr key={name}></tr>;
                            }
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default Table;
