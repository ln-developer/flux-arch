import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export function distinctUntilObjectChanged<T>() {
  return (source$: Observable<T>) => {
    return source$.pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );
  };
}
