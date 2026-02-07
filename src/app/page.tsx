import ProjectTable from '@/components/ProyectTable';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';
import Maps from '@/components/Maps';

export default function HomePage() {
    return (
        <main>
            <Filters />
            <Maps />
            <ProjectTable />
            <Pagination />
        </main>
    );
}