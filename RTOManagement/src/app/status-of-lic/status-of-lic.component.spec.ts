import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOfLicComponent } from './status-of-lic.component';

describe('StatusOfLicComponent', () => {
  let component: StatusOfLicComponent;
  let fixture: ComponentFixture<StatusOfLicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusOfLicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOfLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
