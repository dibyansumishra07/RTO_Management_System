import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVerificationFilesComponent } from './update-verification-files.component';

describe('UpdateVerificationFilesComponent', () => {
  let component: UpdateVerificationFilesComponent;
  let fixture: ComponentFixture<UpdateVerificationFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVerificationFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVerificationFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
