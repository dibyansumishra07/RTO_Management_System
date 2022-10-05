import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLLComponent } from './apply-ll.component';

describe('ApplyLLComponent', () => {
  let component: ApplyLLComponent;
  let fixture: ComponentFixture<ApplyLLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyLLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
