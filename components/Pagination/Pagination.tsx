import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel={'←'}
      nextLabel={'→'}
    />
  )
}
