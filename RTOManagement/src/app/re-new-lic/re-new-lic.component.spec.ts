import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReNewLicComponent } from './re-new-lic.component';

describe('ReNewLicComponent', () => {
  let component: ReNewLicComponent;
  let fixture: ComponentFixture<ReNewLicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReNewLicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReNewLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
