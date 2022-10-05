import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUserStatusComponent } from './set-user-status.component';

describe('SetUserStatusComponent', () => {
  let component: SetUserStatusComponent;
  let fixture: ComponentFixture<SetUserStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUserStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
