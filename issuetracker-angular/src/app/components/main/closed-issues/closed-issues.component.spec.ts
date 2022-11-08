import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedIssuesComponent } from './closed-issues.component';

describe('ClosedIssuesComponent', () => {
  let component: ClosedIssuesComponent;
  let fixture: ComponentFixture<ClosedIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
