import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogemployeeeditComponent } from './dialogemployeeedit.component';

describe('DialogemployeeeditComponent', () => {
  let component: DialogemployeeeditComponent;
  let fixture: ComponentFixture<DialogemployeeeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogemployeeeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogemployeeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
