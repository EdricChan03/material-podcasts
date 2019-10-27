import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionItem } from './models/action-item.model';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private title: Title,
    private toolbar: ToolbarService
  ) { }

  /** The toolbar's title. */
  @Input() toolbarTitle = this.title.getTitle();

  /** The menu button's icon. */
  @Input() menuIcon = 'menu';

  /** The menu button's title to be shown as a tooltip. */
  @Input() menuTitle = 'Open sidenav';

  /** Whether the toolbar has entered selection mode. */
  @Input() get isSelectionMode() {
    return this._isSelectionMode;
  }
  set isSelectionMode(value: boolean) {
    this._isSelectionMode = value;
    this.menuIcon = value ? 'close' : 'menu';
    this.menuTitle = value ? 'Close' : 'Open sidenav';
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
  private _isSelectionMode = false;
  private _actionItems: ActionItem[];

  ngOnInit() {
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

  _toggleSelectionMode() {
    this.isSelectionMode = !this.isSelectionMode;
    this.selectionModeToggle.emit(this.isSelectionMode);
  }

}
