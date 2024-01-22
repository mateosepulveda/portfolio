import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNeuroneComponent } from './project-neurone.component';

describe('ProjectNeuroneComponent', () => {
  let component: ProjectNeuroneComponent;
  let fixture: ComponentFixture<ProjectNeuroneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectNeuroneComponent]
    });
    fixture = TestBed.createComponent(ProjectNeuroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
