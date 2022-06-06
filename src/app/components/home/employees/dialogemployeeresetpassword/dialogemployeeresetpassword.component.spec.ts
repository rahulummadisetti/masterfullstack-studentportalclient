import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogemployeeresetpasswordComponent } from './dialogemployeeresetpassword.component';

describe('DialogemployeeresetpasswordComponent', () => {
  let component: DialogemployeeresetpasswordComponent;
  let fixture: ComponentFixture<DialogemployeeresetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogemployeeresetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogemployeeresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
