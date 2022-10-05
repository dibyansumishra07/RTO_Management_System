import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllTestDriveComponent } from './show-all-test-drive.component';

describe('ShowAllTestDriveComponent', () => {
  let component: ShowAllTestDriveComponent;
  let fixture: ComponentFixture<ShowAllTestDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllTestDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllTestDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
