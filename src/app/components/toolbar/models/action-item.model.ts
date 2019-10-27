import { UrlTree } from '@angular/router';

export interface ActionItem {
  /** The title of the action item. */
  title: string;
  /** The icon of the action item. */
  icon?: string;
  /** The sub-menus of this action item, if any. */
  children?: ActionItem[];
  /** Whether the action item should only be in the overflow menu. */
  isOverflow?: boolean;
  /** Listener which is invoked when the action item is clicked on. */
  onClickListener?: (item: ActionItem, ev?: Event) => void;
  /** A router link to be navigated to when the action item is clicked on. */
  routerLink?: string | UrlTree;
  /** A navigation link to go to when the action item is clicked on. */
  href?: string;
}
