import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarModule } from './toolbar.module';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // BrowserModule,
        ToolbarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toolbar title', () => {

    it('should use specified title', () => {
      const title = 'Toolbar title';

      component.toolbarTitle = title;
      fixture.detectChanges();
      expect(component.toolbarTitle).toBe(title);
    });
  });

  describe('toolbar menu', () => {
    describe('toolbar menu title', () => {
      it('should use default title if no title is specified', () => {
        expect(component.menuTitle).toBe('Open sidenav');
      });

      it('should use specified title', () => {
        const defaultTitle = 'Open sidenav';
        const newTitle = 'Menu title';

        component.menuTitle = newTitle;
        fixture.detectChanges();
        expect(component.menuTitle).not.toBe(defaultTitle);
        expect(component.menuTitle).toBe(newTitle);
      });
    });

    describe('toolbar menu icon', () => {
      it('should use default icon if no icon is specified', () => {
        expect(component.menuIcon).toBe('menu');
      });

      it('should use specified icon', () => {
        const defaultIcon = 'menu';
        const newIcon = 'arrow_back';

        component.menuIcon = newIcon;
        fixture.detectChanges();
        expect(component.menuIcon).not.toBe(defaultIcon);
        expect(component.menuIcon).toBe(newIcon);
      });
    });

    describe('toolbar menu listener', () => {
      it('should invoke listener when menu is clicked', () => {
        const hostEl = fixture.nativeElement;
        const menuButtonEl: HTMLButtonElement = hostEl.querySelector('button');

        spyOn(component.menuClick, 'emit');

        // Dispatch a click event on the menu button, which will invoke
        // the menu click output.
        menuButtonEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.menuClick.emit).toHaveBeenCalled();
      });
    });

    describe('toolbar selection mode', () => {
      // TODO: Add more unit tests for selection mode.
      it('should update toolbar when selection mode is toggled', () => {
        const isSelectionMode = true;
        const nonSelectionModeMenuIcon = 'menu';
        const nonSelectionModeMenuTitle = 'Open sidenav';
        const nonSelectionModeToolbarTitle = 'Toolbar title';
        const selectionModeMenuIcon = 'close';
        const selectionModeMenuTitle = 'Close';

        component.toolbarTitle = nonSelectionModeToolbarTitle;
        fixture.detectChanges();

        expect(component.isSelectionMode).toBe(!isSelectionMode);
        expect(component.toolbarTitle).toBe(nonSelectionModeToolbarTitle);
        expect(component.menuIcon).toBe(nonSelectionModeMenuIcon);
        expect(component.menuTitle).toBe(nonSelectionModeMenuTitle);

        component.isSelectionMode = isSelectionMode;
        fixture.detectChanges();

        expect(component.isSelectionMode).toBe(isSelectionMode);
        expect(component.menuIcon).toBe(selectionModeMenuIcon);
        expect(component.menuTitle).toBe(selectionModeMenuTitle);
      });
    });

    describe('toolbar action items', () => {
      // TODO: Add unit testing for action items.
    });
  });
});
