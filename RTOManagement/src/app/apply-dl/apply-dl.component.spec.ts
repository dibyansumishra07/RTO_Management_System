import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDlComponent } from './apply-dl.component';

describe('ApplyDlComponent', () => {
  let component: ApplyDlComponent;
  let fixture: ComponentFixture<ApplyDlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyDlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyDlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
