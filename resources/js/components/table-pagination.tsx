import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { generatePaginationLinks } from '@/lib/generate-pagination-links';
import { type PaginatedResponse } from '@/types';

export function TablePagination({ resource }: { resource: PaginatedResponse }) {
    if (resource.total === 0) {
        return (
            <div className={ 'mt-4 text-center text-gray-500' }>
                No Data
            </div>
        );
    }
    return (
        <Pagination className='mt-4'>
            <PaginationContent>
                <PaginationItem>
                    {resource.prev_page_url ? <PaginationPrevious href={resource.prev_page_url} /> : null }
                </PaginationItem>

                {generatePaginationLinks(resource.current_page, resource.last_page, resource.path, resource.links)}

                <PaginationItem>
                    {resource.next_page_url ? <PaginationNext href={resource.next_page_url} /> : null }
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
