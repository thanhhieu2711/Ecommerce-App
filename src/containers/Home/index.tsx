// import useUser from '@/hooks/store/useUser';

import { useSession } from 'next-auth/react';

type Props = {};

export default function HomePageContainer(props: Props) {
    const data = useSession();

    return (
        <div className="mt-10">
            {/* <div className="">{currentUser.name}</div> */}
        </div>
    );
}
