import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StephenluinUploadComponent } from './stephenluin-upload.component';

describe('StephenluinUploadComponent', () => {
  let component: StephenluinUploadComponent;
  let fixture: ComponentFixture<StephenluinUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StephenluinUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StephenluinUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
