import ProjectTable from '@/components/ProyectTable';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

export default function HomePage() {
    return (
        <main>
            <Filters />
            <ProjectTable />
            <Pagination />
        </main>
    );
}