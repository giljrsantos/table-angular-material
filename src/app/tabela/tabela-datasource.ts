import { Observable, merge, of as observableOf } from 'rxjs';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface TabelaItem {
  matricula: number;
  name: string;
  lastName: string;
  birthDate: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TabelaItem[] = [
  { matricula: 1, name: 'Gilberto', lastName: 'Junior dos Santos', birthDate: '30/03/1987' },
  { matricula: 2, name: 'Lucas', lastName: 'Alves dos Santos', birthDate: '28/03/1992' },
  { matricula: 3, name: 'Erik', lastName: 'Alves do Santos', birthDate: '07/04/1996' },
  { matricula: 4, name: 'Maria', lastName: 'Cecilia Alves dos Santos', birthDate: '04/09/1966' },
  { matricula: 5, name: 'Lazáro', lastName: 'Silva Santos', birthDate: '06/06/2014' },
  { matricula: 6, name: 'Mirelli', lastName: 'Caroline', birthDate: '23/04/1999' },
  { matricula: 7, name: 'Aparecida', lastName: 'Silva', birthDate: '12/10/1984' },
  { matricula: 8, name: 'Leilson', lastName: 'Santos', birthDate: '11/07/1982' },
  { matricula: 9, name: 'Gilberto', lastName: 'Gonçalves dos Santos', birthDate: '08/05/1965' },
];

/**
 * Data source for the Tabela view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TabelaDataSource extends DataSource<TabelaItem> {
  data: TabelaItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TabelaItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TabelaItem[]): TabelaItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TabelaItem[]): TabelaItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.matricula, +b.matricula, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
