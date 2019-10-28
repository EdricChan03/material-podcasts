import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ToolbarService } from '../../components/toolbar/toolbar.service';
import { ActionItem } from 'src/app/components/toolbar/models/action-item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.scss']
})
export class DevelopComponent implements AfterViewInit, OnDestroy {

  addActionItemForm: FormGroup;
  defaultActionItems: ActionItem[] = [
    {
      title: 'Text button',
      onClickListener: item => {
        this.onActionItemClick(item);
      }
    },
    {
      icon: 'info',
      title: 'Icon button',
      onClickListener: item => {
        this.onActionItemClick(item);
      }
    },
    {
      icon: 'edit',
      title: 'Edit options...',
      children: [
        {
          icon: 'delete',
          title: 'Delete document',
          onClickListener: item => {
            console.log('Document was deleted!');
          }
        },
        {
          icon: 'save_alt',
          title: 'Save document',
          onClickListener: item => {
            console.log('Successfully saved file!');
          }
        },
        {
          icon: 'cloud_upload',
          title: 'Upload document...',
          onClickListener: item => {
            console.log('(A file chooser dialog would be shown here)');
          }
        }
      ]
    },
    {
      icon: 'open_in_browser',
      title: 'Go to home page',
      route: '/home'
    },
    {
      icon: 'open_in_new',
      title: 'Google page',
      href: 'https://google.com'
    },
    {
      icon: 'extension',
      title: 'Overflow text button',
      isOverflow: true,
      onClickListener: item => {
        this.onActionItemClick(item);
      }
    },
    {
      icon: 'open_in_browser',
      title: 'Go to develop page',
      isOverflow: true,
      route: '/develop'
    },
    {
      icon: 'open_in_new',
      title: 'Google page',
      isOverflow: true,
      href: 'https://google.com'
    },
    {
      title: 'Overflow text button with submenu',
      children: [
        {
          icon: 'visibility',
          title: 'Action item 1',
          onClickListener: item => {
            this.onActionItemClick(item);
          }
        },
        {
          icon: 'visibility_off',
          title: 'Action item 2',
          onClickListener: item => {
            this.onActionItemClick(item);
          }
        },
        {
          title: 'Even more actions',
          children: [
            {
              title: 'Action item 3-1',
              onClickListener: item => {
                this.onActionItemClick(item);
              }
            },
            {
              title: 'Action item 3-2',
              onClickListener: item => {
                this.onActionItemClick(item);
              }
            },
            {
              title: 'Action item 3-3',
              onClickListener: item => {
                this.onActionItemClick(item);
              }
            }
          ]
        }
      ],
      isOverflow: true
    }
  ];

  @ViewChild('items', { static: true }) items: MatSelectionList;
  customToolbarProps = {
    toolbarTitle: this.title.getTitle(),
    menuTitle: '',
    menuIcon: '',
    isSelectionMode: false,
    selectionModel: null,
    actionItems: this.defaultActionItems,
    menuClick: (ev: Event) => {
      console.log('Menu button was clicked with event:', ev);
    },
    selectionModeToggle: (isSelectionMode: boolean) => {
      console.log('Selection mode toggled to value:', isSelectionMode);
      if (this.customToolbarProps.isSelectionMode !== isSelectionMode) {
        this.customToolbarProps.isSelectionMode = isSelectionMode;
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private title: Title,
    public toolbar: ToolbarService<any>
  ) {
    this.addActionItemForm = fb.group({
      title: ['', Validators.required],
      icon: '',
      isOverflow: false
    });

    toolbar.addActionItems(this.defaultActionItems);
  }

  onActionItemClick(item: ActionItem) {
    console.log('Item clicked with metadata:', item);
  }

  resetActionItems() {
    this.toolbar.clearActionItems();
    this.toolbar.addActionItems(this.defaultActionItems);
  }

  addActionItem() {
    const formValue = this.addActionItemForm.value as ActionItem;
    console.log('Form value:', formValue);
    this.toolbar.addActionItems([formValue]);
    // Reset form
    this.addActionItemForm.reset();
  }

  ngAfterViewInit() {
    this.customToolbarProps.selectionModel = this.items.selectedOptions;
  }

  ngOnDestroy() {
    // Reset current action items
    this.toolbar.clearActionItems();
  }

}
