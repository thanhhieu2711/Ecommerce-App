import LoadingPage from '@/components/Layout/Loading';
import { ProductDashboard as ProductDashboardCtn } from '@/containers/Dashboard/Product';

export default function ProductDashboard({ searchParams }: any) {
    console.log(searchParams);
    return <ProductDashboardCtn />;
}
