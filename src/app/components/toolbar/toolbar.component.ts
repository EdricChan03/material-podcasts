import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActionItem } from './models/action-item.model';

export type SelectionModeToolbarTitle = (value: number) => string;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {
  /** The toolbar's title. */
  @Input() toolbarTitle: string;

  /** The menu button's icon. */
  @Input() menuIcon = 'menu';

  /** The menu button's title to be shown as a tooltip. */
  @Input() menuTitle = 'Open sidenav';

  /** Whether the toolbar has entered selection mode. */
  @Input() get isSelectionMode() {
    return this._isSelectionMode;
  }
  set isSelectionMode(value: boolean) {
    const originalVal = this._isSelectionMode;
    if (!value) {
      this.currentTitle = this.toolbarTitle;
    }
    this._isSelectionMode = value;
    this.menuIcon = value ? 'close' : 'menu';
    this.menuTitle = value ? 'Close' : 'Open sidenav';
    if (originalVal !== value) {
      // We don't want duplicated events to be emitted.
      this.selectionModeToggle.emit(value);
    }
  }

  /** The selection model to be used when selection mode is enabled. */
  @Input()
  get selectionModel() {
    return this._selectionModel;
  }
  set selectionModel(value: SelectionModel<any>) {
    this._selectionModel = value;
    this.updateSelectionModeTitle();
  }

  /** Event which is emitted when the menu button is clicked on. */
  @Output() menuClick = new EventEmitter<Event>();

  /** Event which is emitted when selection mode has been toggled. */
  @Output() selectionModeToggle = new EventEmitter<boolean>();

  /** Action items to be placed on the right side of the toolbar. */
  @Input()
  get actionItems() {
    return this._actionItems;
  }
  set actionItems(value: ActionItem[]) {
    this.setDefaultClickListeners(value);

    this._actionItems = value;

    this.hasActionItems = value.length !== 0;
    this.overflowActionItems = value.filter(item => item.isOverflow);
    this.nonOverflowActionItems = value.filter(item => !item.isOverflow);
  }


  hasActionItems = false;
  nonOverflowActionItems: ActionItem[] = [];
  overflowActionItems: ActionItem[] = [];
  currentTitle = '';
  private subscriptions = new Subscription();
  /* tslint:disable: variable-name */
  private _isSelectionMode = false;
  private _actionItems: ActionItem[];
  private _selectionModel: SelectionModel<any>;
  /* tslint:enable: variable-name */

  /** Toolbar title to be used when selection mode is enabled. */
  @Input() selectionModeToolbarTitle: SelectionModeToolbarTitle = (value: number) => `${value} ${value === 1 ? 'item' : 'items'} selected`;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Sets the default click listeners on the specified items
  private setDefaultClickListeners(items: ActionItem[]) {
    items.forEach(item => {
      if (item.children !== undefined && item.children.length > 0) {
        // Recursion FTW! :)
        this.setDefaultClickListeners(item.children);
      }
      // Check if there's already an existing listener
      if (item.onClickListener === undefined) {
        item.onClickListener = () => { };
      }
    });
  }

  private updateSelectionModeTitle() {
    if (this.selectionModel) {
      this.subscriptions.add(this.selectionModel.changed.subscribe(change => {
        this.currentTitle = this.selectionModeToolbarTitle(change.source.selected.length);
      }));
    }
  }

  _toggleSelectionMode() {
    this.isSelectionMode = !this.isSelectionMode;
  }

}
