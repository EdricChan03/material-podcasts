import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../components/toolbar/toolbar.service';
import { ActionItem } from 'src/app/components/toolbar/models/action-item.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.scss']
})
export class DevelopComponent implements OnInit {

  addActionItemForm: FormGroup;
  defaultActionItems = [
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
            if (confirm('Are you sure you want to delete the document?')) {
              alert('Document was deleted.');
            } else {
              alert('Document was not deleted.');
            }
          }
        },
        {
          icon: 'save_alt',
          title: 'Save document',
          onClickListener: item => {
            alert('Successfully saved file!');
          }
        },
        {
          icon: 'cloud_upload',
          title: 'Upload document...',
          onClickListener: item => {
            alert('(A file chooser dialog would be shown here)');
          }
        }
      ]
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

  constructor(private fb: FormBuilder, public toolbar: ToolbarService) {
    this.addActionItemForm = fb.group({
      title: ['', Validators.required],
      icon: '',
      isOverflow: false
    });

    toolbar.addActionItems(this.defaultActionItems);
  }

  onActionItemClick(item: ActionItem) {
    alert(`Item with title "${item.title}" clicked!`);
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


  ngOnInit() {
  }

}
