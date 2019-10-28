import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActionItem } from './models/action-item.model';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService<S> {

  constructor(private title: Title) { }

  /** The toolbar's title. */
  toolbarTitle$ = new BehaviorSubject<string>(this.title.getTitle());

  /** The menu button's title. */
  menuTitle$ = new BehaviorSubject<string>('');

  /** The menu button's icon. */
  menuIcon$ = new BehaviorSubject<string>('menu');

  /** The menu button's on click listener. */
  menuClickListener = new BehaviorSubject<(ev?: Event) => void>(() => {});

  /** The current list of action items. */
  actionItems$ = new BehaviorSubject<ActionItem[]>([]);

  isSelectionMode$ = new BehaviorSubject<boolean>(false);

  selectionModel$ = new Subject<SelectionModel<S>>();

  /** Adds a list of action items to the current list of action items. */
  addActionItems(items: ActionItem[]) {
    const result = items.concat(this.actionItems$.value);
    this.actionItems$.next(result);
  }

  /** Clears the current list of action items. */
  clearActionItems() {
    this.actionItems$.next([]);
  }

  /** Sets the menu click listener. */
  setMenuClickListener(listener: (ev?: Event) => void) {
    this.menuClickListener.next(listener);
  }

  /** Sets whether the toolbar is in selection mode. */
  setIsSelectionMode(value: boolean) {
    this.isSelectionMode$.next(value);
  }

  /** Toggles the toolbar's current selection mode. */
  toggleIsSelectionMode() {
    this.isSelectionMode$.next(!this.isSelectionMode$.value);
  }

  /** Sets the selection model to be used. */
  setSelectionModel(model: SelectionModel<S>) {
    this.selectionModel$.next(model);
  }
}
