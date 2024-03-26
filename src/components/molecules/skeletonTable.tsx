import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

export function SkeletonTable() {
  return (
    <>
      <TableRow className="space-y-2">
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
      </TableRow>
      <TableRow className="space-y-2">
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
      </TableRow>
      <TableRow className="space-y-2">
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
      </TableRow>
      <TableRow className="space-y-2">
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
      </TableRow>
    </>
  )
}
